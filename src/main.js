// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, shell, dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let menuTemplate = [{
  label: 'Plik',
  submenu: [
    {
    label: 'Fullscreen',
    accelerator: 'CmdOrCtrl+f',
    role: 'toggleFullScreen'
    },
    {
    label: 'Minimalizuj',
    accelerator: 'CmdOrCtrl+m',
    role: 'minimize'
    },
    {
    label: 'Zamknij',
    accelerator: 'CmdOrCtrl+w',
    role: 'quit'
  }
]
  
}]

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
    }
  })
  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', (createWindow))
{
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
