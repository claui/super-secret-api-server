/*
 * A renderer is a class whose objects are responsible for the
 * animation lifecycle of a phrase.
 * It gets instantiated with a phrase whose properties are named
 * `id` and `text`.
 * The duties of a renderer object are:
 * 1. to create a DOM object that represents the phrase visually,
 * 2. animate the phrase, and
 * 3. after the animation is over, remove it from the DOM.
 *
 * The DOM object needs to have the ID `phrase_${id}`.
 * That convention allows the phrase engine to ask the DOM whether
 * a given phrase is currently being displayed.
 *
 * The `renderers` array registers each renderer class with the app.
 *
 * For a renderer class to be registered, the `renderers` array
 * must contain a descriptor for the class. A descriptor has two
 * mandatory properties named `plugin` and `weight`, and another
 * (optional) property named `solo`.
 *
 * The `plugin` property carries a promise to the default export
 * of the renderer class.
 * We use the dynamic import feature so that if a renderer
 * fails, it will have no effect unless that renderer is picked.
 *
 * The `weight` property, whose type is numeric, assigns each
 * renderer a probabilistic weight. A higher `weight` increases
 * the likelihood that the app will pick that renderer.
 * The value of `weight` must be greater than zero.
 *
 * The `solo` property, whose type is boolean, indicates whether
 * a renderer will be favored over all other renderers. If the
 * value of `solo` is `true`, no renderer will be chosen at random.
 * A maximum of one renderer may have `solo` set to `true` at any
 * given time.
 */

let renderers = [
  {
    plugin: import('./renderers/slide_up_anna'),
    weight: 1
  }
]

export default renderers
