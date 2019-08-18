describe('Youtube Music', () => {
  it('should have the right title', () => {
    expect(browser.getTitle()).toBe('YouTube Music')
  })

  it('should play a song without interruption', () => {
    playFirstSong()
    waitForSongPlaying()
    simulateOldActivity()
    waitForToast('Still watching? Video will pause soon')
    simulateHumanActivity()
    waitForToast('Thanks for confirming.')
  })
})

function playFirstSong() {
  $('#play-button').click()
}

function waitForSongPlaying() {
  $('#progress-bar[value="1"]').waitForExist()
}

function simulateOldActivity() {
  browser.execute(video => {
    video.currentTime = video.duration
    _lact = new Date().getTime() - 60 * 60 * 1000
  }, $('.html5-main-video'))
}

function waitForToast(text) {
  browser.waitUntil(() =>
    $('#toast')
      .getText()
      .startsWith(text),
  )
}

function simulateHumanActivity() {
  browser.execute(() => {
    skipper.simulateHumanActivity()
  })
}
