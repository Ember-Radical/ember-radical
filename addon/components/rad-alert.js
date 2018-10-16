import Component from '@ember/component';
import run from 'ember-runloop';
import { computed } from '@ember/object';
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
 * ```glimmer
 * {{#rad-alert brand="primary"}}Even hunks were boys once. Pretty little boy hunks!{{/rad-alert}}
 * {{#rad-alert brand="secondary"}}If you’re raking the leaves and it gets all over your driveway, just hose it off dummy.{{/rad-alert}}
 * {{#rad-alert brand="success"}}You have smelly body parts? Smelly under your arms? In the armpits? Just… just put some vinegar on it! Why didn’t you think of that?{{/rad-alert}}
 * {{#rad-alert brand="info"}}I’ll be brack.{{/rad-alert}}
 * {{#rad-alert brand="warning"}}Life comes from eggs. Not just for omelettes, ya dingus, you could make a baby boy or a baby girl too.{{/rad-alert}}
 * {{#rad-alert brand="danger"}}Go to bed early you doofus, ‘cause when you’re sleeping there’s no lonely times, just dreams.{{/rad-alert}}
 * ```
 *
 * #### 2. Dismissing
 * By default alerts are dismissible. You can disable this by passing a
 * `canDismiss` property.
 *
 * ```glimmer
 * {{#rad-alert brand="primary" canDismiss=false}}Try to dismiss this, ya dingus.{{/rad-alert}}
 * ```
 *
 * When alerts are dismissed they also fire an `onDismiss` action.
 *
 * ```glimmer
 * {{#rad-alert brand="primary" onDismiss=(action "handleDismiss")}}Dismiss me!{{/rad-alert}}
 * ```
 *
 * @class Component.RadAlert
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * Alert style. Eg: `success`, `info`, `warning`, `danger`
   * @property brand
   * @default ''
   * @type {string}
   * @public
   */
  brand: '',
  /**
   * If true, the alert will show the close button in upper right corner and hide
   * itself on click. Is defaulted to true, pass `false` to create an alert that
   * cannot be dismissed:
   *
   * ```glimmer
   * {{#rad-alert style='danger' dismissible=false}}
   *   This alert cannot be dismissed.
   * {{/rad-alert}}
   * ```
   * @property dismissible
   * @type {boolean}
   * @default true
   * @public
   */
  dismissible: true,
  /**
   * Component hook called when the component is dismissed by user. Is called with
   * params of `this`, the component instance and the `evt`.
   * @method onDeactivate
   * @passed
   */
  onDeactivate: () => {},
  /**
   * Component hook called after the dismiss logic has fired. Is called with
   * params of `this`, the component instance and the `evt`.
   * @method onDeactivated
   * @passed
   */
  onDeactivated: () => {},

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * A++ accessibility. Tells a screen this component is an alert.
   * @property ariaRole
   * @type {string}
   * @default 'alert'
   */
  ariaRole: 'alert',
  /**
   * Computed css class bound to component. Handled by component to allow for
   * flexibility in future updates to branding class names
   * @property brandClass
   * @type {string}
   * @param 'brand'
   * @protected
   */
  brandClass: computed('brand', function() {
    return this.get('brand') ? `alert-${this.get('brand')}` : null;
  }),

  // Ember Properties
  // ---------------------------------------------------------------------------
  /**
   * @property attributeBindings
   * @type {Array}
   * @default ['data-test']
   */
  attributeBindings: ['data-test'],
  /**
   * @property classNames
   * @type {Array}
   * @default ['alert', 'rad-alert']
   */
  classNames: ['alert', 'rad-alert'],
  /**
   * @property classNameBindings
   * @type {Array}
   * @default ['brandClass']
   */
  classNameBindings: ['brandClass'],

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
     * @action
     */
    dismiss(evt) {
      this.get('onDeactivate')(this, evt); // Consumer Hooks
      // Fade the element out
      this.$().animate({ opacity: 0 }, 300, () => {
        if (this.get('isDestroyed')) { return; }
        // Sets display:none to pull from DOM flow
        run(() => {
          this.set('isVisible', false);
          this.get('onDeactivated')(this, evt); // Consumer Hooks
        });
      });
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    <div class='alert-content'>
      {{yield}}
    </div>

    {{#if dismissible}}
      <div class='alert-close-wrapper'>
        {{#rad-button
          class='close'
          click=(action 'dismiss')
          link=true
          aria-label='close'
          data-test=(if data-test (concat data-test '-close'))}}
          {{rad-svg svgId='close'}}
        {{/rad-button}}
      </div>
    {{/if}}
  `
});
