const hueSlider = document.getElementById("hue-slider");
const lightSlider = document.getElementById("light-slider");
const toggleSpan = document.getElementById("toggle-span");
const about = document.getElementById("about");
const container = document.getElementById("container");
const allProjects = document.getElementById("all-projects");
const logo = document.getElementsByClassName("logo");
const tools = document.getElementById("tools");

hueSlider.addEventListener("input", () => {
  const hue = hueSlider.value; // Slider value (0 to 360)
  projects.forEach((project) => {
    if (project.style.getPropertyValue("--text-light") === "") {
      project.style.setProperty("--text-light", `${lightSlider.value}%`);
    }
    project.style.setProperty("--shadow-hue", hue);
    project.style.setProperty("--shadow-alpha", 0.25);
    project.style.setProperty("--text-hue", hue);
  });
  [...logo].forEach((e) => {
    if (e.style.getPropertyValue("--text-light") === "") {
      e.style.setProperty("--text-light", `${lightSlider.value}%`);
    }
    e.style.setProperty("--text-hue", hue);
  });
});

lightSlider.addEventListener("input", () => {
  const light = lightSlider.value; // Slider value (20 to 80)
  projects.forEach((project) => {
    project.style.setProperty("--shadow-light", `${light}%`);
    project.style.setProperty("--shadow-alpha", 0.25);
    project.style.setProperty("--text-light", `${light}%`);
  });
  [...logo].forEach((e) => {
    e.style.setProperty("--text-light", `${light}%`);
  });
});

// JavaScript to calculate and fix the container width
window.addEventListener("DOMContentLoaded", () => {
  // Make sure both elements are visible when page loads (reset states)
  allProjects.classList.remove("hidden");
  about.classList.add("hidden");
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
  const text = document.getElementById("about").innerText;

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
