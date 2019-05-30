import hbs from 'htmlbars-inline-precompile'
import { computed } from '@ember/object'
import RadButton from '../rad-button'
import { expanded } from '../../utils/arias'

/**
 * Core drawer target component
 *
 * @class Component.RadDrawer.Target
 * @constructor
 * @extends Component.RadButton
 */
export default RadButton.extend({
  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Display the target content as a button instead of a plain link. Passed in
   * from the parent `rad-drawer` and ultimately updates the `link`
   * property on `rad-button`.
   * @property buttonStyle
   * @type {Boolean}
   */
  buttonStyle: false,
  /**
   * Name of icon to display. Removes icon from display if value is falsy.
   * @property suppressIcon
   * @type {string|Boolean}
   * @default false
   */
  icon: '',
  /**
   * String representation of boolean state for `aria` attrs.
   * @property expanded
   * @type {string}
   * @param hidden
   */
  expanded: computed('hidden', expanded),

  // Ember Props
  // ---------------------------------------------------------------------------

  /**
   * Bind `aria-expanded` and `aria-controls` to the root element;
   * Bind modified `dataTest` to `data-test` attr
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: [
    'expanded:aria-expanded',
    'ariaId:aria-controls',
    'data-test',
  ],
  /**
   * Bind `drawer-target` and `basic-b`
   * @property classNames
   * @type {Array}
   */
  classNames: ['drawer-target'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{#if (and icon (not buttonStyle))}}
      {{rad-svg svgId=icon classNames='drawer-icon' class=(if hidden '' 'active') data-test=(concat data-test '-icon')}}
    {{/if}}
    <span data-test="{{data-test}}-yield">
      {{yield}}
    </span>
  `,
})
