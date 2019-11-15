const { ipcRenderer } = require("electron");

document.getElementById("back").addEventListener("click", back);
form = document.getElementById("formi");
form.addEventListener("submit", submit);

let setup;

ipcRenderer.send("getDBSetup");

ipcRenderer.on("dbSetup", (_, data) => {
  setup = data;
  Object.keys(setup).forEach(key => {
    if (form.elements[key]) form.elements[key].value = setup[key];
  });
});

function back() {
  location.replace("../index.html");
}

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
