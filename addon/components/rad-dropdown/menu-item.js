import hbs from 'htmlbars-inline-precompile'
import RadButton from '../rad-button'

/**
 * Core dropdown menu item
 *
 * @class Component.RadDropdown.MenuItem
 * @constructor
 * @extends Ember.RadButton
 */
export default RadButton.extend({
  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Placeholder closure action for click events. If no value is passed in it
   * will just call `_super` from the original `RadButton` class and then call
   * the `hide` closure action.
   * @event click
   * @return {undefined}
   */
  click: () => {},
  /**
   * Closure action that hides the dropdown
   * @property hide
   * @closure
   */
  hide: () => {},

  // Ember Props
  // ---------------------------------------------------------------------------
  /**
   * Auto-binds `data-test` attribute
   *
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Binds `dropdown-item` class
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-item'],

  // Hooks
  // ---------------------------------------------------------------------------
  /**
   * When attributes are received, if a prop exists for click, we assume that
   * some custom behavior has been passed in. However, this custom behavior will
   * override our default behavior of closing the dropdown menus when a menu
   * item is clicked, which is bad.
   *
   * So, we will compare the new value of `click` with an old value that we
   * manually store. If they are not equal, we set up a new method that calls
   * super, runs the new behavior, and then runs the passed-in hide action. This
   * also works well for setting up default click behavior when no click action
   * is passed in, as the initial value of click is a dummy closure.
   *
   * This method is then stored on both the `click` and `_click` properties so
   * that it can be used by default for clicks, and so that it is preserved
   * for comparison if/when a new action is passed in. Because we compare the
   * old and new values, the method creation and setting should really only
   * evaluate the first time attributes are passed in unless the user is doing
   * some crazy dynamic action switching, and even if they are, we have that
   * case covered here.
   *
   * This is also useful to safeguard against unnecessary repeated sets if OTHER
   * passed properties (like branding or classNames/class or whatever else) get
   * updated even if the click action doesn't change.
   *
   * @event didReceiveAttrs
   * @return {undefined}
   */
  didReceiveAttrs() {
    const oldClick = this._click
    const passedClick = this.click

    if (passedClick !== oldClick) {
      let newClick = () => {
        this._super(...arguments)
        passedClick()
        this.hide()
      }

      this.setProperties({
        _click: newClick,
        click: newClick,
      })
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`,
})
