const { ipcRenderer } = require("electron");

let getSetup = () => {
  let form;

  form = document.getElementById("formi");
  //form.addEventListener("submit", submit);

  ipcRenderer.send("getDBSetup");

  let setup;

  ipcRenderer.on("dbSetup", (_, data) => {
    setup = data;
    Object.keys(setup).forEach(key => {
      if (form.elements[key]) form.elements[key].value = setup[key];
    });
  });
};

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
  // send data to main.js
  ipcRenderer.send("dbSetupChannel", data);
}

function createSetupForm() {
  let form = document.createElement("form");
  form.id = "formi";
  form.className = "pure-form pure-form-aligned";

  let fs = document.createElement("fieldset");
  form.append(fs);

  let databaseName = document.createElement("input");
  let host = document.createElement("input");
  let user = document.createElement("input");
  let password = document.createElement("input");
  let submit = document.createElement("input");

  databaseName.name = "database";
  host.name = "host";
  user.name = "username";
  password.name = "password";

  databaseName.setAttribute("type", "text");
  host.setAttribute("type", "text");
  user.setAttribute("type", "text");
  password.setAttribute("type", "password");

  submit.setAttribute("type", "submit");
  submit.addEventListener("submit", submit);
  submit.className = "pure-button";

  let divi = document.createElement("div");
  divi.className = "pure-controls";

  fs.appendChild(databaseName);
  fs.appendChild(host);
  fs.appendChild(user);
  fs.appendChild(password);
  fs.appendChild(submit);

  return form;
}

module.exports = { createSetupForm, getSetup };
