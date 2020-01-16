const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { writeFile } = require("fs").promises;
const env = require("dotenv");
const mdpdf = require("mdpdf");

env.config();

// Database refernce
const Database = require(path.resolve(".", "models"));

let db = new Database();
db.connect().then(() => db.sequelize.sync());
///FORCING DROPS THE DATABASE ! FOR TESTING PURPOSES ONLY ! MUST BE REMOVED !

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile("index.html");

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

ipcMain.on("saveFilePath", (e, fpath) => {
  let options = {
    source: path.join(__dirname, "tmp.md"),
    destination: fpath,
    // styles: path.join(__dirname, 'md-styles.css'),
    pdf: {
      format: "A4",
      orientation: "portrait"
    }
  };

  mdpdf
    .convert(options)
    .then(pdfPath => {
      console.log("PDF Path:", pdfPath);
    })
    .catch(err => {
      console.error(err);
    });
});

// Connect database with new setup.
ipcMain.on("dbSetupChannel", async (event, data) => {
  await db.connect(data).then(() => db.sequelize.sync());
});

// Get filepath from rendered method
ipcMain.on("addResearch", async (e, data) => {
  let ids = readCsv(data.file);
  delete data.file;
  let rs = db.Research.create(data);
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
  e.reply("researchAdded");
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
  createMarkdown(id, researches);
  e.reply("researches", data);
});

ipcMain.on("getAllResearches", async e => {
  const researches = await db.Research.findAll();
  data = researches.map(rs => {
    return { name: rs.name, researchID: rs.researchID };
  });
  e.reply("allResearches", data);
});

// Finds all people belonging to research
ipcMain.on("research", async (e, id) => {
  let research = await db.Research.findByPk(id);
  let people = await research.getPeople({
    joinTableAttributes: ["identificationHash"]
  });
  const data = people.map(person => {
    return {
      identificationNumber: person.identificationNumber,
      identificationHash: person.ResearchPerson.identificationHash
    };
  });
  e.reply("researchPeople", data);
});

ipcMain.on("getDBSetup", e => {
  e.reply("dbSetup", db.connection);
});

async function createMarkdown(id, data) {
  const str = `## Researches for identification number: ${id}
  ${researchesToString(data)}`;
  await writeFile(path.join(__dirname, "tmp.md"), str);
}

function researchesToString(data) {
  return data
    .map((rs, i) => {
      return `
### ${i + 1}. Research name: ${rs.name}
- Permission number: ${rs.permission}
- Archive Id: ${rs.archiveID}
- Research Manager: ${rs.researchManager}`;
    })
    .join("\n");
}

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
