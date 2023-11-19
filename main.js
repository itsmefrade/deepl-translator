const { app, BrowserWindow, ipcMain, nativeTheme,clipboard,ipcRenderer,Tray, globalShortcut } = require('electron')
const path = require('path')
const deepl = require("deepl-node")
const config = require("./config.json");
const {create} = require("axios");


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  win.loadFile('index.html')

}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

ipcMain.handle('clipboard:get', async () => {

  let textToTranslate = clipboard.readText("selection") ? clipboard.readText("selection") : clipboard.readText("clipboard")
  const deepl = require("deepl-node")
  const apiKey = config.API_KEY
  const translator = new deepl.Translator(apiKey);
  let res = await translator.translateText(textToTranslate, null, 'tr')
  return res.text
})


ipcMain.handle("clipboard:copy", (event, args) => {

  return clipboard.writeText(args,'clipboard')
})

let tray = null;
app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('CommandOrControl+Shift+X', async () => {
    // Belirli bir tuş kombinasyonuna basıldığında yapılacak işlemler

    //document.getElementById('translated-sentence').innerText =  await window.actions.get()
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {

    tray = new Tray(path.join(__dirname, 'icon.png'));

    // Tray üzerindeki simgeye tıklandığında yapılacaklar
    tray.on('click', () => {
      tray.destroy()
      createWindow()

    });
    //app.quit()
  }
})
