import json

# Load the JSON file
with open("student-info.json", "r") as file:
    projects = json.load(file)

# Create a dictionary to map keywords to project IDs
keyword_to_projects = {}

# Build the keyword-to-project mapping
for i, project in enumerate(projects):
    keywords = project["keywords"].split(",")
    keywords = [keyword.strip().lower() for keyword in keywords if keyword != "" ]  # Normalize keywords
    for keyword in keywords:
        if keyword not in keyword_to_projects:
            keyword_to_projects[keyword] = []
        keyword_to_projects[keyword].append((project["first_name"]+project["last_name"][0:1]).lower())  # Add id of project

# Add the related_projects field to each project
for i, project in enumerate(projects):
    keywords = project["keywords"].split(",")
    keywords = [keyword.strip().lower() for keyword in keywords if keyword != "" ]
    related_projects = set()  # Use a set to avoid duplicates
    
    for keyword in keywords:
        related_projects.update(keyword_to_projects[keyword])
    
    related_projects.discard(i)  # Remove the current project from related projects
    project["related_projects"] = list(related_projects)  # Convert to a list

# Save the updated JSON to a new file
with open("updated_student-info.json", "w") as file:
    json.dump(projects, file, indent=4)

print("Updated JSON saved to updated_projects.json")
