const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
module.exports = { topBarContent, changeColor };

let personsBool = false;
let researchesBool = false;

function topBarContent() {
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
  var text = document.createTextNode("Person");
  p.appendChild(text);
  perdiv.appendChild(p);

  let resdiv = document.createElement("div");
  resdiv.id = "research";

  p = document.createElement("p");
  text = document.createTextNode("Research");
  p.appendChild(text);
  resdiv.appendChild(p);

  let inpdiv = document.createElement("div");
  inpdiv.id = "searchBox";

  let input = document.createElement("input");
  input.id = "searchValue";

  input.type = "text";
  input.value = "";

  let serdiv = document.createElement("div");
  serdiv.id = "search";

  p = document.createElement("p");
  text = document.createTextNode("Search");
  p.appendChild(text);
  serdiv.appendChild(p);

  inpdiv.appendChild(input);
  buttons.appendChild(perdiv);
  buttons.appendChild(resdiv);

  contentdiv = document.createElement("div");
  contentdiv.id = "contentdiv";

  contentdiv.style.width = "100%";
  contentdiv.style.height = "87%";

  tbl = document.createElement("table");
  tbl.id = "dataTable";
  tbl.style.visibility = "hidden";

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

  document.getElementById("main").appendChild(tbl);

  document.getElementById("person").addEventListener("click", function() {
    changeColor("person");
  });

  document.getElementById("research").addEventListener("click", function() {
    changeColor("research");
  });

  document.getElementById("search").addEventListener("click", function() {
    personQuery();
  });
}

//Function for changing button text and backround color
function changeColor(variable) {
  personBool = false;

  var person = document.getElementById("person");
  var research = document.getElementById("research");

  if (variable == "person") {
    personsBool = false;
    researchesBool = true;

    person.style.background = "#708090";
    person.style.color = "#DADADA";

    research.style.background = "#DADADA";
    research.style.color = "#708090";
  }

  if (variable == "research") {
    personsBool = true;
    researchesBool = false;

    research.style.background = "#708090";
    research.style.color = "#DADADA";

    person.style.background = "#DADADA";
    person.style.color = "#708090";
  }
}

function personQuery() {
  let searchFor = document.getElementById("searchValue").value;

  if (researchesBool) {
    ipcRenderer.send("idNumber", searchFor);
    ipcRenderer.on("researches", function(event, arg) {
      tableData(arg, "researches");
    });
  }

  if (personsBool) {
    tableData([], "persons");
    /*    Needs main.js ipcRenderer chanel/function for pulling up the data.
    ipcRenderer.send("research", searchFor);
    ipcRenderer.on("researchPeople", function(event, arg) {
      console.log(arg);
      tableData(arg);
    });
    */
  }
}

//Function for drawing and deleting table
function tableData(array, tableName) {
  var table = document.getElementById("dataTable");

  //Wipe the previous table.
  table.deleteTHead();
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  console.log(tableName, array.length);

  //Table that is drawn when query returned values for all the researches where person has been.
  if (tableName == "researches" && array.length > 0) {
    document.getElementById("noResults").style.visibility = "hidden";
    console.log("skiaa");
    let header = table.createTHead();
    var row = header.insertRow(0);

    var th1 = row.insertCell(0);
    var th2 = row.insertCell(1);
    var th3 = row.insertCell(2);
    var th4 = row.insertCell(3);

    th1.innerHTML = "<b>Name</b>";
    th2.innerHTML = "<b>Permission</b>";
    th3.innerHTML = "<b>ArchiveID</b>";
    th4.innerHTML = "<b>ResearchManager</b>";

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
  }

  if (array.length == 0) {
    document.getElementById("noResults").style.visibility = "visible";
  }

  //Table that is drawn when query returned people particapated in research.
  if (tableName == "persons") {
    //Placeholder code
    table.deleteTHead();
    for (var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
  }
  table.style.visibility = "visible";
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
