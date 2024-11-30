window.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  const queryString =
    window.location
      .search; /* Example: ?product=shirt&color=blue&newuser&size=m */
  const urlParams = new URLSearchParams(queryString);
  const parsedSiteId = urlParams.get("id"); // ?cat=something

  // Iterate through the array to find the element with the specific attribute
  fetch("student-info.json")
    .then((response) => response.json())
    .then((data) => {
      let foundElement = data.find(
        (item) =>
          (item.first_name + item.last_name.substring(0, 1)).toLowerCase() ===
          parsedSiteId
      );

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
          year = "Senior Thesis";
        }
        document.getElementById("year").textContent = year + " ";
        document.getElementById("medium").textContent = foundElement.medium;

        let link = document.getElementById("link");
        let linkA = document.createElement("a");
        // linkA.textContent = foundElement.project_link;
        linkA.textContent = "view project";
        linkA.href = foundElement.project_site;
        link.appendChild(linkA);

        document.getElementById("description").textContent =
          foundElement.description;

        if (foundElement.keywords !== "")
          document.getElementById("keywords").textContent =
            "Keywords: " + foundElement.keywords;
        else document.getElementById("keywords").remove();

        // document.getElementById("personal-link").textContent =
        //   foundElement.portfolio_link;
        if (foundElement.personal_site !== "") {
          document.getElementById("personal-link").textContent =
            "view their portfolio";
          document.getElementById("personal-link").href =
            foundElement.personal_site;
        }
        document
          .getElementById("personal-link")
          .setAttribute("target", "_blank");

        document.getElementById("linkedin").textContent = foundElement.linkedin;
        // document.getElementById("linkedin").textContent = "linkedin";
        document.getElementById("linkedin").href = foundElement.linkedin;
        document.getElementById("linkedin").setAttribute("target", "_blank");

        var mainImg = document.getElementById("main-img");
        if (foundElement.hasOwnProperty("main_image")) {
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
        // var suppImg = document.getElementById("supp-img");
        // if (foundElement.hasOwnProperty("supp_path")) {
        //   suppImg.childNodes[0].src = foundElement.supp_path;
        // }
        // var suppImg = document.getElementById("supp-img");
        // if (
        //   foundElement.hasOwnProperty("supp_images") &&
        //   Array.isArray(foundElement.supp_path)
        // ) {
        //   foundElement.supp_path.forEach(function (imageSrc, index) {
        //     var img = document.createElement("img");
        //     img.src = imageSrc;
        //     suppImg.appendChild(img);
        //   });
        // }

        var relatedProjects = document.getElementById("related-projects");
        foundElement.related_projects.forEach(function (proj, index) {
          var a = document.createElement("a");
          a.href = "/project.html?id=" + proj;
          a.textContent = proj + ", ";
          relatedProjects.appendChild(a);
        });
      } else {
        window.location.href = "/index.html";
        console.log("Element not found");
        document.getElementById("title").textContent = "Project not found :(";
      }
    });
}
