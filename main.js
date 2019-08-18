const { app, BrowserWindow } = require('electron')
const Skipper = require('./skipper')

let win

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.dock && app.dock.setIcon('icon.png')

async function createWindow() {
  win = new BrowserWindow({
    webPreferences: { nodeIntegration: false, contextIsolation: true },
    autoHideMenuBar: true,
    icon: 'icon.png',
  })

  win.on('closed', () => {
    win = null
  })

  await win.loadURL('https://music.youtube.com')

  // Wait the DOM to be populated before observing mutations
  win.webContents.executeJavaScript(`
    const skipper = new ${Skipper}()
    setTimeout(() => skipper.skipVideoAds())
    setInterval(() => skipper.simulateHumanActivity(), 5 * 60 * 1000)
  `)
}
