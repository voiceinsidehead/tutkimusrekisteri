const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
module.exports = { topBarContent, listReseaches };

let personsBool = false;
let researchesBool = false;

let allResearches = [];

ipcRenderer.send("getAllResearches");

ipcRenderer.on("allResearches", (e, data) => {
  console.log(data);
  allResearches = data;
});

function topBarContent() {
  /* ipcRenderer.send(
    "exportCSV",
    "/Users/joonas/Desktop/Untitled.csv",
    "984a8622-9862-4fcf-a56f-597625ce6e20"
  ); */

  let container = document.getElementById("main");
  let div = document.createElement("div");
  div.id = "topBar";

  container.appendChild(div);

  let buttons = document.createElement("div");
  buttons.id = "buttons";

  buttons.style.width = "23%";
  buttons.style.height = "100%";

  /*let perdiv = document.createElement("div");
  perdiv.id = "person";
  let p = document.createElement("p");
  p.append("Person");
  perdiv.appendChild(p);*/

  let resdiv = document.createElement("div");
  resdiv.id = "research";
  p = document.createElement("p");
  p.append("Research");
  resdiv.appendChild(p);

  let fs = document.createElement("fieldset");

  let inpdiv = document.createElement("div");
  inpdiv.id = "searchBox";

  //let input = document.createElement("input");
  //input.className = "input";
  //input.id = "searchValue";

  //input.type = "text";
  //input.value = "";

  let serdiv = document.createElement("div");
  serdiv.id = "search";

  p = document.createElement("p");
  p.append("Search");
  serdiv.appendChild(p);

  //inpdiv.appendChild(input);
  //buttons.appendChild(perdiv);
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

  container.appendChild(tbl);
  //changeColor(perdiv);
  researchesBool = true;

  /*perdiv.addEventListener("click", function() {
    tbl.innerHTML = "";
    personsBool = false;
    researchesBool = true;
    changeColor(perdiv);
    inpdiv.innerHTML = "";
    inpdiv.append(input);

    let saveBtn = document.getElementById("saveBtn");
    if (saveBtn != null) {
      saveBtn.remove();
    }
  });*/

  //resdiv.addEventListener("click", function() {
  //researchesBool = false;
  //personsBool = true;
  //tbl.innerHTML = "";
  //changeColor(resdiv);
  //inpdiv.innerHTML = "";
  let select = document.createElement("select");
  select.id = "researches";
  const options = allResearches.map(rs => {
    const element = document.createElement("option");
    element.value = rs.researchID;
    element.append(rs.name);
    return element;
  });
  select.append(...options);
  inpdiv.append(select);

  //let saveBtn = document.getElementById("saveBtn");
  //if (saveBtn != null) {
  //  saveBtn.remove();
  //}
  //});

  serdiv.addEventListener("click", function() {
    personQuery();
  });
}

//Function for changing button text and backround color
/*function changeColor(element) {
  document.getElementById("person").removeAttribute("style");
  document.getElementById("research").removeAttribute("style");
  element.style.background = "#708090";
  element.style.color = "#DADADA";
}*/

function personQuery() {
  if (researchesBool) {
    ipcRenderer.send("idNumber", document.getElementById("searchValue").value);
    ipcRenderer.on("researches", function(event, arg) {
      tableData(arg, "researches");
    });
  }

  if (personsBool) {
    // tableData([], "persons");
    ipcRenderer.send("research", document.getElementById("researches").value);
    ipcRenderer.on("researchPeople", function(event, arg) {
      console.log(arg);
      tableData(arg, "persons");
    });
  }
}

//Function for drawing and deleting table
/*function tableData(array, tableName) {
  var table = document.getElementById("dataTable");

  //Wipe the previous table.
  table.deleteTHead();
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

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

    if (document.getElementById("saveBtn") == null) {
      let saveBtn = document.createElement("button");
      saveBtn.id = "saveBtn";
      saveBtn.innerHTML = "Save";

      saveBtn.addEventListener("click", function() {
        saveFile();
      });
      contentdiv.appendChild(saveBtn);
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
}*/

function listReseaches() {
  /*for (let i = 0; i < allResearches.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = allResearches[i].name + " " + allResearches[i].researchManager + "<br>";
    main.appendChild(div);
  }*/
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
