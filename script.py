import os
import json

def update_main_image(json_file_path, images_folder_path, output_file_path):
    # Load the JSON data
    with open(json_file_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)

    # Get a list of all image files in the folder
    image_files = os.listdir(images_folder_path)

    # Iterate through each entry in the JSON data
    for entry in data:
        if "first_name" in entry and entry["first_name"]:
            first_name = entry["first_name"].lower()

            # Search for the corresponding image file
            for image_file in image_files:
                if image_file.lower().startswith(f"main-{first_name}."):
                    entry["main_image"] = os.path.join(images_folder_path, image_file)
                    break
            else:
                # No matching image found
                entry["main_image"] = None

    # Save the updated JSON data
    with open(output_file_path, "w") as output_file:
        json.dump(data, output_file, indent=4)

    print(f"Updated JSON saved to {output_file_path}")

# Example usage
json_file_path = "./student-info.json"  # Path to your JSON file
images_folder_path = "./main-images"  # Path to your images folder
output_file_path = "./updated-student-info.json"  # Path to save the updated JSON file

update_main_image(json_file_path, images_folder_path, output_file_path)
