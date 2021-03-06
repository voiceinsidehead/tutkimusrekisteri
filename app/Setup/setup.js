const { ipcRenderer } = require("electron");

let getSetup = () => {
  const form = document.getElementById("formi");
  ipcRenderer.send("getDBSetup");

  ipcRenderer.on("dbSetup", (_, data) => {
    Object.keys(data).forEach(key => {
      if (form.elements[key]) form.elements[key].value = data[key];
    });
  });
};

//gets form data
function submit(form) {
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
  let wrapper = document.createElement("div");
  let header = document.createElement("h2");
  header.append("Database Settings");

  let form = document.createElement("form");
  form.id = "formi";
  form.className = "pure-form pure-form-aligned";

  let fs = document.createElement("fieldset");
  form.append(fs);

  let databaseName = document.createElement("input");
  let host = document.createElement("input");
  let user = document.createElement("input");
  let password = document.createElement("input");
  let submitBtn = document.createElement("button");

  let divDataBaseName = document.createElement("div");
  divDataBaseName.className = "pure-control-group";
  let divHost = document.createElement("div");
  divHost.className = "pure-control-group";
  let divUser = document.createElement("div");
  divUser.className = "pure-control-group";
  let divPassword = document.createElement("div");
  divPassword.className = "pure-control-group";
  let divSubmit = document.createElement("div");
  divSubmit.className = "pure-controls";

  let labelDataBaseName = document.createElement("label");
  labelDataBaseName.innerHTML = "Database Name ";
  let labelHost = document.createElement("label");
  labelHost.innerHTML = "Host IP-Address ";
  let labelUser = document.createElement("label");
  labelUser.innerHTML = "Username ";
  let labelPassword = document.createElement("label");
  labelPassword.innerHTML = "Password ";

  databaseName.name = "database";
  host.name = "host";
  user.name = "username";
  password.name = "password";

  databaseName.setAttribute("type", "text");
  host.setAttribute("type", "text");
  user.setAttribute("type", "text");
  password.setAttribute("type", "password");

  submitBtn.setAttribute("type", "button");
  submitBtn.append("Connect");
  submitBtn.addEventListener("click", _ => {
    submit(form);
  });
  submitBtn.className = "pure-button pure-button-primary";

  divDataBaseName.appendChild(labelDataBaseName);
  divDataBaseName.appendChild(databaseName);
  divHost.appendChild(labelHost);
  divHost.appendChild(host);
  divUser.appendChild(labelUser);
  divUser.appendChild(user);
  divPassword.appendChild(labelPassword);
  divPassword.appendChild(password);
  divSubmit.appendChild(submitBtn);

  fs.appendChild(divDataBaseName);
  fs.appendChild(divHost);
  fs.appendChild(divUser);
  fs.appendChild(divPassword);
  fs.appendChild(divSubmit);

  wrapper.append(header, form);

  return wrapper;
}

module.exports = { createSetupForm, getSetup };
