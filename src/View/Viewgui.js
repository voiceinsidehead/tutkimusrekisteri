window.onload = function() {
  dragElement(document.getElementById("demoTable"));
  document.getElementById("Back").addEventListener("click", BackPage);

  Tab_Selected = document.getElementById("tab_Sel");
  Tab_Selected.addEventListener("change", Buttongreen);
  Submit.addEventListener("click", Buttongreen);
  window.addEventListener("keyup", tableControl);
  window.addEventListener("keypress", tableControl);
  window.addEventListener("keydown", tableControl);
  window.addEventListener("wheel", tableControl);
};

var ipcRenderer = require("electron").ipcRenderer;

dragElement(document.getElementById("demoTable"));
//Function for deciding wich table to show and button (Id == Submit) color.
function Buttongreen(event) {
  var selected = document.getElementById("tab_Sel").value;
  var submit = document.getElementById("Submit");

  switch (true) {
    //Default state of the selection and default button (Id == Submit) color.
    case selected == "Default":
      submit.style.background = "white";
      submit.style.color = "black";
      document.getElementById("demoTable").style.visibility = "hidden";
      inputbox("delete");
      break;

    //Changes color of the button to green to symbolize that selections are aproved.
    case selected == "Person" && event.type == "change":
      submit.style.background = "#4caf50";
      submit.style.color = "white";
      inputbox("add");
      break;

    //Case when selection is specified and specific button (Id == Submit) is pressed.
    case selected == "Person" && event.type == "click":
      document.getElementById("demoTable").style.visibility = "visible";
      //add fuction for creating new input box
      tableData();
      personQuery();
      break;
    //do child process or other data manipulation and name it manData
    //event.sender.send(‘manipulatedData’, manData);

    //Changes color of the button to green to symbolize that selections are aproved.
    case selected == "ResearchId" && event.type == "change":
      submit.style.background = "#4caf50";
      submit.style.color = "white";
      inputbox("delete");
      break;

    //Case when selection is specified and specific button (Id == Submit) is pressed.
    case selected == "ResearchId" && event.type == "click":
      document.getElementById("demoTable").style.visibility = "visible";
      tableData();
      break;
  }
}

function personQuery() {
  ipcRenderer.send("idNumber", "021283A410L");
  ipcRenderer.on("researches", function(event, arg) {
    /*arg.forEach((obj) => {
    console.log(obj);
  })*/
    console.log(arg);
  });
}

function inputbox(param) {
  var list = document
    .getElementsByClassName("tableSelect")[0]
    .getElementsByTagName("input").length;

  if (param == "add") {
    var input = document.createElement("input");
    input.type = "text";
    input.setAttribute("id", "text");
    input.setAttribute("type", "text");
    input.setAttribute("name", "username");
    input.setAttribute("placeholder", "Hlö");
    document.getElementsByClassName("tableSelect")[0].appendChild(input);
  }

  if (param == "delete" && list > 0) {
    var elem = document.getElementById("text");
    document.getElementsByClassName("tableSelect")[0].removeChild(elem);
  }
}

function tableData() {
  var table = document.getElementById("demoTable");

  //Wipe the previous table.
  /*
  for(var i = table.rows.length - 1; i > 0; i--)
  {
    table.deleteRow(i);
  }
  */
  /*
  //Create the new table.
  for (var i = 0; i < persons.length; i++) {
    var row = table.insertRow(i + 1);
    var fisrtName = row.insertCell(0);
    var lastName = row.insertCell(1);
    var country = row.insertCell(2);
    fisrtName.innerHTML = persons[i]["fisrtName"];
    lastName.innerHTML = persons[i]["lastName"];
    country.innerHTML = persons[i]["country"];
  }
  */
}

var direction = 0;
var scaleValue = 1;
var map = {};
function tableControl(e) {
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == "keydown";
  var demoTable = document.getElementById("demoTable");
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
      document.getElementById("demoTable").style.transform =
        "scale(" + scaleValue + ")";
      break;

    //"Zoom" table.
    case (map[17] && map[109]) || direction < 0:
      direction = 0;
      scaleValue -= 0.1;
      document.getElementById("demoTable").style.transform =
        "scale(" + scaleValue + ")";
      break;

    //Make table move to left.
    case map[17] && map[37]:
      leftValue = (demoTable.offsetLeft / windowWidht) * 100 - 0.5;
      document.getElementById("demoTable").style.left = leftValue + "%";
      break;

    //Make table move to right.
    case map[17] && map[39]:
      leftValue = (demoTable.offsetLeft / windowWidht) * 100 + 0.5;
      document.getElementById("demoTable").style.left = leftValue + "%";
      break;

    //Make table move up.
    case map[17] && map[38]:
      topValue = (demoTable.offsetTop / windowHeight) * 100 - 0.5;
      document.getElementById("demoTable").style.top = topValue + "%";
      break;

    //Make table move up.
    case map[17] && map[40]:
      topValue = (demoTable.offsetTop / windowHeight) * 100 + 0.5;
      document.getElementById("demoTable").style.top = topValue + "%";
      break;

    default:
      break;
  }
}

function write(arvo) {
  console.log(arvo);
}

function Showtable(skia) {
  var h1 = document.createElement("h1");
  h1.textContent = skia;
  h1.setAttribute("class", "note");
  document.body.appendChild(h1);
}

function BackPage() {
  location.replace("../index.html");
}

function ViewPage() {
  location.replace("View/View.html");
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "demoTable")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "demoTable").onmousedown = dragMouseDown;
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
