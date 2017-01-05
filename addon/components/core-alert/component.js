import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

/**
 * Multi-use alerts for in-page error messaging, pop-up alerts, notifications,
 * and more.
 *
 * ### Usage
 *
 * #### 1. Basic usage
 * Alerts accept a `brand` property to change the alert color.
 *
 * ```handlebars
 * {{#core-alert brand="primary"}}Even hunks were boys once. Pretty little boy hunks!{{/core-alert}}
 * {{#core-alert brand="secondary"}}If you’re raking the leaves and it gets all over your driveway, just hose it off dummy.{{/core-alert}}
 * {{#core-alert brand="success"}}You have smelly body parts? Smelly under your arms? In the armpits? Just… just put some vinegar on it! Why didn’t you think of that?{{/core-alert}}
 * {{#core-alert brand="info"}}I’ll be brack.{{/core-alert}}
 * {{#core-alert brand="warning"}}Life comes from eggs. Not just for omelettes, ya dingus, you could make a baby boy or a baby girl too.{{/core-alert}}
 * {{#core-alert brand="danger"}}Go to bed early you doofus, ‘cause when you’re sleeping there’s no lonely times, just dreams.{{/core-alert}}
 * ```
 *
 * {{#core-alert brand="primary"}}Even hunks were boys once. Pretty little boy hunks!{{/core-alert}}
 * {{#core-alert brand="secondary"}}If you’re raking the leaves and it gets all over your driveway, just hose it off dummy.{{/core-alert}}
 * {{#core-alert brand="success"}}You have smelly body parts? Smelly under your arms? In the armpits? Just… just put some vinegar on it! Why didn’t you think of that?{{/core-alert}}
 * {{#core-alert brand="info"}}I’ll be brack.{{/core-alert}}
 * {{#core-alert brand="warning"}}Life comes from eggs. Not just for omelettes, ya dingus, you could make a baby boy or a baby girl too.{{/core-alert}}
 * {{#core-alert brand="danger"}}Go to bed early you doofus, ‘cause when you’re sleeping there’s no lonely times, just dreams.{{/core-alert}}
 *
 * #### 2. Dismissing
 * By default alerts are dismissible. You can disable this by passing a
 * `canDismiss` property.
 *
 * ```handlebars
 * {{#core-alert brand="primary" canDismiss=false}}Try to dismiss this, ya dingus.{{/core-alert}}
 * ```
 *
 * {{#core-alert brand="primary" canDismiss=false}}Try to dismiss this, ya dingus.{{/core-alert}}
 *
 * When alerts are dismissed they also fire an `onDismiss` action.
 *
 * ```handlebars
 * {{#core-alert brand="primary" onDismiss=(action "handleDismiss")}}Dismiss me!{{/core-alert}}
 * ```
 *
 * @class Component.CoreAlert
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * Specify brand, component handles assigning correct css class
   * @property brand
   * @default ''
   * @type {string}
   * @public
   */
  brand: '',
  /**
   * Whether this alert can be dismissed via the close button in the upper right
   * corner. Defaults to true. Adds an interactive close button to the alert.
   *
   * **Usage:**
   * Override by passing `false` into this param in your handlebars template:
   *
   * ```handlebars
   * {{#core-alert canDismiss=false}}
   *   {{! Standard template content goes here }}
   * {{/core-alert}}
   * ```
   *
   * @property canDismiss
   * @type {boolean}
   * @default true
   * @public
   */
  canDismiss: true,
  /**
   * Contains optional action that is executed when the alert is dismissed.
   * This action will be executed before the alert is destroyed.
   * @property onDismiss
   * @type {function}
   * @default () => {}
   * @public
   */
  onDismiss: () => {},

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Computed css class bound to component. Handled by component to allow for
   * flexibility in future updates to branding class names
   * @property brandClass
   * @type {string}
   * @param 'brand'
   * @private
   */
  brandClass: computed('brand', function() {
    return this.get('brand') ? `alert-${this.get('brand')}` : null;
  }),
  /**
   * A++ accessibility. Tells a screen this component is an alert.
   * @property role
   * @type {string}
   * @private
   */
  role: 'alert',

  // Ember Properties
  // ---------------------------------------------------------------------------

  /**
   * Attribute bindings applied to the component.
   * @property attributeBindings
   * @type {Array}
   * @private
   */
  attributeBindings: [
    'role'
  ],
  /**
   * Static class names applied to the component that must always exist. This
   * really should not need to be overridden or extended.
   * @property classNames
   * @type {Array}
   * @private
   */
  classNames: ['core-alert'],
  /**
   * A set of dynamic classes whose output is bound to the associated values
   * on the component.
   * @property classNameBindings
   * @type {Array}
   * @private
   */
  classNameBindings: [
    'brandClass',
    'canDismiss:alert-dismissible'
  ],

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Allows for quick and easy dismissal of the alert. The alert is faded from
   * view, then totally removed from the DOM and the component instance is
   * destroyed.
   * @method _selfDestruct
   * @return {undefined}
   */
  _selfDestruct() {
    // Fade the element out
    this.$().animate({ opacity: 0 }, 300, () => {
      // When the animation is complete, destroy the component
      if (!this.get('isDestroyed')) {
        this.$().remove();
      }
    });
  },

  // Actions
  // ---------------------------------------------------------------------------
  /**
   * Actions hash
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * A proxy action for the selfDestruct method
     * @method dismiss
     * @return {undefined}
     */
    dismiss() {
      // check if a dismiss action was passed into the component
      this.onDismiss();
      // Internal method to handle all the destruction
      this._selfDestruct();
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{yield}}

    {{#if canDismiss}}
      {{#core-button
        class="close"
        click=(action "dismiss")
        link=true
        aria-label="close"}}
        {{core-svg svgId="x"}}
      {{/core-button}}
    {{/if}}
  `
});
