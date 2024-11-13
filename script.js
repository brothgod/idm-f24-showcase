var projects = document.getElementsByClassName("entry");
var idmLogo = document.getElementById("logo");
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var idmLogoBoundingBox = idmLogo.getBoundingClientRect();
console.log(
  "Logo position: ",
  idmLogoBoundingBox.top,
  idmLogoBoundingBox.bottom,
  idmLogoBoundingBox.left,
  idmLogoBoundingBox.right
);

for (var i = 0; i < projects.length; i++) {
  var project = projects[i];
  console.log("Project ", i);
  project.style.visibility = "hidden";

  do {
    setRandomPosition(project, winHeight, winWidth);
  } while (touchingAnything(projects, i));

  project.style.visibility = "visible";
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
      console.log(i, index, " touching");
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
  var buffer = 75; //Need a buffer

  // Check for horizontal overlap
  horizontalMatch =
    div1Left <= div2Right + buffer && div1Right >= div2Left - buffer;

  // Check for vertical overlap
  verticalMatch =
    div1Top <= div2Bottom + buffer && div1Bottom >= div2Top - buffer;

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
