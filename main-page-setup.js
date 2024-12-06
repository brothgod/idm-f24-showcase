const toggleSpan = document.getElementById("toggle-span");
const about = document.getElementById("about");
const container = document.getElementById("container");
const allProjects = document.getElementById("all-projects");
const logo = document.getElementsByClassName("logo");
const tools = document.getElementById("tools");

// JavaScript to calculate and fix the container width
window.addEventListener("DOMContentLoaded", () => {
  // Make sure both elements are visible when page loads (reset states)
  allProjects.classList.remove("hidden");
  about.classList.add("hidden");
  createColorControls();
});

function toggleImagesTitles() {
  if (toggleSpan.textContent === "show titles") {
    projects.forEach((project) => {
      project.classList.remove("show-image");
      project.classList.add("show-text");
    });
    toggleSpan.textContent = "show images";
  } else {
    projects.forEach((project) => {
      project.classList.remove("show-text");
      project.classList.add("show-image");
    });
    toggleSpan.textContent = "show titles";
  }
}

function pickRandomProject() {
  let i = Math.floor(Math.random() * projects.length);
  let p = projects[i];
  window.location.href = "project.html?id=" + p.id;
}

const colors = [
  { fileColor: "red", rgb: [255, 116, 119] },
  { fileColor: "orange", rgb: [255, 108, 47] },
  { fileColor: "melon", rgb: [255, 174, 59] },
  { fileColor: "green", rgb: [103, 179, 70] },
  { fileColor: "olive", rgb: [180, 159, 41] },
  { fileColor: "teal", rgb: [0, 157, 165] },
  { fileColor: "blue", rgb: [98, 168, 229] },
  { fileColor: "purple", rgb: [157, 122, 210] },
  { fileColor: "pink", rgb: [249, 132, 202] },
];
const colorControls = document.getElementById("colorControls");
function createColorControls() {
  colors.forEach((color) => {
    // Create the button container
    let c = document.createElement("div");
    c.id = `riso-${color}`;
    c.classList.add("span-colorbutton");

    // Add the click event directly to the container
    c.onclick = () => changeColor(color);

    // Append the button to the controls container
    colorControls.appendChild(c);
  });
}

function changeColor(color) {
  allProjects.classList.toggle("hidden");
  images.forEach((image) => {
    const baseSource = image.getAttribute("baseSrc");
    const parts = baseSource.split(".");
    parts.pop();
    let filename = parts.join(".") + ".png";
    image.src = filename.replaceAll("main", `${color.fileColor}-main`);
  });
  allProjects.classList.toggle("hidden");

  let buttons = document.querySelectorAll(".span-button span");
  console.log(buttons);
  for (let i = 0; i < buttons.length; i++) {
    let e = buttons[i];
    e.style.backgroundColor = `rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})`;
  }

  projects.forEach((project) => {
    project.style.setProperty(
      "--text-rgb",
      `rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})`
    );
  });
}

const sidebar = document.getElementById("sidebar");
// Ensure elements are properly toggled between visible and hidden
function toggleProjectsAbout() {
  // Check if elements are visible or hidden, and toggle the classes
  if (about.classList.contains("hidden")) {
    console.log("test1");
    setTimeout(function () {
      sidebar.addEventListener("click", toggleProjectsAbout);
    }, 300);
  } else {
    console.log("test");
    setTimeout(function () {
      sidebar.removeEventListener("click", toggleProjectsAbout);
    }, 300);
  }
  about.classList.toggle("hidden");
  allProjects.classList.toggle("hidden");
  tools.classList.toggle("hidden");
}

let utterance; // Holds the SpeechSynthesisUtterance instance
let isSpeaking = false; // Tracks if the speech is ongoing
let isPaused = false; // Tracks if speech is paused

// Initialize the speech synthesis
function initializeSpeech() {
  const text = document.getElementById("about-read").innerText;

  // Create a new speech utterance instance
  utterance = new SpeechSynthesisUtterance(text);

  // Optional: Configure voice, pitch, and rate
  utterance.voice = speechSynthesis.getVoices()[0];
  utterance.pitch = 1; // Default pitch
  utterance.rate = 1; // Default speed

  // Reset flags when the utterance ends
  utterance.onend = () => {
    isSpeaking = false;
    isPaused = false;
    updateButtons();
  };
}

// Start or stop the speech
function toggleStartStop() {
  if (!isSpeaking) {
    // Start speech
    initializeSpeech();
    speechSynthesis.speak(utterance);
    isSpeaking = true;
    isPaused = false;
  } else {
    // Stop speech
    speechSynthesis.cancel();
    isSpeaking = false;
    isPaused = false;
  }
  updateButtons();
}

// Play or pause the speech
function togglePlayPause() {
  if (isPaused) {
    // Resume speech
    speechSynthesis.resume();
    isPaused = false;
  } else {
    // Pause speech
    speechSynthesis.pause();
    isPaused = true;
  }
  updateButtons();
}

const startStopButton = document.getElementById("startStopRead");
const playPauseButton = document.getElementById("playPauseRead");
// Update button states and text
function updateButtons() {
  if (isSpeaking) {
    startStopButton.textContent = "stop";
    playPauseButton.classList.remove("disabled"); // Enable Play/Pause when speech is active
    playPauseButton.textContent = isPaused ? "play" : "pause";
  } else {
    startStopButton.textContent = "read aloud";
    playPauseButton.classList.add("disabled"); // Disable Play/Pause when speech is inactive
    playPauseButton.textContent = "play";
  }
}
