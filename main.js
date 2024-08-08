document.addEventListener("DOMContentLoaded", () => {
  const buttonsContainer = document.querySelector(".buttons");
  const mainImage = document.getElementById("main-image");
  const mainTitle = document.getElementById("main-title");
  const mainText = document.getElementById("main-text");

  // Function to load project files and generate image buttons
  const loadProjects = async () => {
    try {
      const response = await fetch("projects.json"); // Path to the projects index file
      const projectFiles = await response.json();

      for (const file of projectFiles) {
        const projectResponse = await fetch(file);
        const project = await projectResponse.json();

        const inputImage = document.createElement("input");
        inputImage.type = "image";
        inputImage.classList.add("col-xs-1");
        inputImage.src = project.imagePath; // Set the button image to the project's main image
        inputImage.alt = project.title;

        inputImage.addEventListener("click", () => loadProject(project));
        buttonsContainer.appendChild(inputImage);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    loadProject(project)
  };

  // Function to load a specific project
  const loadProject = (project) => {
    mainImage.src = project.imagePath;
    mainTitle.textContent = project.title;
    mainText.innerHTML = project.content;
  };

  loadProjects();
});
