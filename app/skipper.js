class Skipper {
  constructor() {
    this.videoPlayerMutationObserver = new MutationObserver(mutations =>
      this.observeVideoPlayer(mutations),
    )
    this.videoAdsMutationObserver = new MutationObserver(mutations =>
      this.observeVideoAds(mutations),
    )
  }

  skipVideoAds() {
    this.videoPlayer = this.getVideoPlayer()
    this.videoPlayerMutationObserver.observe(this.videoPlayer, {
      childList: true,
    })
    console.log('Video player observer setup.')
  }

  simulateHumanActivity() {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => this.moveMouse(2 ** i, 0), i * 25)
    }
    console.log('Me there!')
  }

  /**
   * @param {MutationRecord[]} mutations
   */
  observeVideoPlayer(mutations) {
    let videoAds
    if (this.hasAddedNode(mutations) && (videoAds = this.getVideoAds())) {
      this.videoPlayerMutationObserver.disconnect()
      console.log('Video player observer disconnected.')
      this.videoAdsMutationObserver.observe(videoAds, { childList: true })
      console.log('Video ads observer setup.')
    } else {
      console.log('Something has been added but not the video ads...')
    }
  }

  /**
   * @param {MutationRecord[]} mutations
   */
  observeVideoAds(mutations) {
    if (this.hasAddedNode(mutations)) {
      const video = this.getVideo()
      video.currentTime = video.duration
      console.log('Ad skipped!')
    }
  }

  getVideoPlayer() {
    return document.querySelector('.html5-video-player')
  }

  getVideoAds() {
    return this.videoPlayer.querySelector('.video-ads')
  }

  /**
   * @returns {HTMLVideoElement}
   */
  getVideo() {
    return document.querySelector('.html5-main-video')
  }

  /**
   * @param {MutationRecord[]} mutations
   */
  hasAddedNode(mutations) {
    return mutations.some(mutation => mutation.addedNodes.length)
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  moveMouse(x, y) {
    const event = new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    })
    window.dispatchEvent(event)
  }
}

module.exports = Skipper
