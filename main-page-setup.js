const slider = document.getElementById("rainbowSlider");
const display = document.getElementById("colorDisplay");
const toggle = document.getElementById("toggle");
const about = document.getElementById("about");
const container = document.getElementById("container");
const allProjects = document.getElementById("all-projects");
const tools = document.getElementById("tools");

slider.addEventListener("input", () => {
  const hue = slider.value; // Slider value (0 to 360)
  display.style.backgroundColor = `hsl(${hue}, 100%, 50%)`; // Apply as HSL color
  projects.forEach((project) => {
    project.style.setProperty("--shadow-color", `${hue}, 100%, 50%, .25`);
  });
});

// JavaScript to calculate and fix the container width
window.addEventListener("DOMContentLoaded", () => {
  toggle.checked = false;

  // Make sure both elements are visible when page loads (reset states)
  allProjects.classList.remove("hidden");
  about.classList.add("hidden");

  const containerWidth = container.offsetWidth; // Get initial width

  // Set the fixed width
  container.style.width = containerWidth + "px";
  console.log(`Container width fixed at: ${containerWidth}px`);

  const logo = document.getElementById("logo");
  const fontSize = window.innerWidth * 0.05;
  logo.style.fontSize = fontSize + "px";
});

toggle.addEventListener("input", () => {
  if (toggle.checked) {
    projects.forEach((project) => {
      project.classList.remove("show-image");
      project.classList.add("show-text");
    });
  } else {
    projects.forEach((project) => {
      project.classList.remove("show-text");
      project.classList.add("show-image");
    });
  }
});

// Ensure elements are properly toggled between visible and hidden
function toggleProjectsAbout() {
  // Check if elements are visible or hidden, and toggle the classes
  about.classList.toggle("hidden");
  allProjects.classList.toggle("hidden");
  tools.classList.toggle("hidden");
}

function readAloud() {
  // Get the text from the div
  const text = document.getElementById("about").innerText;

  // Check if speech synthesis is available
  if ("speechSynthesis" in window) {
    // Create a new speech synthesis instance
    const utterance = new SpeechSynthesisUtterance(text);

    // Optionally set some properties (like voice, pitch, rate)
    utterance.voice = speechSynthesis.getVoices()[0]; // Choose the first available voice
    utterance.pitch = 1; // Set pitch (0 = low, 2 = high)
    utterance.rate = 1; // Set speed (0.1 = slow, 1 = normal, 2 = fast)

    // Speak the text
    speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
}
