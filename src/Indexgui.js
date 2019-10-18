window.onload = function() {
  document.getElementById("View").addEventListener("click", ViewPage);
  document.getElementById("Modify").addEventListener("click", ModifyPage);
};

function ModifyPage() {
  location.replace("Add/Add.html");
}

function ViewPage() {
  location.replace("View/View.html");
}
