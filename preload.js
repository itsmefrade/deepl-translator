const { contextBridge, ipcRenderer, clipboard} = require('electron')

contextBridge.exposeInMainWorld('actions', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
    copy: (arg1) => ipcRenderer.invoke("clipboard:copy", arg1),
    get: () => ipcRenderer.invoke("clipboard:get"),

})

