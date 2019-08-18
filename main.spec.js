const Skipper = require('./skipper')

describe('Youtube Music', () => {
  it('should play music without interruption', () => {
    playFirstSong()
    waitForSongPlaying()
    simulateOldActivity()
    waitForToast('Still watching? Video will pause soon')
    simulateHumanActivity()
    waitForToast('Thanks for confirming.')
  })

  it('should display an ad', () => {
    refresh()
    waitForSongPlaying()
    simulateOldActivity()
    waitForAd()
  })

  it('should pause the video', () => {
    waitForToast('Still watching? Video will pause soon')
    waitForDialog('Video paused. Continue watching?')
  })
})

function refresh() {
  browser.refresh()
  browser.executeScript(`skipper = new ${Skipper}()`, [])
}

function simulateOldActivity() {
  browser.execute(video => {
    video.currentTime = video.duration
    _lact = new Date().getTime() - 60 * 60 * 1000
  }, $('.html5-main-video'))
}

function simulateHumanActivity() {
  browser.execute(() => {
    skipper.simulateHumanActivity()
  })
}

function playFirstSong() {
  $('#play-button').click()
}

function waitForSongPlaying() {
  $('#progress-bar[value="1"]').waitForExist()
}

function waitForToast(text) {
  waitForText('#toast #label', text)
}

function waitForDialog(text) {
  waitForText('.ytmusic-popup-container .text', text)
}

function waitForAd() {
  waitForText('.ytmusic-player-bar.subtitle', 'Video will play after ad')
}

function waitForText(selector, text) {
  browser.waitUntil(() => $(selector).getText() === text)
}
