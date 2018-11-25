/*
 * The `renderers` array registers each renderer with the app.
 *
 * For a renderer to be registered, the `renderers` array
 * must contain one descriptor per renderer. A descriptor has two
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
