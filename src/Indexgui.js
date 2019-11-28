const { createForm } = require("./Add/Addgui");

window.onload = function() {
  document.getElementById("View").addEventListener("click", ViewPage);
  document.getElementById("Modify").addEventListener("click", ModifyPage);
  document.getElementById("Setup").addEventListener("click", SetupPage);
};

function ModifyPage() {
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.append(createForm());
}

function ViewPage() {
  location.replace("View/View.html");
}

function SetupPage() {
  location.replace("Setup/setup.html");
}
