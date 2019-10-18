const { ipcRenderer, remote } = require("electron");

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

  formData.name = form.elements[0].value;
  formData.permission = form.elements[1].value;
  formData.archiveId = form.elements[2].value;
  formData.researchManager = form.elements[3].value;

  //send data to main.js
  ipcRenderer.send("dataChannel", formData, sendFilePath);
}

let sendFilePath;

function addfile() {
  //opens native file explorer window
  let explorer = remote.dialog.showOpenDialog({ properties: ["openFile"] });
  console.log(explorer);
  explorer.then(function(value) {
    if (value.canceled == false) {
      let filepath = value.filePaths[0];
      document.getElementById("filepath").innerHTML = filepath;
      console.log(filepath);
      sendFilePath = filepath;
    } else {
      console.log("Canceled!");
    }
  });
}
