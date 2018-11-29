if (module.hot) {
  module.hot.dispose(() => window.location.reload(true))
}

import LivePhraseEngine from './phrase_engine/live_phrase_engine.js'
import StaticPhraseEngine from './phrase_engine/static_phrase_engine.js'

export { LivePhraseEngine, StaticPhraseEngine }
