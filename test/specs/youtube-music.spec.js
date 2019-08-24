const YoutubeMusicPage = require('../pageobjects/youtube-music.page')

describe('YouTube Music', () => {
  it('should play music without interruption', () => {
    YoutubeMusicPage.playButton.click()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity()
    YoutubeMusicPage.waitForToast('Still watching? Video will pause soon')
    YoutubeMusicPage.simulateHumanActivity()
    YoutubeMusicPage.waitForToast('Thanks for confirming.')
    expect(YoutubeMusicPage.adOverlay.isExisting()).toBe(false)
  })

  it('should display an ad', () => {
    YoutubeMusicPage.refresh()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity()
    YoutubeMusicPage.adOverlay.waitForExist()
  })

  it('should pause the video', () => {
    YoutubeMusicPage.waitForToast('Still watching? Video will pause soon')
    YoutubeMusicPage.waitForDialog('Video paused. Continue watching?')
  })
})
