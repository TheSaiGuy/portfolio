import json
import os

with open('/Users/sait./.gemini/antigravity/brain/1a5779c5-5be3-44d6-b4dd-6b7081de09bf/.system_generated/steps/383/content.md', 'r') as f:
    content = f.read()

# The markdown file contains "---" then the JSON. Let's find the start of the JSON
json_start = content.find('{')
json_content = content[json_start:]

data = json.loads(json_content)

for file_obj in data.get('files', []):
    path = file_obj.get('path')
    code = file_obj.get('code')
    if path and code:
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            f.write(code)
        print(f"Extracted {path}")
