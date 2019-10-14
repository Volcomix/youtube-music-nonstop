const Page = require('./page')

class YoutubeMusicPage extends Page {
  get playButton() {
    return $('#play-button')
  }

  get video() {
    return $('.html5-main-video')
  }

  get progressBar() {
    return $('#progress-bar[value="1"]')
  }

  get adOverlay() {
    return $('.ytp-ad-player-overlay')
  }

  get dialog() {
    return $('.ytmusic-popup-container .text')
  }

  get continueWatchingButton() {
    return $('.ytmusic-you-there-renderer #button')
  }

  simulateOldActivity(secondsBeforeEnd = 0) {
    browser.execute(
      (video, secondsBeforeEnd) => {
        video.currentTime = video.duration - secondsBeforeEnd - 1
        _lact = new Date().getTime() - 60 * 60 * 1000
      },
      this.video,
      secondsBeforeEnd,
    )
  }

  simulateHumanActivity() {
    browser.execute(() => {
      skipper.simulateHumanActivity()
    })
  }

  /**
   * @param {string} text
   */
  waitForDialog(text) {
    return this.waitForText(this.dialog, text)
  }
}

module.exports = new YoutubeMusicPage()
