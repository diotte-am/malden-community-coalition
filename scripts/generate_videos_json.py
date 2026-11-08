import json
import os
from yt_dlp import YoutubeDL

CHANNEL_URL = "https://www.youtube.com/@MaldenCommunityCoalition/videos"
OUTPUT_FILE = "../src/data/videos.json"

def clean_description(desc):
    return desc.strip() if desc else ""

def parse_date(date_str):
    if not date_str or len(date_str) != 8:
        return ""
    return f"{date_str[0:4]}-{date_str[4:6]}-{date_str[6:8]}"

def format_duration(seconds):
    if not seconds:
        return "0:00"
    return f"{seconds // 60}:{seconds % 60:02d}"

def load_existing_database():
    """Loads current data file to preserve existing translations."""
    if not os.path.exists(OUTPUT_FILE):
        return {}
    try:
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return {item['youtubeId']: item for item in data if 'youtubeId' in item}
    except Exception as e:
        print(f"⚠️ Warning: Could not parse existing database file ({str(e)}). Building fresh.")
        return {}

def update_video_database():
    print(f"🔄 Pulling active channel feed: {CHANNEL_URL}")
    
    existing_db = load_existing_database()
    print(f"📦 Loaded {len(existing_db)} existing video records from local database file.")

    cookies_path = "cookies.txt" if os.path.exists("cookies.txt") else None

    # Request full playlist metadata dictionary parsing directly
    ydl_opts = {
        'extract_flat': False,
        'quiet': True,
        'no_warnings': True,
        'playlistend': 50,
        'skip_download': True,
    }

    if cookies_path:
        ydl_opts['cookiefile'] = cookies_path

    fresh_scraped_list = []

    with YoutubeDL(ydl_opts) as ydl:
        try:
            channel_info = ydl.extract_info(CHANNEL_URL, download=False)
            if 'entries' not in channel_info:
                print("❌ Error parsing channel entries.")
                return

            print("Parsing channel entries...")
            
            for entry in channel_info['entries']:
                if not entry:
                    continue
                
                yt_id = entry.get("id")
                if not yt_id:
                    continue
                
                # Check if we already have this video AND its English description is already filled
                if yt_id in existing_db and existing_db[yt_id].get("desc_en"):
                    fresh_scraped_list.append(existing_db[yt_id])
                    continue

                old_entry = existing_db.get(yt_id, {})

                # Extract fields safely directly from the entry payload
                raw_date = entry.get("upload_date", "")
                raw_desc = entry.get("description", "")
                
                new_node = {
                    "id": "vid_temp",
                    "youtubeId": yt_id,
                    "category": entry.get("categories", ["Archive"])[0] if entry.get("categories") else "Archive",
                    "title": entry.get("title", "Untitled Workshop"),
                    
                    # Pull description, defaulting to old saved description if available
                    "desc_en": clean_description(raw_desc) or old_entry.get("desc_en", ""),
                    "desc_es": old_entry.get("desc_es", ""),
                    "desc_pt": old_entry.get("desc_pt", ""),
                    "desc_zh": old_entry.get("desc_zh", ""),
                    
                    "upload_date_raw": raw_date,
                    "upload_date_display": parse_date(raw_date),
                    "duration_seconds": entry.get("duration"),
                    "duration_display": format_duration(entry.get("duration")),
                    "view_count": entry.get("view_count", 0),
                    "like_count": entry.get("like_count", 0),
                    "tags": entry.get("tags", []),
                    "video_url": entry.get("webpage_url", f"https://www.youtube.com/watch?v={yt_id}"),
                    "thumbnail_maxres": entry.get("thumbnail", f"https://i.ytimg.com/vi/{yt_id}/maxresdefault.jpg")
                }
                
                fresh_scraped_list.append(new_node)
                print(f"✨ Parsed: {new_node['title'][:40]}...")

            if not fresh_scraped_list:
                print("🛑 No data parsed. Aborting save.")
                return

            # Sort all videos by upload date (newest first)
            fresh_scraped_list.sort(key=lambda x: x.get('upload_date_raw', ''), reverse=True)

            # Re-index IDs sequentially
            for index, item in enumerate(fresh_scraped_list, start=1):
                item["id"] = f"vid_{index:03d}"

            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(fresh_scraped_list, f, indent=2, ensure_ascii=False)
                
            print(f"🎉 Database file successfully updated! Total count: {len(fresh_scraped_list)} entries.")

        except Exception as e:
            print(f"❌ Error during runtime: {str(e)}")

if __name__ == "__main__":
    update_video_database()