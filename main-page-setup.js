const slider = document.getElementById("rainbowSlider");
const display = document.getElementById("colorDisplay");

slider.addEventListener("input", () => {
  const hue = slider.value; // Slider value (0 to 360)
  display.style.backgroundColor = `hsl(${hue}, 100%, 50%)`; // Apply as HSL color
  projects.forEach((project) => {
    project.style.setProperty(
      "--shadow",
      `inset 125px 0px 0px hsl(${hue}, 100%, 50%, 0.4) `
    );
  });
});

// JavaScript to calculate and fix the container width
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const containerWidth = container.offsetWidth; // Get initial width

  // Set the fixed width
  container.style.width = containerWidth + "px";
  console.log(`Container width fixed at: ${containerWidth}px`);

  const logo = document.getElementById("logo");
  const fontSize = window.innerWidth * 0.05;
  logo.style.fontSize = fontSize + "px";
});
