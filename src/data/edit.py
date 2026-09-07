import json
from datetime import datetime

# Get today's date (YYYY-MM-DD format)
today = datetime.now().strftime("%Y-%m-%d")

# Load the JSON data
with open("resources.json", "r") as file:
    data = json.load(file)

# Iterate through each item and add the date
for item in data:
    item["last_updated"] = today

# Save the updated data back to the file
with open("resources_new.json", "w") as file:
    json.dump(data, file, indent=4)