import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

// Utils
import { describedby } from '../../utils/arias';

/**
 * Popover tooltips to Make UI Great Again.™
 *
 * Use this component along with the subcomponent `core-popover.content` to
 * create popovers(super fancy tooltips). This component works by using mouse
 * and focus events on **this** wrapping element.
 *
 * #### Sample Usage:
 *
 * ```handlebars
 * {{#core-popover as |components|}}
 *   {{#components.target}}Hover me{{/core-button}}
 *   {{#components.content position="top" size="small"}}
 *     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
 *   {{/components.content}}
 * {{/core-popover}}
 * ```
 *
 * #### Configuration Properties
 *
 * A set of configuration properties can be passed into the child `{{core-popover/content}}`
 * component to control how its appearance. Here is a brief overview:
 *
 * - `position`: Where the tooltip is positioned relative to anchor element:
 *    - `top`
 *    - `bottom`
 *    - `left`
 *    - `right`
 *    - `bottom-left`
 *    - `bottom-right`
 * - `size`: Preset width of the tooltip:
 *    - `small`
 *    - `medium`
 *    - `large`
 *
 * ```glimmer
 *
 * For full documentation, see the {{cross-link class="Component.CorePopover" item="position"}}position property{{/cross-link}} and the {{cross-link class="Component.CorePopover" item="size"}}size property{{/cross-link}}.
 * ```
 *
 * @class Component.CorePopover
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * The position that the tooltip is created in relative to its anchor element.
   * Valid options are:
   * - `"top"`
   * - `"bottom"`
   * - `"left"`
   * - `"right"`
   * - `"bottom-left"`
   * - `"bottom-right"`
   *
   * Defaults to `"bottom"` if no value is supplied.
   *
   * @property position
   * @type {string}
   * @default ''
   */
  position: '',
  /**
   * The size of the tooltip itself. A list of preset sizes available are:
   * - `"small"`
   * - `"medium"`
   * - `"large"`
   * - `"x-large"`
   *
   * Defaults to `"medium"` if no value is supplied.
   *
   * @property size
   * @type {string}
   * @default ''
   */
  size: '',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Unique string used to handle setting up aria roles for A++ usability. This
   * identifier needs to be set as the `aria-describedby` attr of the popover
   * hover target and the `id` of the actual popover content
   * @property aria-describedby
   * @type {string}
   * @param elementId
   */
  'aria-describedby': computed('elementId', describedby),
  /**
   * Auto-binds `data-test` attributes
   *
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Bind standard core class: `core-popover`
   * @property classNames
   * @type {Array}
   */
  classNames: ['core-popover'],
  /**
   * State boolean for display of the popover content. Is toggled true/false to
   * handle show/hide. Updated in `_showContent` and `_hideContent`
   * @property hidden
   * @type {Boolean}
   * @default true
   */
  hidden: true,
  /**
   * Component element: div
   * @property tagName
   * @type {string}
   */
  tagName: 'div',

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Handle showing tooltip content
   * @method _showContent
   * @return undefined
   */
  _showContent() {
    this.set('hidden', false);
  },
  /**
   * Handle showing tooltip content
   * @method _hideContent
   * @return undefined
   */
  _hideContent() {
    this.set('hidden', true);
  },

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * Checks for a position prop value; if none was supplied, set a default
   * of `bottom`
   * @event didReceiveAttrs
   * @return {undefined}
   */
  didReceiveAttrs() {
    if (!this.get('position')) {
      this.set('position', 'bottom');
    }
  },

  // Events
  // ---------------------------------------------------------------------------

  /**
   * Show content on mouse enter
   * @event mouseEnter
   */
  mouseEnter(evt) {
    this._showContent();
  },
  /**
   * Hide content on mouse leave
   * @event mouseLeave
   */
  mouseLeave(evt) {
    this._hideContent();
  },
  /**
   * Show content on focus
   * @event focusIn
   */
  focusIn() {
    this._showContent();
  },
  /**
   * Hide content on focusOut
   * @event focusOut
   */
  focusOut() {
    this._hideContent();
  },

  // Layout
  // ---------------------------------------------------------------------------

  layout: hbs`
    {{yield (hash
      content=(component 'core-popover/content'
        aria-describedby=aria-describedby
        hidden=hidden
        position=position
        size=size
        data-test=(concat data-test '-content'))
      target=(component 'core-button'
        aria-describedby=aria-describedby
        data-test=(concat data-test '-target'))
      ) aria-describedby
    }}`
});
