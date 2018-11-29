import { RandomRendererChooser, SoloRendererChooser }
  from './chooser.js'

const DEFAULT_CHOOSE_PHRASE_EVERY_MS = 5000

export default class AbstractPhraseEngine {
  constructor (config) {
    this.choosePhraseEveryMs = config.choosePhraseEveryMs
      || DEFAULT_CHOOSE_PHRASE_EVERY_MS

    if (config.renderers === undefined) {
      throw('Array of renderers missing; pass it as `renderers`')
    }

    let soloRenderer = config.renderers.find(renderer => renderer.solo)

    this.chooser = (soloRenderer === undefined)
      ? new RandomRendererChooser(config.renderers)
      : new SoloRendererChooser(soloRenderer)
  }

  onChoosePhraseTimer () {
    if (this.phrases.length === 0) {
      console.warn('No phrases loaded; skipping timer event')
      return
    }

    let phrase = this.randomPhrase()

    if (window.document.getElementById(`phrase_${phrase.id}`)) {
      console.log(`Ignoring phrase: ${phrase.text}`)
      return
    } else {
      console.log(`Spawning phrase: ${phrase.text}`)
    }

    this.chooser.next()
      .plugin
      .then(plugin => {
        let renderer = new plugin.default(phrase)
        renderer.setup()
      })
  }

  randomPhrase () {
    let userPhrasesNotInUse = this.phrases
      .filter(phrase => {
        return phrase.expires &&
          phrase.expires > 0 &&
          !window.document.getElementById(`phrase_${phrase.id}`)
      })

    let eligiblePhrases = userPhrasesNotInUse.length > 0 ?
      userPhrasesNotInUse : this.phrases

    let randomIndex =
      Math.floor(eligiblePhrases.length * Math.random())
    return eligiblePhrases[randomIndex]
  }
}
