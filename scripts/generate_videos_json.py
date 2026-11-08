import json
import os
import urllib.request
import urllib.parse

CHANNEL_HANDLE = "@MaldenCommunityCoalition"
OUTPUT_FILE = "../src/data/videos.json"
API_KEY = os.environ.get("YOUTUBE_API_KEY", "")

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))

def parse_date(date_str):
    # ISO string like '2026-04-12T14:30:00Z' -> '2026-04-12'
    if not date_str or len(date_str) < 10:
        return ""
    return date_str[:10]

def load_existing_database():
    if not os.path.exists(OUTPUT_FILE):
        return {}
    try:
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return {item['youtubeId']: item for item in data if 'youtubeId' in item}
    except Exception:
        return {}

def update_video_database():
    if not API_KEY:
        print("❌ Error: YOUTUBE_API_KEY environment variable is missing.")
        return

    print(f"🔄 Fetching channel metadata via YouTube API for {CHANNEL_HANDLE}...")
    existing_db = load_existing_database()

    try:
        # Step 1: Resolve channel handle to Uploads Playlist ID
        channel_url = f"https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle={CHANNEL_HANDLE}&key={API_KEY}"
        channel_data = fetch_json(channel_url)
        
        if not channel_data.get('items'):
            print("❌ Error: Channel not found.")
            return

        uploads_playlist_id = channel_data['items'][0]['contentDetails']['relatedPlaylists']['uploads']

        # Step 2: Fetch playlist items (includes full descriptions, thumbnails, upload dates)
        playlist_url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId={uploads_playlist_id}&maxResults=50&key={API_KEY}"
        playlist_data = fetch_json(playlist_url)

        fresh_scraped_list = []

        for item in playlist_data.get('items', []):
            snippet = item.get('snippet', {})
            yt_id = snippet.get('resourceId', {}).get('videoId')
            
            if not yt_id:
                continue

            old_entry = existing_db.get(yt_id, {})
            raw_date = snippet.get('publishedAt', '')

            # High-res thumbnail fallback sequence
            thumbnails = snippet.get('thumbnails', {})
            thumb_url = (
                thumbnails.get('maxres', {}).get('url') or 
                thumbnails.get('high', {}).get('url') or 
                f"https://i.ytimg.com/vi/{yt_id}/hqdefault.jpg"
            )

            node = {
                "id": "vid_temp",
                "youtubeId": yt_id,
                "category": old_entry.get("category", "Archive"),
                "title": snippet.get('title', 'Untitled Video'),
                "desc_en": snippet.get('description', '').strip(),
                "desc_es": old_entry.get("desc_es", ""),
                "desc_pt": old_entry.get("desc_pt", ""),
                "desc_zh": old_entry.get("desc_zh", ""),
                "upload_date_raw": raw_date.replace("-", "")[:8],
                "upload_date_display": parse_date(raw_date),
                "duration_seconds": old_entry.get("duration_seconds", 0),
                "duration_display": old_entry.get("duration_display", "0:00"),
                "view_count": old_entry.get("view_count", 0),
                "like_count": old_entry.get("like_count", 0),
                "tags": old_entry.get("tags", []),
                "video_url": f"https://www.youtube.com/watch?v={yt_id}",
                "thumbnail_maxres": thumb_url
            }

            fresh_scraped_list.append(node)

        # Sort newest first & re-index IDs sequentially
        fresh_scraped_list.sort(key=lambda x: x.get('upload_date_raw', ''), reverse=True)
        for index, video in enumerate(fresh_scraped_list, start=1):
            video["id"] = f"vid_{index:03d}"

        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(fresh_scraped_list, f, indent=2, ensure_ascii=False)

        print(f"🎉 Successfully fetched {len(fresh_scraped_list)} videos with full metadata via API!")

    except Exception as e:
        print(f"❌ Error during API sync: {str(e)}")

if __name__ == "__main__":
    update_video_database()