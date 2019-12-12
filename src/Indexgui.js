const { topBarContent } = require("./View/Viewgui");
const { createForm } = require("./Add/Addgui");
const { createSetupForm, getSetup } = require("./Setup/setup");

window.onload = function() {
  document.getElementById("view").addEventListener("click", ViewPage);
  document.getElementById("add").addEventListener("click", ModifyPage);
  document.getElementById("setup").addEventListener("click", SetupPage);
};

function ModifyPage() {
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.append(createForm());
}

function ViewPage() {
  main.innerHTML = "";
  topBarContent();
  //location.replace("View/View.html");
  // Now create and append to iDiv
  /*
	let div = document.createElement("div"); 
	div.id = "topBar";

	let p = document.createElement("p")  
	let text = document.createTextNode("person");         // Create a text node
	p.appendChild(text);

	div.appendChild(p);                              // Append the text to <li>
	document.getElementById("topBar").appendChild(div); 
	*/
}

function SetupPage() {
  main.innerHTML = "";
  main.append(createSetupForm());
  getSetup();
  //location.replace("Setup/setup.html")
}
