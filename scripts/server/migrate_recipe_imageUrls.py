"""
Migrates recipe json files and updates their "imageUrl" extension to end in webp.
"""
import os
import sys
import json


PROJECT_ROOT = "../.."
RECIPE_DIR = "data/recipes"

def update_image_urls_to_webp():
    for file in os.listdir(os.path.join(PROJECT_ROOT, RECIPE_DIR)):
        json_file_path = os.path.join(PROJECT_ROOT, RECIPE_DIR, file)
        print (json_file_path)
        try:
            with open(json_file_path, 'r') as json_file:
                data = json.load(json_file)

            if 'imageUrl' in data:
                    data['imageUrl'] = os.path.splitext(data['imageUrl'])[0] + '.webp'

            print('new ', data['imageUrl'])
            with open(json_file_path, 'w') as json_file:
                json.dump(data, json_file, indent=2)

        except Exception as e:
            print(f"Error updating imageUrls: {e}")


if __name__ == "__main__":
    update_image_urls_to_webp()
