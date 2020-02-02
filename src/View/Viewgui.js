const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
module.exports = { topBarContent };

let personsBool = false;
let researchesBool = false;

let allResearches = [];

ipcRenderer.on("allResearches", (e, data) => {
  allResearches = data;
});

function topBarContent() {
  ipcRenderer.send("getAllResearches");

  let container = document.getElementById("main");
  let div = document.createElement("div");
  div.id = "topBar";

  container.appendChild(div);

  let buttons = document.createElement("div");
  buttons.id = "buttons";

  buttons.style.width = "23%";
  buttons.style.height = "100%";

  let resdiv = document.createElement("div");
  resdiv.id = "research";
  p = document.createElement("p");
  p.append("Research");
  resdiv.appendChild(p);

  let fs = document.createElement("fieldset");

  let inpdiv = document.createElement("div");
  inpdiv.id = "searchBox";

  let serdiv = document.createElement("div");
  serdiv.id = "search";

  p = document.createElement("p");
  p.append("Search");
  serdiv.appendChild(p);

  buttons.appendChild(resdiv);

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

  contentdiv.appendChild(tbl);
  researchesBool = true;

  serdiv.addEventListener("click", function() {
    drawResearchData(allResearches);
  });
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

// Function that 'draws' table and displays data from researches that the person has particapated.
function drawResearchData(array) {
  // Start by wiping possible previous table.
  wipeTable();

  // Defining the table variable that will be used.
  let table = document.getElementById("dataTable");
  table.classList.add("pure-table-horizontal");

  // Defining the header row.
  let header = table.createTHead();

  // Insert the header row on to the table.
  var row = header.insertRow(0);

  //Creating and defining the columns.
  let th1 = row.insertCell(0);
  let th2 = row.insertCell(1);
  let th3 = row.insertCell(2);

  // Insert headers into the table.
  th1.innerHTML = "<b>Research name</b>";
  th2.innerHTML = "<b>Research manager</b>";
  th3.innerHTML = "<b>Save CSV File</b>";

  // Insert data from array into the table.
  for (var i = 0; i < array.length; i++) {
    let row = table.insertRow(i + 1);
    let name = row.insertCell(0);
    let researchManager = row.insertCell(1);
    let saveCSVbutton = row.insertCell(2);

    let btn = document.createElement("button");
    btn.innerHTML = "Save";
    btn.id = array[i]["researchID"];

    btn.addEventListener("click", () => {
      saveFile(btn.id);
    });

    btn.classList.add("pure-button");
    btn.classList.add("pure-button-primary");

    name.innerHTML = array[i]["name"];
    researchManager.innerHTML = array[i]["researchManager"];
    saveCSVbutton.appendChild(btn);
  }

  // If the received array is empty display !Noresults! message.
  if (array.length == 0) {
    document.getElementById("noResults").style.visibility = "visible";
  }

  // Make the table visible after inserting data into it.
  table.style.visibility = "visible";
}

//save file dialog
async function saveFile(rsID) {
  let options = {
    title: "Save file",
    //checks the users platform
    defaultPath: process.platform == "linux" ? ".csv" : "",
    buttonLabel: "Save As CSV",
    filters: [{ name: "CSV", extensions: ["csv"] }]
  };

  let dialogObject = await dialog.showSaveDialog(options);
  let filepath = dialogObject.filePath;
  ipcRenderer.send("exportCSV", filepath, rsID);
}
