import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * Core component for rendering svg icons. Expects an svg id as `svgId`.
 *
 * #### Usage:
 * ```handlebars
 * {{core-svg svgId="bubbles" classNames="radical"}}
 * ```
 * @class CoreSVG
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * File path to svg definitions file
   * @property filePath
   * @type {string}
   * @default assets/svg-defs.svg
   */
  filePath: '/assets/symbol-defs.svg',
  /**
   * The id of the svg.
   * @property svgId
   * @type {string}
   */
  svgId: '',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Allow direct binding of `data-test` attributes so that icons can be
   * directly targeted in automated testing.
   *
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Class names: `core-svg`
   * @property classNames
   * @type {Array}
   */
  classNames: ['core-svg'],
  /**
   * Bound classNames: `svgId`
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['svgId'],
  /**
   * SVG DOM element
   * @property tagName
   * @type {string}
   */
  tagName: 'svg',

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    <title>{{svgId}} icon</title>
    <use xlink:href="{{filePath}}#{{svgId}}"></use>
  `
});
