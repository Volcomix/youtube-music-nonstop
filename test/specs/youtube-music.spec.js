const YoutubeMusicPage = require('../pageobjects/youtube-music.page')

describe('Youtube Music', () => {
  it('should play music without interruption', () => {
    YoutubeMusicPage.playButton.click()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity()
    YoutubeMusicPage.waitForToast('Still watching? Video will pause soon')
    YoutubeMusicPage.simulateHumanActivity()
    YoutubeMusicPage.waitForToast('Thanks for confirming.')
  })

  it('should display an ad', () => {
    YoutubeMusicPage.refresh()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity()
    YoutubeMusicPage.waitForPlayerBar('Video will play after ad')
  })

  it('should pause the video', () => {
    YoutubeMusicPage.waitForToast('Still watching? Video will pause soon')
    YoutubeMusicPage.waitForDialog('Video paused. Continue watching?')
  })
})
