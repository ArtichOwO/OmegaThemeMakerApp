'use strict'

import { app, protocol, BrowserWindow, Menu, dialog, ipcMain, TouchBar } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const fs = require('fs')

import store from './store'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
    	// Important
    	nodeIntegration: true,
    	enableRemoteModule: true,
    	nodeIntegrationInWorker: true,

      preload: path.join(__dirname, 'preload.js')
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      //nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  setMainMenu(win);
  win.setTouchBar(createTouchBar(win))
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// Discord integration (Thanks to @apoleon33)

const DiscordRPC = require('discord-rpc')
const url = require('url')

const clientId = '821803171844194366';
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  rpc.setActivity({
    details: "Editing a theme",
    startTimestamp,
    largeImageKey: 'app-json-icon',
    largeImageText: 'Editing the json file',
    smallImageKey: 'icon',
    smallImageText: 'Create your own theme for your calculator!',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity()

  setInterval(() => {
    setActivity()
  }, 15e3)
})

rpc.login({ clientId }).catch(console.error)

// Main Menu

function setMainMenu(win) {
  const isMac = process.platform === 'darwin'

  const template = [
    isMac ? { role: 'appMenu' } : {},
    { 
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CommandOrControl+O',
          click : async () => {
            importFile(win)
          }
        },
        { type: 'separator' },
        { role: 'close' }
      ]
    },
    { role: 'editMenu'},
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu : [
        {
          label: 'En savoir plus',
          clic : async () => {
            const { shell } = require('electron')
            shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

// MacBook Pro Touch Bar integration

function createTouchBar(win) {
  const { TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarColorPicker, TouchBarGroup } = TouchBar

  const openButton = new TouchBarButton({
    label: '📂',
    backgroundColor: '#333333',
    click: () => {
      importFile(win)
    }
  })

  const saveButton = new TouchBarButton({
    label: '💾',
    backgroundColor: '#333333',
    click: () => {
      win.webContents.send("save")
    }
  })

  const runSimulator = new TouchBarButton({
    label: '▶️',
    backgroundColor: '#333333',
    click: () => {
      win.webContents.send("run")
    }
  })

  const fullscreenButton = new TouchBarButton({
    label: '↔️',
    backgroundColor: '#333333',
    click: () => {
      win.webContents.send("fullscreen")
    }
  })

  const screenshotButton = new TouchBarButton({
    label: '📸',
    backgroundColor: '#333333',
    click: () => {
      win.webContents.send("screenshot")
    }
  })

  const colorLabel = new TouchBarLabel({
    label: "Copy a new color here :"
  })

  const colorPicker = new TouchBarColorPicker({
    change: (color) => {
      win.webContents.send("newChosenColor", color)
    }
  })

  const touchBar = new TouchBar({
    items: [
      openButton,
      new TouchBarSpacer({ size: 'small' }),
      saveButton,
      new TouchBarSpacer({ size: 'small' }),
      runSimulator,
      new TouchBarSpacer({ size: 'small' }),
      fullscreenButton,
      new TouchBarSpacer({ size: 'small' }),
      screenshotButton,
      new TouchBarSpacer({ size: 'flexible' }),
      colorLabel,
      colorPicker
    ]
  })

  return touchBar
}

// Others

function importFile(win) {
  let openProps = {
    title: "Open JSON theme",
    filters: [
      { name : 'JSON', extensions: ['json'] },
      { name: 'All files', extensions: ['*'] }
    ],
    properties: [
      'openFile'
    ] 
  }
  dialog.showOpenDialog(openProps)
    .then((file) => {
      if(file === undefined){
        console.log("No file selected");
        return;
      }

      fs.readFile(file.filePaths[0], 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
        
        win.webContents.send("importJSON", data)
      })
  })
}