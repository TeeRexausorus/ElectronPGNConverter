const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const {en, fr} = require('./algebraicNotation');
window.require = require;
contextBridge.exposeInMainWorld('electron', {
    startDrag: (fileName) => {
        ipcRenderer.send('ondragstart', fileName)
    },
});

contextBridge.exposeInMainWorld('electronFS', {
    writeFile: fs.writeFile,
    readFile: fs.readFile,
});

contextBridge.exposeInMainWorld('writer', {
    writeOutputFile: (filePath, data) => {
        ipcRenderer.send('filewrite', filePath, data);
    }
})

contextBridge.exposeInMainWorld('translation', {
    fr: fr,
    en: en,
})
