import anime from 'animejs'

import * as bars from '../bars/positive'
import PhraseEngine from '../phrase_engine.js'

let SOURCE_URL = '/api/wall/v1/positive/phrases'

bars.animate()
new PhraseEngine({ sourceUrl: SOURCE_URL }).run()
