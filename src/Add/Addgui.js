const { ipcRenderer, remote } = require("electron");

// document.getElementById("back").addEventListener("click", BackPage);

let form = document.getElementById("formi");
form.addEventListener("submit", submit);

let addFileBtn = document.getElementById("addFileBtn");
addFileBtn.addEventListener("click", addfile);

//gets form data
function submit(e) {
  e.preventDefault();
  //create object to store form data
  let data = {};

  for (let i = 0; i < form.elements.length; i++) {
    let elem = form.elements[i];
    if (elem.nodeName === "INPUT" && elem.type !== "submit")
      data[elem.name] = elem.value;
  }
  //send data to main.js
  ipcRenderer.send("addResearch", data);
}

function addfile() {
  //opens native file explorer window
  let explorer = remote.dialog.showOpenDialog({ properties: ["openFile"] });
  console.log(explorer);
  explorer.then(function(value) {
    if (value.canceled == false) {
      let filepath = value.filePaths[0];
      form.elements["file"].value = filepath;
    } else {
      console.log("Canceled!");
    }
  });
}
