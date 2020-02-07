const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
module.exports = { PersonContent, personQuery };
/*
let allResearches = [];

ipcRenderer.on("allResearches", (e, data) => 
{
  allResearches = data;
});
*/
function PersonContent() {
  /*
  ipcRenderer.send("getAllResearches");
  */

  let container = document.getElementById("main");
  let div = document.createElement("div");
  div.id = "topBar";

  container.appendChild(div);

  let buttons = document.createElement("div");
  buttons.id = "buttons";

  buttons.style.width = "23%";
  buttons.style.height = "100%";

  let perdiv = document.createElement("div");
  perdiv.id = "person";
  let p = document.createElement("p");
  p.append("Person");
  perdiv.appendChild(p);

  let fs = document.createElement("fieldset");

  let inpdiv = document.createElement("div");
  inpdiv.id = "searchBox";

  let input = document.createElement("input");
  input.className = "input";
  input.id = "searchValue";

  input.type = "text";
  input.value = "";

  let serdiv = document.createElement("div");
  serdiv.id = "search";

  p = document.createElement("p");
  p.append("Search");
  serdiv.appendChild(p);

  inpdiv.appendChild(input);
  buttons.appendChild(perdiv);
  //buttons.appendChild(resdiv);

  contentdiv = document.createElement("div");
  contentdiv.id = "contentdiv";

  contentdiv.style.width = "100%";
  contentdiv.style.height = "87%";

  tbl = document.createElement("table");
  tbl.id = "dataTable";
  tbl.style.visibility = "hidden";

  div.append(buttons, inpdiv, serdiv);
  h = document.createElement("H1"); // Create a <h1> element
  t = document.createTextNode("!No results!"); // Create a text node
  h.id = "noResults";
  h.style.visibility = "hidden";
  h.appendChild(t);

  contentdiv.appendChild(h);

  document.getElementById("topBar").appendChild(buttons);
  document.getElementById("topBar").appendChild(inpdiv);
  document.getElementById("topBar").appendChild(serdiv);
  document.getElementById("main").appendChild(contentdiv);

  container.appendChild(tbl);

  perdiv.addEventListener("click", function() {
    tbl.innerHTML = "";
    inpdiv.innerHTML = "";
    inpdiv.append(input);

    let saveBtn = document.getElementById("saveBtn");
    if (saveBtn != null) {
      saveBtn.remove();
    }
  });

  document.getElementById("search").addEventListener("click", personQuery);
}

// Function to empty the previous table.
function wipeTable() {
  // Get the table from page.
  let table = document.getElementById("dataTable");

  // Delete heder row.
  table.deleteTHead();

  // Delete data rows.
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

// Function that 'draws' table and displays the persons in the research.
function drawPersonData(array) {
  // Start by wiping possible previous table.
  wipeTable();

  // Defining the table variable that will be used.
  let table = document.getElementById("dataTable");
  table.classList.add("pure-table-horizontal");

  // Defining the header row.
  let header = table.createTHead();

  // Insert the header row on to the table.
  var row = header.insertRow(0);

  // Creating and defining the columns.
  let th1 = row.insertCell(0);
  let th2 = row.insertCell(1);
  let th3 = row.insertCell(2);
  let th4 = row.insertCell(3);

  // Inserting headers into the table.
  th1.innerHTML = "<b>Name</b>";
  th2.innerHTML = "<b>Permission</b>";
  th3.innerHTML = "<b>ArchiveID</b>";
  th4.innerHTML = "<b>ResearchManager</b>";

  // Insert data from array into the table.
  for (var i = 0; i < array.length; i++) {
    var row = table.insertRow(i + 1);
    var Name = row.insertCell(0);
    var Persmission = row.insertCell(1);
    var ArchiveID = row.insertCell(2);
    var ResearchManager = row.insertCell(3);
    Name.innerHTML = array[i]["name"];
    Persmission.innerHTML = array[i]["permission"];
    ArchiveID.innerHTML = array[i]["archiveID"];
    ResearchManager.innerHTML = array[i]["researchManager"];
  }

  // If the received array is empty display !Noresults! message.
  if (array.length == 0) {
    document.getElementById("noResults").style.visibility = "visible";
  }

  if (document.getElementById("saveBtn") == null && array.length != 0) {
    let saveBtn = document.createElement("button");
    saveBtn.id = "saveBtn";
    saveBtn.innerHTML = "Save";
    saveBtn.classList.add("pure-button");
    saveBtn.classList.add("pure-button-primary");

    saveBtn.addEventListener("click", function() {
      saveFile();
    });

    contentdiv.appendChild(saveBtn);
  }

  // Make the table visible after inserting data into it.
  table.style.visibility = "visible";
}

function personQuery() {
  ipcRenderer.send("idNumber", document.getElementById("searchValue").value);
  ipcRenderer.on("researches", function(event, arg) {
    drawPersonData(arg);
  });
}

//save file dialog
async function saveFile() {
  let options = {
    title: "Save file",
    //checks the users platform
    defaultPath: process.platform == "linux" ? ".pdf" : "",
    buttonLabel: "Save As PDF",
    filters: [{ name: "PDF", extensions: ["pdf"] }]
  };
  let dialogObject = await dialog.showSaveDialog(options);
  let filepath = dialogObject.filePath;
  ipcRenderer.send("saveFilePath", filepath);
}
