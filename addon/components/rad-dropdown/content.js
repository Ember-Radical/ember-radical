import Component from '@ember/component'
import { computed } from '@ember/object'
import hbs from 'htmlbars-inline-precompile'
import $ from 'jquery'

import { hiddenForArias } from '../../utils/arias'

/**
 * Core dropdown content component
 *
 * @class Component.RadDropdown.Content
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * Adds `dropdown-menu` class which removes padding in order to show
   * dropdown menu items.
   * @property dropdownMenu
   * @type {Boolean}
   * @passed
   */
  dropdownMenu: false,
  /**
   * The position that the tooltip is created in relative to its anchor element.
   * Combine "top" with "right" to get a top and right aligned menu.
   *
   * Valid options are:
   * - `"left"`
   * - `"top"`
   * - `"right"`
   * - `"top right"`
   *
   * Defaults to `"left"` if no value is supplied. Passed in from parent.
   *
   * @property position
   * @type {string}
   * @passed
   * @default ''
   */
  position: '',

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * String representation of boolean state for `aria` attrs.
   * @property hiddenForArias
   * @type {string}
   * @param hidden
   */
  hiddenForArias: computed('hidden', hiddenForArias),

  // Ember Props
  // ---------------------------------------------------------------------------
  /**
   * Bind `aria-hidden` for A+ usability;
   * Auto-binds `data-test` attribute
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: [
    'hiddenForArias:aria-hidden',
    'aria-labelledby:aria-labelledby',
    'data-test',
  ],
  /**
   * Bind `dropdown-content`
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-content'],
  /**
   * Binds `dropdown-menu` class if {{cross-link class="Component.RadDropdown.Content" item="dropdownMenu"}} is true. Also
   * binds the positional class to the container
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['dropdownMenu:dropdown-menu', 'position'],

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * Handle checking component width against window width on render. If
   * overflowing reset the width of the popover to prevent overflow.
   * @TODO: Adjust width of dropdown to be 90/100% of viewport and center it
   * instead of shrinking it to fit.
   * @event didRender
   * @return {undefined}
   */
  didRender() {
    const boundingRect = this.element.getBoundingClientRect()
    const bodyWidth = document.body.offsetWidth
    const { position } = this
    /*
     * If the box is centered, it will center itself back off of the page when we
     * subtract the necessary width from the component width. In these cases, we
     * will need to subtract twice the necessary width. The box is only ever centered
     * when position does not contain `-left`/`-right`.
     */
    const boxIsCentered = !(position.includes('left') || position.includes('right'))

    // If the left offset of content is negative, then the content is to the left of the viewport.
    if (boundingRect.left < 0) {
      // determine length deduction based on centered.
      const widthDeduction = boxIsCentered
        ? boundingRect.left * 2
        : boundingRect.left

      // note `boundingRect.left` is negative so we add the deduction.
      const newWidth = boundingRect.width + widthDeduction
      // Udpate component with new width, problem solved
      this.element.style.cssText += `width: ${newWidth}px !important;`
    } // if the right right offset is greater than the body width, it is outside of our application.
    else if (boundingRect.right > bodyWidth) {
      // determine length deduction based on centered.
      // The general deduction in this case would be the right offset of popover content minus the body width
      const widthDeduction = boxIsCentered
        ? (boundingRect.right - bodyWidth) * 2
        : boundingRect.right - bodyWidth
      const newWidth = boundingRect.width - widthDeduction - 5
      // Udpate component with new width, problem solved
      Object.assign(this.element.style, {
        minWidth: 'auto',
        maxWidth: 'auto',
      })
      this.element.style.cssText += `width: ${newWidth}px !important;`
    }
  },

  // Events
  // ---------------------------------------------------------------------------
  /**
   * Nasty touch eventses. Tricksy touch eventses. Any short touch event on this
   * content component will fire the `focusOut` and the `mouseLeave` on the
   * `rad-dropdown` element. Real abnoxious when you're trying to click
   * something. Fire the link or button manually. Through the wonderful power
   * of JavaScript.
   *
   * @event touchEnd
   */
  touchEnd(evt) {
    if (evt.target.tagName === 'A' || evt.target.tagName === 'BUTTON') {
      evt.target.click()
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`,
})
