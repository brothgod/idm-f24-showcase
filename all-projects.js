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

  projectList.sort((a, b) => a.full_name.localeCompare(b.full_name));
  projects = generateProjects(projectList, "screen");
  placeProjectsRandomly();
  console.log(projects);
}

function generateProjects(jsonData, containerId) {
  // Iterate through each JSON object
  var projects = [];
  jsonData.forEach(function (item) {
    var p = document.createElement("p");
    p.classList.add("project");

    // Create an image element
    var imageDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "idm.jpg";
    image.width = projectWidth;
    imageDiv.classList.add("project-image");
    imageDiv.appendChild(image);
    p.appendChild(imageDiv);

    var textDiv = document.createElement("div");
    textDiv.textContent = item.project_title;
    textDiv.classList.add("project-text");
    p.appendChild(textDiv);

    document.getElementById(containerId).appendChild(p);
    projects.push(p);
  });
  return projects;
}

function placeProjectsRandomly() {
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    project.style.visibility = "hidden";

    var count = 0;
    do {
      setRandomPosition(project);
      count++;
    } while (touchingAnything(projects, i) && count < 300);

    project.style.visibility = "visible";
  }

  var toggle = document.getElementById("toggle");
  toggle.value = "organize";
  toggle.onclick = organizeProjects;
  document.getElementById("refresh").style.visibility = "visible";
}

function setRandomPosition(project, winHeight, winWidth) {
  var winWidth = document.getElementById("screen").clientWidth;
  var winHeight = document.getElementById("screen").clientHeight;
  randomTop = getRandomNumber(0, winHeight - 150);
  randomLeft = getRandomNumber(0, winWidth - projectWidth);
  project.style.position = "absolute";
  project.style.top = randomTop + "px";
  project.style.left = randomLeft + "px";
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

  var button = document.getElementById("toggle");
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
