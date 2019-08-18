const { remote } = require('webdriverio')
const electronPath = require('electron')

/**
 * @type {WebdriverIOAsync.BrowserObject}
 */
let browser

beforeAll(async () => {
  browser = await remote({
    port: 9515,
    logLevel: 'warn',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        binary: electronPath,
        args: [`app=${__dirname}`],
      },
    },
  })
})

afterAll(async () => {
  await browser.deleteSession()
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
  const button = await browser.$('#play-button')
  await button.click()
}

async function waitForSongStarted() {
  const progressBar = await browser.$('#progress-bar[value="1"]')
  await progressBar.waitForExist(10000)
}

async function waitForToastText(text) {
  await browser.waitUntil(async () => {
    const toast = await browser.$('#toast')
    await toast.waitForDisplayed()
    const message = await toast.getText()
    return message.startsWith(text)
  })
}

async function simulateOldActivity() {
  const video = await browser.$('.html5-main-video')
  await browser.execute(video => {
    video.currentTime = video.duration
    _lact = new Date().getTime() - 60 * 60 * 1000
  }, video)
}

async function simulateHumanActivity() {
  await browser.execute(() => {
    skipper.simulateHumanActivity()
  })
}
