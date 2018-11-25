import anime from 'animejs'

import * as bars from '../bars/negative'
import PhraseEngine from '../phrase_engine.js'

let SOURCE_URL = '/api/wall/v1/negative/phrases'

bars.animate()
new PhraseEngine({ sourceUrl: SOURCE_URL }).run()
