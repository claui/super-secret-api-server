import anime from 'animejs'

const INITIAL_DELAY_MS_MAX     =     0
const FADE_IN_DURATION_MS_MIN  =  5000
const FADE_IN_DURATION_MS_MAX  = 20000
const PAUSE_DURATION_MS_MIN    =  3000
const PAUSE_DURATION_MS_MAX    = 10000
const FADE_OUT_DURATION_MS_MIN =  5000
const FADE_OUT_DURATION_MS_MAX = 20000

const OPACITY_MIN = 0.3
const X_MIN = 0
const X_MAX = 75
const Y_INSIDE_MIN = 0
const Y_INSIDE_MAX = 90
const Y_OUTSIDE_MIN = -50
const Y_OUTSIDE_MAX = 150

export default class SlideUpAnnaRenderer {
  constructor ({ id: phraseId, text: phraseText }) {
    this.phraseId = phraseId
    this.phraseText = phraseText

    if (window.document.getElementById(`phrase_${this.phraseId}`)) {
      throw(`Phrase already exists in DOM: ${phraseText}`)
    }
  }

  setup () {
    let xPosition = anime.random(X_MIN, X_MAX)
    let yPositionStart = anime.random(Y_INSIDE_MIN, Y_INSIDE_MAX)
    let yPositionPause = anime.random(Y_INSIDE_MIN, Y_INSIDE_MAX)
    let yPositionEnd = anime.random(Y_OUTSIDE_MIN, Y_OUTSIDE_MAX)
    let initialDelay = anime.random(0, INITIAL_DELAY_MS_MAX)

    this.fadeInDuration =
      anime.random(FADE_IN_DURATION_MS_MIN, FADE_IN_DURATION_MS_MAX)
    this.pauseDuration =
      anime.random(PAUSE_DURATION_MS_MIN, PAUSE_DURATION_MS_MAX)
    this.fadeOutDuration =
      anime.random(FADE_OUT_DURATION_MS_MIN, FADE_OUT_DURATION_MS_MAX)
    this.opacity =
      Math.random(1 - OPACITY_MIN) + OPACITY_MIN

    let phraseDiv = window.document.createElement('div')
    phraseDiv.setAttribute('id', `phrase_${this.phraseId}`)
    phraseDiv.style = `
      mix-blend-mode: difference;
      position: absolute;
      transform:
        translateX(${xPosition}vw) translateY(${yPositionStart}vh);`
    let phraseSpan = window.document.createElement('span')
    phraseSpan.textContent = this.phraseText
    phraseDiv.appendChild(phraseSpan)
    window.document.body.appendChild(phraseDiv)

    anime
      .timeline({
        targets: `#phrase_${this.phraseId}`,
        complete: (() => this.destroy()),
      })
      .add({
        offset: 0,
        duration: this.fadeInDuration,
        easing: 'easeOutSine',
        opacity: [0, this.opacity],
        translateX: `${xPosition}vw`,
        translateY: `${yPositionPause}vh`,
      })
      .add({
        offset: this.fadeInDuration,
        duration: this.pauseDuration,
      })
      .add({
        offset: this.fadeInDuration + this.pauseDuration,
        duration: this.fadeOutDuration,
        easing: 'easeInSine',
        opacity: 0,
        translateX: `${xPosition}vw`,
        translateY: `${yPositionEnd}vh`,
      })
  }

  destroy () {
    anime.remove(`#phrase_${this.phraseId}`)
    let phraseDiv =
      window.document.getElementById(`phrase_${this.phraseId}`)

    if (phraseDiv) {
      window.document.body.removeChild(phraseDiv)
      console.log(`Phrase removed from DOM: ${this.phraseText}`)
    } else {
      throw(`Unable to remove phrase from DOM: ${this.phraseText}`)
    }
  }

  get name () { return this.constructor.name }
}
