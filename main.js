const { app, BrowserWindow } = require('electron')

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

async function createWindow() {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  })

  win.on('closed', () => {
    win = null
  })

  await win.loadURL('https://music.youtube.com')
  setTimeout(() => {
    win.webContents.executeJavaScript(`${skipVideoAds};skipVideoAds()`)
  }, 3000)
}

function skipVideoAds() {
  const videoPlayer = getVideoPlayer()

  const videoAdsMutationObserver = new MutationObserver(mutations => {
    if (hasAddedNode(mutations)) {
      const video = getVideo()
      video.currentTime = video.duration
      console.log('Ad skipped!')
    }
  })

  const videoPlayerMutationObserver = new MutationObserver(mutations => {
    let videoAds
    if (hasAddedNode(mutations) && (videoAds = getVideoAds())) {
      videoPlayerMutationObserver.disconnect()
      console.log('Video player observer disconnected.')
      videoAdsMutationObserver.observe(videoAds, { childList: true })
      console.log('Video ads observer setup.')
    } else {
      console.log('Something has been added but not the video ads...')
    }
  })

  videoPlayerMutationObserver.observe(videoPlayer, { childList: true })
  console.log('Video player observer setup.')

  function getVideoPlayer() {
    return document.querySelector('.html5-video-player')
  }

  function getVideoAds() {
    return videoPlayer.querySelector('.video-ads')
  }

  function getVideo() {
    return document.querySelector('.html5-main-video')
  }

  function hasAddedNode(mutations) {
    return mutations.some(mutation => mutation.addedNodes.length)
  }
}
