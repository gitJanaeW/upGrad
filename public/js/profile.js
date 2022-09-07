var projectName = document.getElementById("project-name");
var subjectInput = document.getElementById("subject-query");
var abstractInput = document.getElementById("abstract-input");
var radioCollabYesInput = document.getElementById("collab-query-yes");
var radioFinishedYesInput = document.getElementById("finished-query-yes");
var projectUrlInput = document.getElementById("project-url");

async function createProjects(e) {
  e.preventDefault();
  var project_name = projectName.value;
  var subject = subjectInput.value;
  var abstract = abstractInput.value;
  var project_url = projectUrlInput.value;
  var collab_status = "no";
  var ongoing_status = "no";

  if (radioCollabYesInput.checked) {
    collab_status = "Yes";
  }
  if (radioFinishedYesInput.checked) {
    ongoing_status = "Yes";
  }
  const response = await fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify({
      project_name,
      subject,
      abstract,
      collab_status,
      ongoing_status,
      project_url,
    }),

    headers: { "Content-Type": "application/json" },
  });
  location.reload();
}

function revealResearch() {
  var researchFilterForm = document.getElementById("show-filter");
  if (researchFilterForm.style.display === "none") {
    researchFilterForm.style.display = "block";
  } else {
    researchFilterForm.style.display = "none";
  }
}

function openProjectForm() {
  var projectFilterForm = document.getElementById("show-form-filter");
  if (projectFilterForm.style.display === "none") {
    projectFilterForm.style.display = "block";
  } else {
    projectFilterForm.style.display = "none";
  }
}

async function deleteProject(id) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
  location.reload();
}

document
  .querySelector(".project-form")
  .addEventListener("submit", createProjects);

const nodeList = document.querySelectorAll(".delete");
for (let i = 0; i < nodeList.length; i++) {
  let id = nodeList[i].value;
  nodeList[i].addEventListener("click", function () {
    deleteProject(id);
  });
}
