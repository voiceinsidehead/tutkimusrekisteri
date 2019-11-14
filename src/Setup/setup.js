const { ipcRenderer } = require("electron");

document.getElementById("back").addEventListener("click", back);
form = document.getElementById("formi");
form.addEventListener("submit", submit);

function back() {
  location.replace("../index.html");
}

//gets form data
function submit(e) {
  e.preventDefault();
  //create object to store form data
  let dbData = {};

  dbData.dbName = form.elements[0].value;
  dbData.dbAddress = form.elements[1].value;
  dbData.dbUser = form.elements[2].value;
  dbData.dbPassword = form.elements[3].value;
  console.log(dbData);

  //send data to main.js
  ipcRenderer.send("dbSetupChannel", dbData);
}
