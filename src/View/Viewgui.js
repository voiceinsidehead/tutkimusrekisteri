window.onload = function() {
  //dragElement(document.getElementById("mydiv"));
  document.getElementById("Back").addEventListener("click", BackPage);

  Tab_Selected = document.getElementById("tab_Sel");
  Tab_Selected.addEventListener("change", Buttongreen);
  Submit.addEventListener("click", Buttongreen);
};

//Function for deciding wich table to show and button (Id == Submit) color.
function Buttongreen(event) {
  var selected = document.getElementById("tab_Sel").value;
  var submit = document.getElementById("Submit");

  switch (true) {
    //Default state of the selection and default button (Id == Submit) color.
    case selected == "Default":
      submit.style.background = "white";
      submit.style.color = "black";
      break;

    //Changes color of the button to green to symbolize that selections are aproved.
    case selected == "Person" && event.type == "change":
      submit.style.background = "#4caf50";
      submit.style.color = "white";
      break;

    //Case when selection is specified and specific button (Id == Submit) is pressed.
    case selected == "Person" && event.type == "click":
      Showtable("Demo Person");
      //Function for pulling up a table here.
      break;

    //Changes color of the button to green to symbolize that selections are aproved.
    case selected == "ResearchId" && event.type == "change":
      submit.style.background = "#4caf50";
      submit.style.color = "white";
      break;

    //Case when selection is specified and specific button (Id == Submit) is pressed.
    case selected == "ResearchId" && event.type == "click":
      Showtable("Demo ResearchId");
      //Function for pulling up a table here.
      break;
  }
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
} /*
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }*/ /*

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
*/ /*
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
 */
/*
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
*/
