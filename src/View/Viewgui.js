const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
module.exports = { topBarContent, changeColor };

/*window.onload = function() {
  dragElement(document.getElementById("dataTable"));
  let person = document.getElementById("person");

  Tab_Selected = document.getElementById("tab_Sel");

  document.getElementById("search").addEventListener("click", function() {
    personQuery();
  });

  window.addEventListener("keyup", tableControl);
  window.addEventListener("keypress", tableControl);
  window.addEventListener("keydown", tableControl);
  window.addEventListener("wheel", tableControl);
};*/

let personsBool = false;
let researchesBool = false;

function topBarContent() {
  let container = document.getElementById("main");
  let div = document.createElement("div");
  div.id = "topBar";

  container.appendChild(div);

  let buttons = document.createElement("div");
  buttons.id = "buttons";

  buttons.style.width = "27%";
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

  tbl = document.createElement("table");
  tbl.id = "dataTable";
  tbl.style.visibility = "hidden";

  document.getElementById("topBar").appendChild(buttons);
  document.getElementById("topBar").appendChild(inpdiv);
  document.getElementById("topBar").appendChild(serdiv);

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

var direction = 0;
var scaleValue = 1;
var map = {};

function tableControl(e) {
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == "keydown";
  var dataTable = document.getElementById("dataTable");
  var windowWidht = window.innerWidth;
  var windowHeight = window.innerHeight;
  var leftValue;
  var topValue;

  switch (true) {
    //Detect moesewheel direction.
    case e.deltaY < 0:
      direction = 1;
      break;

    //Detect moesewheel direction.
    case e.deltaY > 0:
      direction = -1;
      break;

    //"Zoom" table.
    case (map[17] && map[107]) || direction > 0:
      direction = 0;
      scaleValue += 0.1;
      document.getElementById("dataTable").style.transform =
        "scale(" + scaleValue + ")";
      break;

    //"Zoom" table.
    case (map[17] && map[109]) || direction < 0:
      direction = 0;
      scaleValue -= 0.1;
      document.getElementById("dataTable").style.transform =
        "scale(" + scaleValue + ")";
      break;

    //Make table move to left.
    case map[17] && map[37]:
      leftValue = (dataTable.offsetLeft / windowWidht) * 100 - 0.5;
      document.getElementById("dataTable").style.left = leftValue + "%";
      break;

    //Make table move to right.
    case map[17] && map[39]:
      leftValue = (dataTable.offsetLeft / windowWidht) * 100 + 0.5;
      document.getElementById("dataTable").style.left = leftValue + "%";
      break;

    //Make table move up.
    case map[17] && map[38]:
      topValue = (dataTable.offsetTop / windowHeight) * 100 - 0.5;
      document.getElementById("dataTable").style.top = topValue + "%";
      break;

    //Make table move up.
    case map[17] && map[40]:
      topValue = (dataTable.offsetTop / windowHeight) * 100 + 0.5;
      document.getElementById("dataTable").style.top = topValue + "%";
      break;

    default:
      break;
  }
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "dataTable")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "dataTable").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
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
