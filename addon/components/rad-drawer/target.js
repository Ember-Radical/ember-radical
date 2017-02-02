import hbs from 'htmlbars-inline-precompile';
import computed from 'ember-computed';
import CoreButton from '../rad-button';
import {expanded} from '../../utils/arias';

/**
 * Core drawer target component
 *
 * @class Component.RadDrawer.Target
 * @constructor
 * @extends Component.CoreButton
 */
export default CoreButton.extend({

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Display the target content as a button instead of a plain link. Passed in
   * from the parent `rad-drawer`.
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
    'dataTest:data-test'],
  /**
   * Bind `drawer-target` and `basic-b`
   * @property classNames
   * @type {Array}
   */
  classNames: ['drawer-target'],
  /**
   * Bind `link` to `!useButtonStyle`
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['buttonStyle::btn-link'],

  // Hooks
  // ---------------------------------------------------------------------------

  didReceiveAttrs() {
    let dataTest = this.get('data-test');
    if (dataTest) {
      this.set('dataTest', `${dataTest}-target`);
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{#if (and icon (not buttonStyle))}}
      {{rad-svg svgId=icon classNames='drawer-icon' class=(if hidden '' 'active') data-test=(concat dataTest '-icon')}}
    {{/if}}
    <span data-test="{{dataTest}}-yield">
      {{yield}}
    </span>
  `
});
