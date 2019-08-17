const Application = require('spectron').Application
const electronPath = require('electron')

/**
 * @type {Application}
 */
let app

beforeAll(async () => {
  app = new Application({
    path: electronPath,
    args: [__dirname],
  })
  await app.start()
})

afterAll(async () => {
  if (app && app.isRunning()) {
    await app.stop()
  }
})

test('no interruption', async () => {
  await playFirstSong()
  await waitForSongStarted()
  await simulateOldActivity()
  await waitForToastText('Still watching? Video will pause soon')
  await simulateHumanActivity()
  await waitForToastText('Thanks for confirming.')
}, 30000)

async function playFirstSong() {
  await app.client.click('#play-button')
}

async function waitForSongStarted() {
  await app.client.waitForExist('#progress-bar[value="1"]')
}

async function waitForToastText(text) {
  await app.client.waitUntilTextExists('#toast', text, 1000)
}

async function simulateOldActivity() {
  await app.client.selectorExecute('.html5-main-video', ([video]) => {
    video.currentTime = video.duration
    _lact = new Date().getTime() - 60 * 60 * 1000
  })
}

async function simulateHumanActivity() {
  await app.client.execute(() => {
    skipper.simulateHumanActivity()
  })
}
