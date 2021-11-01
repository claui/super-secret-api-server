import anime from 'animejs'

import * as bars from '../bars/positive'
import { LivePhraseEngine, StaticPhraseEngine } from '../phrase_engine.js'
import renderers from '../renderers.js'

/*
 * To use the live API instead of static data, replace the lines:
 *
 *     import phrases from '../../api-dumped/wall/v1/positive/phrases.json'
 *     new StaticPhraseEngine({ phrases, renderers }).run()
 *
 * with:
 *
 *     let sourceUrl = '/api/wall/v1/positive/phrases'
 *     new LivePhraseEngine({ sourceUrl, renderers }).run()
 */

let sourceUrl = '/api/wall/v1/positive/phrases'
new LivePhraseEngine({ sourceUrl, renderers }).run()

bars.animate()
