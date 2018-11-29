import AbstractPhraseEngine from './abstract_phrase_engine'

const DEFAULT_QUERY_PHRASE_EVERY_MS = 10000

const FALLBACK_PHRASE = {
  id: -1,
  text: '\u26a0Check connectivity',
}

export default class LivePhraseEngine extends AbstractPhraseEngine {
  constructor (config) {
    super(config)

    this.queryPhrasesEveryMs = config.queryPhrasesEveryMs
      || DEFAULT_QUERY_PHRASE_EVERY_MS

    if (config.sourceUrl === undefined) {
      throw('Source URL missing; pass it as `sourceUrl`')
    }
    this.sourceUrl = config.sourceUrl

    this.expirationTimerMap = new WeakMap()
    this.phrases = []
  }

  run () {
    console.log('Initializing animation for live phrases')

    this.phrases = [FALLBACK_PHRASE]

    this.queryBackend()
    window.setInterval(
      () => this.queryBackend(),
      this.queryPhrasesEveryMs
    )

    window.setInterval(
      () => this.onChoosePhraseTimer(),
      this.choosePhraseEveryMs
    )

    console.log('Done initializing')
  }

  queryBackend () {
    console.log('Querying backend for new phrases')
    fetch(this.sourceUrl)
      .then(response => response.json())
      .then(phrases => this.onPhrasesReceive(phrases))
  }

  onPhrasesDispose (oldPhrases) {
    var numTimers = 0

    oldPhrases
      .filter(oldPhrase => oldPhrase.expires)
      .forEach(oldPhrase => {
        let timer = this.expirationTimerMap.get(oldPhrase)
        if (timer !== undefined) {
          window.clearTimeout(timer)
          numTimers++
        } else {
          console.error('Skipped missing expiration timer for'
            + ` phrase: ${oldPhrase.text}`)
        }
      })

    if (numTimers > 0) {
      console.log(`Retired ${numTimers} stale expiration timer(s)`)
    }
  }

  onPhrasesReceive (phrases) {
    console.log(`Received ${phrases.length} phrase(s) from backend`)
    this.onPhrasesDispose(this.phrases)
    this.phrases = phrases

    phrases
      .filter(phrase => phrase.expires)
      .forEach(phrase => {
        let timeoutMs = phrase.expires * 1000
        let timer = window.setTimeout(
          () => {
            let index = phrases.indexOf(phrase)
            if (index > -1) {
              phrases.splice(index, 1)
              console.log(`Phrase expired: ${phrase.text}`)
            } else {
              throw(`Expired phrase not found: ${phrase.text}`)
            }
          },
          timeoutMs
        )
        this.expirationTimerMap.set(phrase, timer)
        console.log(`New expiration timer #${timer} set to`
          + ` ${timeoutMs} ms for phrase: ${phrase.text}`)
      })
  }
}
