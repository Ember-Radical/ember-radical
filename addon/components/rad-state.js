import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

/**
 * Component that can be used for tracking state changes with modals or drawers.
 * Wrap either in one of these and use the yielded state and actions to handle
 * showing/hiding/controlling your component.
 *
 * Useful mainly for demonstration/documentation purposes, but also handy for
 * when you don't have a convenient place to store state (particularly during
 * early development stages). It's also kind of nice for not cluttering up your
 * parent scope with a bunch of extra state and actions you might not want to
 * hang onto. Go nuts!
 *
 * ## Usage
 *
 * Instances of `rad-state` yield a {{c-l state}} property and a hash of
 * `actions` for manipulating that state: {{c-l setTrue}}, {{c-l setFalse}},
 * and {{c-l toggleState}}.
 *
 * ```handlebars
 * {{#rad-state as |state stateActions|}}
 *   {{bank-vault
 *     isOpen=state
 *     closeVault=stateActions.setFalse
 *     openVault=stateActions.setTrue}}
 * {{/rad-state}}
 * ```
 *
 * Or for a smipler toggling implementation:
 *
 * ```handlebars
 * {{#rad-state as |switchState switchActions|}}
 *   {{light-switch isOn=switchState toggleSwitch=switchActions.toggleState}}
 * {{/rad-state}}
 * ```
 *
 * The actions in the actions hash have already been yielded via the action
 * helper, so it is not necessary to continue using that helper when passing
 * actions into child components as properties (but you totally still can if
 * you would prefer to.
 *
 * @class Component.RadState
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Boolean state tracking property. Use this to handle show/hide status or
   * any arbitrary state that can be represented by a boolean.
   * @property state
   * @type {Boolean}
   */
  state: false,
  /**
   * Rad State is a purely functional component with no rendered output of its
   * own, so it doesn't need a root element cluttering up the DOM when it's
   * being used.
   * @property tagName
   * @type {string}
   */
  tagName: '',

  // Actions
  // ---------------------------------------------------------------------------
  /**
   * Actions hash
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * Sets the {{c-l state}} property to `false`.
     * @method setFalse
     * @return {undefined}
     */
    setFalse() {
      this.set('state', false);
    },
    /**
     * Sets the {{c-l state}} property to `true`.
     * @method setTrue
     * @return {undefined}
     */
    setTrue() {
      this.set('state', true);
    },
    /**
     * Toggles the value of {{c-l 'state'}} to the opposite of its current
     * value.
     * @method toggleState
     * @return {undefined}
     */
    toggleState() {
      this.toggleProperty('state');
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{yield state (hash
    setTrue=(action 'setTrue')
    setFalse=(action 'setFalse')
    open=(action 'open')
    close=(action 'close')
    toggleState=(action 'toggleState')
  )}}`
});
