const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const env = require("dotenv");

env.config();

// Database refernce
const Database = require(path.resolve(".", "models"));

let db = new Database();
db.connect().then(() => db.sequelize.sync({ force: true }));
///FORCING DROPS THE DATABASE ! FOR TESTING PURPOSES ONLY ! MUST BE REMOVED !

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//let researches = db.Research.findAll();

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    preload: "./preload.js"
  });

  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//get database connection setup data
ipcMain.on("dbSetupChannel", async (event, data) => {
  await db.connect(data).then(() => db.sequelize.sync());
});

// get filepath from rendered method
ipcMain.on("dataChannel", async (event, obj, file) => {
  let ids = readCsv(file);
  let rs = db.Research.create(obj);
  Promise.all([rs, ids]).then(([research, data]) => {
    console.log(`RESEARCH ID: ${research.researchID}`);
    data.forEach(async value => {
      let [person, _] = await db.Person.findOrCreate({
        where: { identificationNumber: value.HETU }
      });
      research.addPerson(person, {
        through: { identificationHash: value.HASH }
      });
    });
  });
});

// Finds all the researches where ID belongs.
ipcMain.on("idNumber", async (e, id) => {
  let researches = await db.Research.findAll({
    include: [
      {
        model: db.Person,
        where: { identificationNumber: id }
      }
    ]
  });
  const data = researches.map(rs => {
    return {
      name: rs.name,
      permission: rs.permission,
      archiveID: rs.archiveID,
      researchManager: rs.researchManager
    };
  });
  // createMarkdown(id, researches)
  e.reply("researches", data);
});

// Finds all people belonging to research
ipcMain.on("research", async (e, id) => {
  let research = await db.Research.findByPk(id);
  let people = await research.getPeople({
    joinTableAttributes: ["identificationHash"]
  });
  e.reply("researchPeople", people);
});

ipcMain.on("getDBSetup", e => {
  e.reply("dbSetup", db.connection);
});

async function readCsv(filepath) {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];

  await fs
    .createReadStream(filepath)
    .pipe(csv())
    .on("data", data => results.push(data))
    .on("end", () => console.log("File readed"));
  return results;
}
