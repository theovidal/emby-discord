'use strict'
const { app, BrowserWindow } = require('electron')
const RPC = require('discord-rpc')
const fs = require('fs')
const path = require('path')

const configPath = path.join(__dirname, 'config.json')
let config
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    resizable: true,
    useContentSize: false,
    autoHideMenuBar: true,
    center: true,
    titleBarStyle: 'hidden',
    frame: true,
    icon: './assets/emby.png',
    alwaysOnTop: false,
    title: 'Emby',
    webPreferences: {
      nodeIntegration: false,
      plugins: true
    }
  })

  fs.readFile(configPath, { encoding: 'utf-8' }, function(err, data) {
    if (err) {
      return new Error('Error while loading configuration file : ' + err)
    } else {
      config = JSON.parse(data)
      mainWindow.loadURL(config.url)
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const clientId = '497839419089223680'
const rpc = new RPC.Client({ transport: 'ipc' })
const startTimestamp = new Date()

async function setActivity() {
  if (!rpc || !mainWindow) {
    return
  }

  const info = await mainWindow.webContents.executeJavaScript(`
    (function() {
      var bar = document.querySelector('.nowPlayingBar')
      if (bar === null) {
        return {
          'title': 'Browsing catalog', 
          'subtitle': '...',
          'icon': 'pause'
        }
      }
      else {
        if (bar.classList.contains('nowPlayingBar-hidden')) {
          return {
            'title': 'Switching music', 
            'subtitle': '...',
            'icon': 'pause'
           }
        }
        else {
          var infos = {
            'title': document.querySelector('.nowPlayingBarText > div button.itemAction.textActionButton').innerHTML, 
            'subtitle': document.querySelector('.nowPlayingBarSecondaryText > button.itemAction.textActionButton').innerHTML,
            'icon': ''
          }
          if (document.querySelector('.playPauseButton i.md-icon').innerHTML = 'pause') {
            infos.icon = 'play'
          }
          else {
            infos.icon = 'pause'
          }
          return infos
        }
      }
    })()
  `)

  rpc.setActivity({
    details: info.title,
    state: info.subtitle,
    startTimestamp,
    largeImageKey: 'logo',
    largeImageText: 'Emby',
    smallImageKey: info.icon,
    smallImageText: info.icon === 'play' ? 'Playing' : 'Paused',
    instance: false
  })
}

rpc.on('ready', () => {
  setActivity()

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity()
  }, 5e2)
})

rpc.login({ clientId }).catch(console.error)
