const { topBarContent } = require("./View/Viewgui");
const { createForm } = require("./Add/Addgui");
const { createSetupForm, getSetup } = require("./Setup/setup");

window.onload = function() {
  document.getElementById("view").addEventListener("click", ViewPage);
  document.getElementById("add").addEventListener("click", ModifyPage);
  document.getElementById("setup").addEventListener("click", SetupPage);
};

function ModifyPage() {
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.append(createForm());
  main.setAttribute("style", "align-items:center;");
}

function ViewPage() {
  main.innerHTML = "";
  topBarContent();
  main.setAttribute("style", "align-items:start;");
}

function SetupPage() {
  main.innerHTML = "";
  main.append(createSetupForm());
  getSetup();
  main.setAttribute("style", "align-items:center;");
  //location.replace("Setup/setup.html")
}
