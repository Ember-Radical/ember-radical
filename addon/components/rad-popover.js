import Component from '@ember/component'
import { computed } from '@ember/object'
import hbs from 'htmlbars-inline-precompile'

// Utils
import { describedby } from '../utils/arias'
import { bindOnEscape, unbindOnEscape } from '../utils/listeners'
import { isChild } from '../utils/elements'

/**
 * Popover tooltips to Make UI Great Again.™
 *
 * Use this component along with the subcomponent `rad-popover.content` to
 * create popovers(super fancy tooltips). This component works by using mouse
 * and focus events on **this** wrapping element.
 *
 * #### Sample Usage:
 *
 * ```handlebars
 * {{#rad-popover as |components|}}
 *   {{#components.target}}Hover me{{/rad-button}}
 *   {{#components.content position="top" size="small"}}
 *     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
 *   {{/components.content}}
 * {{/rad-popover}}
 * ```
 *
 * #### Configuration Properties
 *
 * A set of configuration properties can be passed into the child `{{rad-popover/content}}`
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
 * @class Component.RadPopover
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

  // Contextual Component Specifications
  // ---------------------------------------------------------------------------

  /**
   * @property contentComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-popover/content'
   */
  contentComponent: 'rad-popover/content',
  /**
   * @property targetComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-button'
   */
  targetComponent: 'rad-button',

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
   * @property classNameBindings
   * @type {Array}
   * @default ['hidden::active']
   */
  classNameBindings: ['hidden::active'],
  /**
   * Bind standard core class: `rad-popover`
   * @property classNames
   * @type {Array}
   */
  classNames: ['rad-popover'],
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
   * Handle hiding tooltip content; unbind touch event listeners, unbind escape
   * key listener, set hidden state to true.
   * @method _hideContent
   * @return {undefined}
   */
  _hideContent() {
    this.set('hidden', true)
    this._unbindPopoverListeners()
    unbindOnEscape(this.elementId)
  },
  /**
   * When the popover is opened, bind an event listener that will close it if
   * the user touches anywhere other than the popover.
   * @method _bindPopoverListeners
   * @protected
   */
  _bindPopoverListeners() {
    document.body.addEventListener(`touchend`, this._onBodyTouchEnd)
  },
  /**
   * Handle showing tooltip content; bind an event listener for mobile for
   * touch events that occur outside of the popover, set hidden state to false
   * @method _showContent
   * @return {undefined}
   */
  _showContent() {
    this._bindPopoverListeners()
    bindOnEscape(this.elementId, this._hideContent.bind(this))
    this.set('hidden', false)
  },
  /**
   * Remove mouseleave and touchend listeners from body. Used to DRY up our
   * cleanup code in the supported mouseleave and touchend close liseners.
   * @method _unbindClickListener
   * @protected
   */
  _unbindPopoverListeners() {
    document.body.removeEventListener('touchend', this._onBodyTouchEnd)
  },
  /**
   * Force the popover to close when a user has touched the screen outside the popover.
   * @TODO Evaluate if this is necessary, and if so, document why. `mouseleaeve`
   * appears to fire for at least Chrome on `touchend` events, meaning this seem superfluous.
   * @method _onBodyTouchEnd
   * @param {TouchEvent} event
   * @protected
   */
  _onBodyTouchEnd(event) {
    // Check if the click was inside the popover
    const clickInPopover = isChild(event.target, this.element)

    // If the click was ouside popover, close the popover and then cleanup the listener
    if (!clickInPopover) {
      this._unbindPopoverListeners()
      this._hideContent()
    }
  },
  // Hooks
  // ---------------------------------------------------------------------------
  init() {
    this._super(...arguments)
    this.set('_onBodyTouchEnd', this._onBodyTouchEnd.bind(this))
  },
  /**
   * Checks for a position prop value; if none was supplied, set a default
   * of `bottom`
   * @event didReceiveAttrs
   * @return {undefined}
   */
  didReceiveAttrs() {
    if (!this.position) {
      this.set('position', 'bottom')
    }
  },
  /**
   * Safety first!
   * If we leave the page without closing the popover we don't want to orphan
   * listeners.
   * @method willDestroyElement
   */
  willDestroyElement() {
    // Check for passed closures
    if (this.onDestroy) {
      this.onDestroy()
    }

    this._unbindPopoverListeners()
    unbindOnEscape(this.elementId)
  },

  // Events
  // ---------------------------------------------------------------------------

  /**
   * Show content on click
   * @event click
   */
  click(evt) {
    this._showContent()
  },
  /**
   * Show content on focus
   * @event focusIn
   */
  focusIn(evt) {
    this._showContent()
  },
  /**
   * Hide content on focusOut
   * @event focusOut
   */
  focusOut(evt) {
    this._hideContent()
  },
  /**
   * Show content on mouse enter
   * @event mouseEnter
   */
  mouseEnter(evt) {
    this._showContent()
  },
  /**
   * Hide content on mouse leave
   * @event mouseLeave
   */
  mouseLeave(evt) {
    this._hideContent()
  },

  // Actions
  // ---------------------------------------------------------------------------

  actions: {
    /**
     * Proxy action for the {{c-l '_hideContent'}} method.
     * @method hide
     * @return {undefined}
     */
    hide() {
      this._hideContent()
    },
    /**
     * Proxy action for the {{c-l '_showContent'}} method.
     * @method show
     * @return {undefined}
     */
    show() {
      this._showContent()
    },
  },

  // Layout
  // ---------------------------------------------------------------------------

  layout: hbs`
    {{yield (hash
      content=(component contentComponent
        aria-describedby=aria-describedby
        hidden=hidden
        position=position
        size=size
        data-test=(if data-test (concat data-test '-content')))
      target=(component targetComponent
        aria-describedby=aria-describedby
        data-test=(if data-test (concat data-test '-target')))
      ) aria-describedby
      (action 'show')
      (action 'hide')
      hidden
    }}`,
})
