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
            # Map by youtubeId for instant lookup matching
            return {item['youtubeId']: item for item in data if 'youtubeId' in item}
    except Exception as e:
        print(f"⚠️ Warning: Could not parse existing database file ({str(e)}). Building fresh.")
        return {}

def update_video_database():
    print(f"🔄 Pulling active channel feed: {CHANNEL_URL}")
    
    # Load what we currently have saved
    existing_db = load_existing_database()
    print(f"📦 Loaded {len(existing_db)} existing video records from local database file.")

    # Check if a cookies file was written by our workflow runner
    cookies_path = "cookies.txt" if os.path.exists("cookies.txt") else None

    ydl_opts = {
        'extract_flat': 'in_playlist',
        'quiet': True,
        'no_warnings': True,
        'playlistend': 50,
        'skip_download': True,
    }

    # Pass cookies securely if available
    if cookies_path:
        ydl_opts['cookiefile'] = cookies_path

    fresh_scraped_list = []

    with YoutubeDL(ydl_opts) as ydl:
        try:
            channel_info = ydl.extract_info(CHANNEL_URL, download=False)
            if 'entries' not in channel_info:
                print("❌ Error parsing channel entries.")
                return

            print("Parsing channel entries and checking for new videos...")
            
            for entry in channel_info['entries']:
                if not entry:
                    continue
                
                yt_id = entry.get("id")
                if not yt_id:
                    continue
                
                # 🛡️ SMART CHECK: If we already have this video AND it has a description, preserve it!
                if yt_id in existing_db and existing_db[yt_id].get("desc_en"):
                    fresh_scraped_list.append(existing_db[yt_id])
                    continue
                
                # If it's a brand new video (or missing metadata), fetch full individual node info
                try:
                    detailed_opts = {
                        'quiet': True,
                        'no_warnings': True,
                        'skip_download': True,
                    }
                    if cookies_path:
                        detailed_opts['cookiefile'] = cookies_path

                    # Fetch the full metadata page for this specific video ID
                    with YoutubeDL(detailed_opts) as detailed_ydl:
                        video_info = detailed_ydl.extract_info(f"https://www.youtube.com/watch?v={yt_id}", download=False)
                except Exception:
                    video_info = entry  # Fallback to playlist entry if detailed fetch fails

                # Preserve any user translations if updating an existing record
                old_entry = existing_db.get(yt_id, {})

                try:
                    new_node = {
                        "id": "vid_temp",
                        "youtubeId": yt_id,
                        "category": video_info.get("categories", ["Archive"])[0] if video_info.get("categories") else "Archive",
                        "title": video_info.get("title", entry.get("title", "Untitled Workshop")),
                        
                        # Full metadata extraction
                        "desc_en": clean_description(video_info.get("description", entry.get("description", ""))),
                        "desc_es": old_entry.get("desc_es", ""),
                        "desc_pt": old_entry.get("desc_pt", ""),
                        "desc_zh": old_entry.get("desc_zh", ""),
                        
                        "upload_date_raw": video_info.get("upload_date", entry.get("upload_date", "")),
                        "upload_date_display": parse_date(video_info.get("upload_date", entry.get("upload_date", ""))),
                        "duration_seconds": video_info.get("duration", entry.get("duration")),
                        "duration_display": format_duration(video_info.get("duration", entry.get("duration"))),
                        "view_count": video_info.get("view_count", entry.get("view_count", 0)),
                        "like_count": video_info.get("like_count", entry.get("like_count", 0)),
                        "tags": video_info.get("tags", entry.get("tags", [])),
                        "video_url": video_info.get("webpage_url", f"https://www.youtube.com/watch?v={yt_id}"),
                        "thumbnail_maxres": video_info.get("thumbnail", entry.get("thumbnail", f"https://i.ytimg.com/vi/{yt_id}/maxresdefault.jpg"))
                    }
                    fresh_scraped_list.append(new_node)
                    print(f"✨ Parsed Full Metadata: {new_node['title'][:40]}...")
                except Exception as inner_err:
                    print(f"⚠️ Skipped malformed video entry {yt_id}: {str(inner_err)}")
                    continue

            if not fresh_scraped_list:
                print("🛑 No data parsed. Aborting save.")
                return

            # Sort all videos by upload date (newest first)
            fresh_scraped_list.sort(key=lambda x: x.get('upload_date_raw', ''), reverse=True)

            # Re-index ids sequentially so they look nice (vid_001, vid_002, etc.)
            for index, item in enumerate(fresh_scraped_list, start=1):
                item["id"] = f"vid_{index:03d}"

            # Save the clean merged file back down
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(fresh_scraped_list, f, indent=2, ensure_ascii=False)
                
            print(f"🎉 Database file successfully updated! Total count: {len(fresh_scraped_list)} entries.")

        except Exception as e:
            print(f"❌ Error during runtime: {str(e)}")

if __name__ == "__main__":
    update_video_database()