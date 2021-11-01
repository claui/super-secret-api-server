import AbstractPhraseEngine from './abstract_phrase_engine'

/**
 * A StaticPhraseEngine keeps a list of immutable phrases
 * and has no support for expiration dates.
 */
export default class StaticPhraseEngine extends AbstractPhraseEngine {
  constructor (config) {
    super(config)

    if (config.phrases === undefined) {
      throw('Array of phrases missing; pass it as `phrases`')
    }
    this.phrases = config.phrases
  }

  run () {
    console.log('Initializing animation for static phrases')

    window.setInterval(
      () => this.onChoosePhraseTimer(),
      this.choosePhraseEveryMs
    )

    console.log('Done initializing')
  }
}
