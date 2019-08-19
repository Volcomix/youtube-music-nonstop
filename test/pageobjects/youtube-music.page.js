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

  get playerBar() {
    return $('.ytmusic-player-bar.subtitle')
  }

  get toast() {
    return $('#toast #label')
  }

  get dialog() {
    return $('.ytmusic-popup-container .text')
  }

  simulateOldActivity() {
    browser.execute(video => {
      video.currentTime = video.duration
      _lact = new Date().getTime() - 60 * 60 * 1000
    }, this.video)
  }

  simulateHumanActivity() {
    browser.execute(() => {
      skipper.simulateHumanActivity()
    })
  }

  /**
   * @param {string} text
   */
  waitForPlayerBar(text) {
    return this.waitForText(this.playerBar, text)
  }

  /**
   * @param {string} text
   */
  waitForToast(text) {
    return this.waitForText(this.toast, text)
  }

  /**
   * @param {string} text
   */
  waitForDialog(text) {
    return this.waitForText(this.dialog, text)
  }
}

module.exports = new YoutubeMusicPage()
