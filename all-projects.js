var idmLogo = document.getElementById("logo");
var screenWidth = document.getElementById("screen").clientWidth;
var screenHeight = document.getElementById("screen").clientHeight;
var idmLogoBoundingBox = idmLogo.getBoundingClientRect();
var projectWidth = 100;

console.log(
  "Logo position: ",
  idmLogoBoundingBox.top,
  idmLogoBoundingBox.bottom,
  idmLogoBoundingBox.left,
  idmLogoBoundingBox.right
);

function separateAndPlaceProjects(jsonData) {
  // Separate jsonData into two lists based on the 'year' attribute
  var projectList = [];

  jsonData.forEach(function (item) {
    projectList.push(item);
  });

  projectList.sort((a, b) => a.full_name.localeCompare(b.full_name));

  var projects = generateProjects(projectList, "screen");
  console.log(projects);
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    project.style.visibility = "hidden";

    do {
      setRandomPosition(project, screenHeight, screenWidth);
    } while (touchingAnything(projects, i));

    project.style.visibility = "visible";
  }
}

function generateProjects(jsonData, containerId) {
  // Iterate through each JSON object
  var projects = [];
  jsonData.forEach(function (item) {
    // Create a new list item element
    var p = document.createElement("p");
    // Create an image element
    var image = document.createElement("img");
    image.src = "idm.jpg"; // Use the main image from JSON data
    image.width = projectWidth;
    p.appendChild(image);

    document.getElementById(containerId).appendChild(p);
    projects.push(p);
  });
  return projects;
}

function setRandomPosition(project, winHeight, winWidth) {
  randomTop = getRandomNumber(60, winHeight - 160);
  randomLeft = getRandomNumber(0, winWidth - 100);
  project.style.position = "absolute";
  project.style.top = randomTop + "px";
  project.style.left = randomLeft + "px";
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

  console.log("Project 1 position:", div1Top, div1Bottom, div1Left, div1Right);
  console.log("Project 2 position:", div2Top, div2Bottom, div2Left, div2Right);

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

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
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
