document.getElementById("back").addEventListener("click", BackPage);

let form = document.getElementById("formi");
form.addEventListener("submit", submit);

let addFileBtn = document.getElementById("addFileBtn");
addFileBtn.addEventListener("click", addfile);

function BackPage() {
  location.replace("../index.html");
}

function submit(e) {
  //gets data from form
  e.preventDefault();
  console.log("toimii");
  for (let i = 0; i < form.length; i++) {
    console.log(form.elements[i].name, ":", form.elements[i].value);
  }
}

function addfile() {
  //opens native file explorer window
  const { dialog } = require("electron").remote;
  let explorer = dialog.showOpenDialog({ properties: ["openFile"] });
  console.log(explorer);
  explorer.then(function(value) {
    if (value.canceled == false) {
      let filepath = value.filePaths[0];
      console.log(filepath);
      document.getElementById("filepath").innerHTML = filepath;
    } else console.log("Canceled!");
  });
}
