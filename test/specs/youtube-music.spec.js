const YoutubeMusicPage = require('../pageobjects/youtube-music.page')

describe('YouTube Music', () => {
  it('should play music without interruption', () => {
    YoutubeMusicPage.playButton.click()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity()
    YoutubeMusicPage.waitForDialog('Video paused. Continue watching?')
    expect(YoutubeMusicPage.adOverlay.isExisting()).toBe(false)
    YoutubeMusicPage.continueWatchingButton.click()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity(1)
    YoutubeMusicPage.simulateHumanActivity()
    YoutubeMusicPage.progressBar.waitForExist()
    expect(YoutubeMusicPage.dialog.isDisplayed()).toBe(false)
  })

  it('should display an ad', () => {
    YoutubeMusicPage.refresh()
    YoutubeMusicPage.progressBar.waitForExist()
    YoutubeMusicPage.simulateOldActivity()
    YoutubeMusicPage.adOverlay.waitForExist()
  })

  it('should pause the video', () => {
    YoutubeMusicPage.waitForDialog('Video paused. Continue watching?')
  })
})
