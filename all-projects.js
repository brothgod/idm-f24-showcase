var idmLogo = document.getElementById("logo");
var idmLogoBoundingBox = idmLogo.getBoundingClientRect();
var projectWidth = 125;
var projects;

function separateAndPlaceProjects(jsonData) {
  // Separate jsonData into two lists based on the 'year' attribute
  var projectList = [];

  jsonData.forEach(function (item) {
    projectList.push(item);
  });

  projectList.sort((a, b) => a.last_name.localeCompare(b.last_name));
  projects = generateProjects(projectList, "all-projects");
  placeProjectsRandomly();
  console.log(projects);
}

function generateProjects(jsonData, containerId) {
  // Iterate through each JSON object
  var projects = [];
  jsonData.forEach(function (item) {
    var a = document.createElement("a");
    a.classList.add("project");
    var id = (item.first_name + item.last_name.substring(0, 1)).toLowerCase();
    a.href = "project.html?id=" + id;

    // Create an image element
    var imageDiv = document.createElement("div");
    var image = document.createElement("img");
    if (item.main_image === null) image.src = "./idm.jpg";
    else image.src = item.main_image;
    image.width = projectWidth;
    imageDiv.classList.add("project-image");
    imageDiv.appendChild(image);
    a.appendChild(imageDiv);

    var textDiv = document.createElement("div");
    textDiv.textContent = item.title;
    textDiv.classList.add("project-text");
    a.appendChild(textDiv);

    document.getElementById(containerId).appendChild(a);
    projects.push(a);
  });
  return projects;
}

function placeProjectsRandomly() {
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    project.style.visibility = "hidden";
    project.style.position = "absolute";

    var count = 0;
    do {
      setRandomPosition(project);
      count++;
    } while (touchingAnything(projects, i) && count < 300);

    project.style.visibility = "visible";
  }

  var placeProjects = document.getElementById("place-projects");
  placeProjects.value = "organize";
  placeProjects.onclick = organizeProjects;
  document.getElementById("refresh").style.visibility = "visible";
}

const leftSection = document.getElementById("all-projects");
const viewportWidth = window.innerWidth; // Get the width of the viewport
const leftWidth = leftSection.offsetWidth; // Get the width of the left section
const proportion = leftWidth / viewportWidth; // Calculate the proportion of the viewport taken up by the left section

function setRandomPosition(project) {
  let topBuffer = 5;
  let leftBuffer = 5;
  randomTop = getRandomNumber(topBuffer, 90 - topBuffer);
  randomLeft = getRandomNumber(
    leftBuffer * proportion,
    proportion * 95 - leftBuffer * proportion
  );
  project.style.top = randomTop + "vh";
  project.style.left = randomLeft + "vw";
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function touchingAnything(listOfDivs, index) {
  for (var i = 0; i < index; i++) {
    if (
      touching(
        listOfDivs[i].getBoundingClientRect(),
        listOfDivs[index].getBoundingClientRect()
      )
    ) {
      return true;
    }
  }
  return false;
}

//Returns true if two divs are touching
function touching(div1, div2) {
  let div1Top = div1.top;
  let div1Left = div1.left;
  let div1Right = div1.right;
  let div1Bottom = div1.bottom;

  let div2Top = div2.top;
  let div2Left = div2.left;
  let div2Right = div2.right;
  let div2Bottom = div2.bottom;

  // console.log("Project 1 position:", div1Top, div1Bottom, div1Left, div1Right);
  // console.log("Project 2 position:", div2Top, div2Bottom, div2Left, div2Right);

  var verticalMatch = false;
  var horizontalMatch = false;
  var verticalBuffer = 35; //Need a buffer
  var horizontalBuffer = 25; //Need a buffer

  // Check for horizontal overlap
  horizontalMatch =
    div1Left <= div2Right + horizontalBuffer &&
    div1Right >= div2Left - horizontalBuffer;

  // Check for vertical overlap
  verticalMatch =
    div1Top <= div2Bottom + verticalBuffer &&
    div1Bottom >= div2Top - verticalBuffer;

  if (horizontalMatch && verticalMatch) {
    return true;
  } else {
    // console.log(horizontalMatch, verticalMatch);
    return false;
  }
}

function organizeProjects() {
  projects.forEach((project) => {
    project.style.position = "relative"; // Remove absolute positioning
    project.style.width = "auto"; // Allow items to adapt to grid cell size
    project.style.height = "auto";
    project.style.top = 0;
    project.style.left = 0;
  });

  var button = document.getElementById("place-projects");
  button.value = "scatter";
  button.onclick = placeProjectsRandomly;
  document.getElementById("refresh").style.visibility = "hidden";
}

// Fetch the JSON file
fetch("student-info.json")
  .then((response) => response.json())
  .then((data) => {
    // Once the JSON data is fetched, you can work with it here
    console.log(data); // For example, you can log it to the console
    // You can also call a function to process the JSON data here
    separateAndPlaceProjects(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch
    console.error("Error fetching JSON:", error);
  });
