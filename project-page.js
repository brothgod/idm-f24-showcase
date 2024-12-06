window.addEventListener("DOMContentLoaded", initPage);
var related_projects = [];

function initPage() {
  const queryString =
    window.location
      .search; /* Example: ?product=shirt&color=blue&newuser&size=m */
  const urlParams = new URLSearchParams(queryString);
  const parsedSiteId = urlParams.get("id"); // ?cat=something
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

  // Iterate through the array to find the element with the specific attribute
  fetch("student-info.json")
    .then((response) => response.json())
    .then((data) => {
      let foundElement = data.find((item) => item.id === parsedSiteId);

      // Check if the element was found
      if (foundElement) {
        let full_name = foundElement.first_name + " " + foundElement.last_name;
        console.log("Element found:", foundElement);
        document.title = full_name;
        document.getElementById("title").textContent = foundElement.title;
        document.getElementById("name").textContent = "by " + full_name;
        let year = "";
        if (foundElement.year === "Grad (Thesis Project)") {
          year = "Graduate Thesis";
        } else {
          year = "Senior Project";
        }
        document.getElementById("year").textContent = year + " ";
        document.getElementById("medium").textContent = foundElement.medium;

        if (foundElement.project_site != "") {
          let link = document.getElementById("link");
          let linkA = document.createElement("a");
          linkA.textContent = "view project";
          linkA.href = foundElement.project_site;
          linkA.setAttribute("target", "_blank");
          link.appendChild(linkA);
        }

        var mainImg = document.getElementById("main-img");
        if (foundElement.main_image != null) {
          if (foundElement.main_image.endsWith(".mov")) {
            var videoContainer = document.createElement("video");
            videoContainer.setAttribute("controls", "");

            var sourceElement = document.createElement("source");
            sourceElement.setAttribute(
              "src",
              "main-images/Abiraahmi_Shankar_main.mov"
            );
            sourceElement.setAttribute("type", "video/mp4");

            var fallbackText = document.createTextNode(
              "Your browser does not support the video tag."
            );

            videoContainer.appendChild(sourceElement);
            videoContainer.appendChild(fallbackText);

            mainImg.appendChild(videoContainer);
            mainImg.childNodes[0].remove();
          } else {
            mainImg.childNodes[0].src = foundElement.main_image;
          }
        }

        document.getElementById("description").textContent =
          foundElement.description;
        let personal_link = document.getElementsByClassName("personal-link");
        let linkedin = document.getElementsByClassName("linkedin");
        let flag = false;
        if (foundElement.personal_site !== "") {
          [...personal_link].forEach((e) => {
            e.innerHTML = "portfolio ↗ &nbsp;";
            e.href = foundElement.personal_site;
            e.setAttribute("target", "_blank");
          });
          flag = true;
        }

        if (foundElement.linkedin !== "") {
          [...linkedin].forEach((e) => {
            e.textContent = "linkedin ↗";
            e.href = foundElement.linkedin;
            e.setAttribute("target", "_blank");
          });
          flag = true;
        }

        if (flag)
          [...linkedin].forEach((e) =>
            e.appendChild(document.createElement("br"))
          );

        var suppImg = document.getElementById("supp-img");
        if (
          foundElement.hasOwnProperty("supp_images") &&
          Array.isArray(foundElement.supp_images)
        ) {
          foundElement.supp_images.forEach(function (imageSrc, index) {
            var img = document.createElement("img");
            img.src = imageSrc;
            suppImg.appendChild(img);
          });
        }

        foundElement.related_projects.forEach(function (proj, index) {
          related_projects.push(proj);
        });
        let randColor = colors[Math.floor(Math.random() * colors.length)];
        let aTags = document.querySelectorAll("a");
        for (let i = 0; i < aTags.length; i++) {
          aTags[
            i
          ].style.color = `rgb(${randColor.rgb[0]},${randColor.rgb[1]},${randColor.rgb[2]})`;
        }
      } else {
        window.location.href = "/index.html";
        console.log("Element not found");
        document.getElementById("title").textContent = "Project not found :(";
      }
    });
}

function pickRelatedProject() {
  if (related_projects.length)
    window.location.href = `/project.html?id=${
      related_projects[Math.floor(Math.random() * related_projects.length)]
    }`;
}
