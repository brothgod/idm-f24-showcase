const slider = document.getElementById("rainbowSlider");
const display = document.getElementById("colorDisplay");
const toggle = document.getElementById("toggle");

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
  const container = document.getElementById("container");
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
