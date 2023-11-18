const { app, BrowserWindow, ipcMain, nativeTheme,clipboard,ipcRenderer } = require('electron')
const path = require('path')
const deepl = require("deepl-node")
require("dotenv").config()

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
  const apiKey = process.env.API_KEY
  const translator = new deepl.Translator(apiKey);
  let res = await translator.translateText(textToTranslate, null, 'tr')
  return res.text
})


ipcMain.handle("clipboard:copy", (event, args) => {

  return clipboard.writeText(args,'clipboard')
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})