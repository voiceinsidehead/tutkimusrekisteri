const { ipcRenderer } = require("electron");

document.getElementById("back").addEventListener("click", BackPage);

let form = document.getElementById("formi");
form.addEventListener("submit", submit);

let addFileBtn = document.getElementById("addFileBtn");
addFileBtn.addEventListener("click", addfile);

function BackPage() {
  location.replace("../index.html");
}

//gets form data
function submit(e) {
  e.preventDefault();
  //create object to store form data
  let formData = {};

  formData.identification = form.elements[0].value;
  formData.name = form.elements[1].value;
  formData.permission = form.elements[2].value;
  formData.archiveId = form.elements[3].value;
  formData.researchManager = form.elements[4].value;

  console.log(formData);
  //send data to main.js
  ipcRenderer.send("formDataChannel", formData);
}

function addfile() {
  // opens native file explorer window
  const { dialog } = require("electron").remote;
  let explorer = dialog.showOpenDialog({ properties: ["openFile"] });
  console.log(explorer);
  explorer.then(function(value) {
    if (value.canceled == false) {
      let filepath = value.filePaths[0];
      document.getElementById("filepath").innerHTML = filepath;
      console.log(filepath);

      //send data to main.js
      ipcRenderer.send("filePathChannel", filepath);
    } else {
      console.log("Canceled!");
    }
  });
}
