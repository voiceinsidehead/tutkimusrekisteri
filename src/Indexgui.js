window.onload = function() {
  document.getElementById("view").addEventListener("click", ViewPage);
  document.getElementById("add").addEventListener("click", ModifyPage);
  document.getElementById("setup").addEventListener("click", SetupPage);
};

function ModifyPage() {
  location.replace("Add/Add.html");
}

function ViewPage() {
  location.replace("View/View.html");
}

function SetupPage() {
  location.replace("Setup/setup.html");
}
