const { ipcRenderer } = require("electron");

const { topBarContent, personQuery } = require("./View/Viewgui");
const { createForm } = require("./Add/Addgui");
const { createSetupForm, getSetup } = require("./Setup/setup");
const { PersonContent } = require("./Person/Persongui");

let dbStatus = null;

setInterval(() => {
  ipcRenderer.send("getDBStatus");
}, 10000);

ipcRenderer.on("dbStatus", (_, connected) => {
  const status = connected ? "Connected" : "Disconnected";
  if (connected != dbStatus) {
    dbStatus = connected;
    const footer = document.getElementById("footer");
    footer.innerHTML = "";
    const p = document.createElement("p");
    p.append(status);
    footer.append(p);
  }
});

window.onload = function() {
  ipcRenderer.send("getDBStatus");
  ModifyPage();
  document.getElementById("view").addEventListener("click", ViewPage);
  document.getElementById("add").addEventListener("click", ModifyPage);
  document.getElementById("setup").addEventListener("click", SetupPage);
  document.getElementById("personButton").addEventListener("click", PersonPage);
};

function buttonSelected(image, div) {
  document.getElementById("add_Butt").style.filter = "";
  document.getElementById("add").style.backgroundColor = "";

  document.getElementById("view_Butt").style.filter = "";
  document.getElementById("view").style.backgroundColor = "";

  document.getElementById("setup_Butt").style.filter = "";
  document.getElementById("setup").style.backgroundColor = "";

  document.getElementById("person_Butt").style.filter = "";
  document.getElementById("personButton").style.backgroundColor = "";

  document.getElementById(image).style.filter =
    "invert(100%) sepia(0%) saturate(2923%) hue-rotate(24deg) brightness(92%) contrast(86%)";
  document.getElementById(div).style.backgroundColor = "#708090";
}

function ModifyPage() {
  let main = document.getElementById("main");
  main.innerHTML = "";
  buttonSelected("add_Butt", "add");
  main.append(createForm());
  main.setAttribute("style", "align-items:center;");
}

function ViewPage() {
  main.innerHTML = "";
  topBarContent();
  buttonSelected("view_Butt", "view");
  main.setAttribute("style", "align-items:start;");
  main.setAttribute("style", "flex-direction: column;");
}

function SetupPage() {
  main.innerHTML = "";
  buttonSelected("setup_Butt", "setup");
  main.append(createSetupForm());
  getSetup();
  main.setAttribute("style", "align-items:center;");
}

function PersonPage() {
  main.innerHTML = "";
  PersonContent();
  buttonSelected("person_Butt", "personButton");
  main.setAttribute("style", "align-items:start;");
  main.setAttribute("style", "flex-direction: column;");
}
