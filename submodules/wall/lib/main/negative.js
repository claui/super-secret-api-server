import anime from 'animejs'

import * as bars from '../bars/negative'
import { LivePhraseEngine, StaticPhraseEngine } from '../phrase_engine.js'
import renderers from '../renderers.js'

/*
 * To use the live API instead of static data, replace the lines:
 *
 *     import phrases from '../../api-dumped/wall/v1/negative/phrases.json'
 *     new StaticPhraseEngine({ phrases, renderers }).run()
 *
 * with:
 *
 *     let sourceUrl = '/api/wall/v1/negative/phrases'
 *     new LivePhraseEngine({ sourceUrl, renderers }).run()
 */

let sourceUrl = '/api/wall/v1/negative/phrases'
new LivePhraseEngine({ sourceUrl, renderers }).run()

bars.animate()
