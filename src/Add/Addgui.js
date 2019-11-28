const { ipcRenderer, remote } = require("electron");

//gets form data
function submit(form) {
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

function addFile(form) {
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

function createForm() {
  let form = document.createElement("form");
  form.className = "pure-form pure-form-aligned";
  let fs = document.createElement("fieldset");
  form.append(fs);
  let fileButton = document.createElement("button");
  fileButton.className = "pure-button";
  fileButton.setAttribute("type", "button");
  fileButton.append("Add File");
  fileButton.addEventListener("click", e => {
    addFile(form);
  });
  let controls = document.createElement("div");
  controls.className = "pure-controls";
  let submitButton = document.createElement("button");
  submitButton.className = "pure-button";
  submitButton.setAttribute("type", "button");
  submitButton.append("Add Research");
  submitButton.addEventListener("click", e => {
    submit(form);
  });
  controls.append(submitButton);
  fs.append(
    createControlGroup(createTextInput("Name", "name")),
    createControlGroup(createTextInput("Permission", "permission")),
    createControlGroup(createTextInput("Archive ID", "archiveID")),
    createControlGroup(createTextInput("Research Manager", "researchManager")),
    createControlGroup([...createTextInput("CSV File", "file"), fileButton]),
    controls
  );
  return form;
}

function createControlGroup(controls) {
  let cg = document.createElement("div");
  cg.className = "pure-control-group";
  cg.append(...controls);
  return cg;
}

function createTextInput(label, name) {
  let lbl = document.createElement("label");
  lbl.setAttribute("for", name);
  lbl.append(label);
  let input = document.createElement("input");
  input.className = "input";
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", label);
  input.setAttribute("name", name);
  return [lbl, input];
}

module.exports = { createForm };
