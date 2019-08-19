class Page {
  refresh() {
    browser.refresh()
  }

  /**
   * @param {WebdriverIO.Element} element
   * @param {string} text
   */
  waitForText(element, text) {
    browser.waitUntil(() => element.getText() === text)
  }
}

module.exports = Page
