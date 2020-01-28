import Component from '@ember/component'
import hbs from 'htmlbars-inline-precompile'
import run from 'ember-runloop'

import { bindOnEscape, unbindOnEscape } from '../utils/listeners'
import { isChild } from '../utils/elements'

/**
 * Core dropdown component.
 *
 * Welcome friend, if you're looking for a button/link that opens a dropdown
 * you've come to the right place.
 *
 * ## Usage
 *
 * #### 1. Simple invocation. It's so easy. Just pass a Target and Content prop
 * and you've got a totally rad dropdown.
 * ```glimmer
 * {{rad-dropdown Target="Open me!" Content="Hey, what's up?"}}
 * ```
 *
 * #### 2. Simple target with custom content. Use the Content contextual
 * component to add custom content to the dropdown.
 * ```handlebars
 * {{#rad-dropdown Target="Open me!" as |components|}}
 *   {{#components.content}}Hey, what's up?{{/components.content}}
 * {{/rad-dropdown}}
 * ```
 *
 * #### 3. Customize both the dropdown target and content.
 * ```glimmer
 * {{#rad-dropdown as |components|}}
 *   {{#components.target}}Open me!{{/components.target}}
 *   {{#components.content}}Hey, what's up?{{/components.content}}
 * {{/rad-dropdown}}
 * ```
 *
 * #### 4. Turn the target into a button with `buttonStyle=true` and pass a
 * `brand` to change the color button.
 * ```handlebars
 * {{rad-dropdown buttonStyle=true brand="primary" Target="Open me!" Content="Hey, what's up?"}}
 * ```
 *
 * #### 5. Use as a dropdown menu with menu items
 *
 * ```glimmer
 * {{#rad-dropdown dropdownMenu=true brand="primary" buttonStyle=true as |components|}}
 *   {{#components.target}}
 *     Open me! {{rad-svg svgId="arrow-down"}}
 *   {{/components.target}}
 *   {{#components.content}}
 *     {{#components.menu-item}}Option 1{{/components.menu-item}}
 *     {{#components.menu-item}}Option 2{{/components.menu-item}}
 *   {{/components.content}}
 * {{/rad-dropdown}}
 * ```
 *
 * #### 6. Pass `autoClose` for a self closing dropdown
 * ```glimmer
 * {{rad-dropdown autoClose=true Target="Open" Content="Mouse out and I'll close myself!"}}
 * ```
 *
 * Configuration | Type | Default | Description
 * --- | --- | --- | ---
 * `buttonStyle` | boolean | false | Whether to style the `target` to look like a button
 * `brand` | string | '' | The brand class to use to style the `target`
 * `autoClose` | boolean| | false | Pass `true` for an auto closing dropdown on mouse out
 *
 * @class Component.RadDropdown
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * When `autoClose` is set to true, the dropdown will automatically close
   * itself 2.5sec after the user mouses out of it.
   * @property autoClose
   * @type {Boolean}
   * @passed
   * @optional
   * @default false
   */
  autoClose: false,
  /**
   * Adds a brand class to the target as btn-{brand}
   * @property brand
   * @type {String}
   * @passed
   */
  brand: '',
  /**
   * Whether or not to style the target as a link or a button
   * @property buttonStyle
   * @type {Boolean}
   * @passed
   */
  buttonStyle: false,
  /**
   * Whether or not to treat the dropdown content component as a dropdown menu
   * @property dropdownMenu
   * @type {Boolean}
   * @default false
   * @passed
   */
  dropdownMenu: false,
  /**
   * Fires when the dropdown is closed
   * @property onHide
   * @closure
   * @passed
   * @optional
   * @type {Function}
   */
  /**
   * Fires when the dropdown is opened
   * @property onShow
   * @closure
   * @passed
   * @optional
   * @type {Function}
   */
  /**
   * The position that the tooltip is created in relative to its anchor element. Combine "top" with "right" to get a top and right aligned menu.
   * Valid options are:
   * - `"left"`
   * - `"top"`
   * - `"right"`
   * - `"top right"`
   *
   * Defaults to `"left"` if no value is supplied.
   *
   * @property position
   * @type {String}
   * @passed
   * @default 'left'
   */
  position: 'left',

  // Contextual Component Specifications
  // ---------------------------------------------------------------------------

  /**
   * @property contentComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-dropdown/content'
   */
  contentComponent: 'rad-dropdown/content',
  /**
   * @property menuItemComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-dropdown/menu-item'
   */
  menuItemComponent: 'rad-dropdown/menu-item',
  /**
   * @property menuItemComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-dropdown/target'
   */
  targetComponent: 'rad-dropdown/target',

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Stored reference to `run.later` created in `mouseLeave` that will close any
   * open dropdown. Is used in `mouseEnter` to cancel auto close.
   * @property _autoCloseRunLater
   * @type {?Function}
   * @default null
   */
  _autoCloseRunLater: null,
  /**
   * State boolean for display of the dropdown content. Is toggled true/false to
   * handle show/hide. Updated in `_showContent` and `_hideContent`
   * @property hidden
   * @type {Boolean}
   * @default true
   */
  hidden: true,

  // Ember Props
  // ---------------------------------------------------------------------------
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
   * Bind `rad-dropdown`
   * @property classNames
   * @type {Array}
   */
  classNames: ['rad-dropdown'],

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * When the dropdown is opened, bind an event listener that will close it if
   * the user clicks anywhere other than the dropdown.
   * @method _bindDropdownListeners
   * @protected
   */
  _bindDropdownListeners() {
    document.body.addEventListener(`mouseup`, this._onMouseTouchEnd)
    document.body.addEventListener(`touchend`, this._onMouseTouchEnd)
  },
  /**
   * Remove click listener from body. Used to DRY up our cleanup code in the
   * supported click and mouse out close liseners.
   * @method _unbindDropdownListeners
   * @protected
   */
  _unbindDropdownListeners() {
    document.body.removeEventListener('mouseup', this._onMouseTouchEnd)
    document.body.removeEventListener('touchend', this._onMouseTouchEnd)
  },
  /**
   * If the user clicks or touches outside of the dropdown, ensure that we close the
   * dropdown automatically.
   * @method _onMouseTouchEnd
   * @param {MouseEvent|TouchEvent} evt
   * @protected
   */
  _onMouseTouchEnd(evt) {
    // Check if the click was inside the dropdown
    const clickInDropdown = isChild(evt.target, this.element)

    // If the click was ouside dropdown, close the dropdown and then cleanup the listener
    if (!clickInDropdown) {
      this._unbindDropdownListeners()
      this.send('hide')
    }
  },

  // Hooks
  // ---------------------------------------------------------------------------
  init() {
    this._super(...arguments)
    this.set('_onMouseTouchEnd', this._onMouseTouchEnd.bind(this))
  },
  didInsertElement() {
    const { element } = this
    element.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    element.addEventListener('mouseleave', this.onMouseLeave.bind(this))
  },

  /**
   * Safety first!
   * If we leave the page without closing the dropdown we don't want to orphan
   * listeners.
   * @method willDestroyElement
   */
  willDestroyElement() {
    // Check for passed closures
    if (this.onDestroy) {
      this.onDestroy()
    }

    // Remove listeners
    this._unbindDropdownListeners()
    unbindOnEscape(this.elementId)
  },

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Check for an auto-close timer when user mouses into dropdown and cancel it
   * if it exists.
   * @method onMouseEnter
   */
  onMouseEnter() {
    let { autoClose, _autoCloseRunLater } = this

    if (autoClose && _autoCloseRunLater) {
      run.cancel(_autoCloseRunLater)
      this.set('_autoCloseRunLater', null)
    }
  },
  /**
   * When user mouses out of the dropdown start an auto close timer to close
   * dropdown after 2.5 seconds. Is canceled using `mouseEnter` if user mouses
   * back into dropdown.
   * @method onMouseLeave
   */
  onMouseLeave() {
    if (this.autoClose) {
      this.set(
        '_autoCloseRunLater',
        run.later(() => {
          if (!this.isDestroyed) {
            this.send('hide')
          }
        }, 2500),
      )
    }
  },

  // Actions
  // ---------------------------------------------------------------------------
  /**
   * Actions
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * Handle the showing of the dropdown. This will pass on any arguments you
     * pass to it in the action.
     * @method show
     * @return {undefined}
     */
    show() {
      // Fire user hooks
      if (this.onShow) {
        this.onShow(...arguments)
      }

      // Toggle display
      this.set('hidden', false)

      // Add click listeners and bind esc to close
      this._bindDropdownListeners()
      const { actions } = this
      bindOnEscape(this.elementId, actions.hide.bind(this))

      // Fire user hooks
      if (this.onShown) {
        this.onShown(...arguments)
      }
    },
    /**
     * Handle the hiding of the dropdown. This will pass on any arguments you
     * pass to it in the action.
     * @method hide
     * @return {undefined}
     */
    hide() {
      // Fire user hooks
      if (this.onHide) {
        this.onHide(...arguments)
      }

      // Toggle display
      this.set('hidden', true)

      // Remove listeners
      this._unbindDropdownListeners()
      unbindOnEscape(this.elementId)

      // Fire user hooks
      if (this.onHidden) {
        this.onHidden(...arguments)
      }
    },
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{#if Target}}
      {{#rad-dropdown/target
        id=(concat 'aria-labelledby-' elementId)
        brand=brand
        click=(action (if hidden 'show' 'hide'))
        link=(not buttonStyle)
        hidden=hidden
        data-test=(if data-test (concat data-test '-target'))}}
        {{{Target}}}
      {{/rad-dropdown/target}}
    {{/if}}

    {{#if Content}}
      {{#rad-dropdown/content
        aria-labelledby=(concat 'aria-labelledby-' elementId)
        position=position
        hidden=hidden
        data-test=(if data-test (concat data-test '-content'))}}
        {{{Content}}}
      {{/rad-dropdown/content}}
    {{/if}}

    {{yield
      (hash
        target=(component targetComponent
          id=(concat 'aria-labelledby-' elementId)
          brand=brand
          click=(action (if hidden 'show' 'hide'))
          link=(not buttonStyle)
          hidden=hidden
          data-test=(if data-test (concat data-test '-target')))
        content=(component contentComponent
          aria-labelledby=(concat 'aria-labelledby-' elementId)
          dropdownMenu=dropdownMenu
          hidden=hidden
          position=position
          data-test=(if data-test (concat data-test '-content')))
        menu-item=(component menuItemComponent
          hide=(action 'hide')
          data-test=(if data-test (concat data-test '-menu-item')))
      )
      (action 'show')
      (action 'hide')
      hidden
    }}
  `,
})
