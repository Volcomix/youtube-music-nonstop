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

test('play a song', async () => {
  await app.client.click('#play-button')
  await app.client.waitForExist('#progress-bar[value="1"]')
  await app.client.selectorExecute('.html5-main-video', ([video]) => {
    video.currentTime = video.duration
    _lact = new Date().getTime() - 60 * 60 * 1000
  })
  await app.client.waitForExist('#progress-bar[value="1"]')
  await app.client.execute(() => {
    skipper.simulateHumanActivity()
  })
  await app.client.pause(1000)
}, 30000)
