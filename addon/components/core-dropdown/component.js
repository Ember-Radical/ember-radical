import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

import { bindOnEscape, unbindOnEscape } from '../../utils/listeners';
import { labelledby, describedby } from '../../utils/arias';

/**
 * Core dropdown component.
 *
 * Welcome friend, if you're looking for a button/link that opens a dropdown
 * you've come to the right place.
 *
 * ## Usage
 *
 * ### 1. Simple invocation. It's so easy. Just pass a Target and Content prop
 * and you've got a totally rad dropdown.
 * ```glimmer
 * {{core-dropdown Target="Open me!" Content="Hey, what's up?"}}
 * ```
 *
 * ### 2. Simple target with custom content. Use the Content contextual
 * component to add custom content to the dropdown.
 * ```handlebars
 * {{#core-dropdown Target="Open me!" as |components|}}
 *   {{#components.content}}Hey, what's up?{{/components.content}}
 * {{/core-dropdown}}
 * ```
 *
 * ### 3. Customize both the dropdown target and content.
 * ```glimmer
 * {{#core-dropdown as |components|}}
 *   {{#components.target}}Open me!{{/components.target}}
 *   {{#components.content}}Hey, what's up?{{/components.content}}
 * {{/core-dropdown}}
 * ```
 *
 * ### 4. Turn the target into a button with `buttonStyle=true` and pass a
 * `brand` to change the color button.
 * ```handlebars
 * {{core-dropdown buttonStyle=true brand="primary" Target="Open me!" Content="Hey, what's up?"}}
 * ```
 *
 * Configuration | Type | Default | Description
 * --- | --- | --- | ---
 * `buttonStyle` | boolean | false | Whether to style the `target` to look like a button
 * `brand` | string | '' | The brand class to use to style the `target`
 *
 * @class Component.CoreDropdown
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * Adds a brand class to the target as btn-{brand}
   * @property brand
   * @type {String}
   * @default ''
   */
  brand: '',
  /**
   * Whether or not to style the target as a link or a button
   * @property buttonStyle
   * @type {Boolean}
   * @default false
   */
  buttonStyle: false,

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * State boolean for display of the dropdown content. Is toggled true/false to
   * handle show/hide. Updated in `_showContent` and `_hideContent`
   * @property hidden
   * @type {Boolean}
   * @default true
   */
  hidden: true,
  /**
   * Unique string used to handle setting up aria roles for A++ usability.
   * @property describedby
   * @type {string}
   * @param elementId
   */
  describedby: computed('elementId', describedby),
  /**
   * Unique string used to handle setting up aria roles for A++ usability.
   * @property labelledby
   * @type {string}
   * @param elementId
   */
  labelledby: computed('elementId', labelledby),

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
   * Bind `core-dropdown`
   * @property classNames
   * @type {Array}
   */
  classNames: ['core-dropdown'],

  // Hooks
  // ---------------------------------------------------------------------------
  /**
   * Safety first!
   * If we leave the page without closing the dropdown we don't want to orphan
   * listeners.
   * @method willDestroyElement
   */
  willDestroyElement() {
    // Check for passed closures
    if (this.get('onDestroy')) { this.get('onDestroy')(); }

    // Remove listeners
    unbindOnEscape(this.get('elementId'));
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
     * Handle the showing of the dropdown
     * @method show
     * @return {undefined}
     */
    show() {
      // Toggle display
      this.set('hidden', false);

      // Check for passed closures
      if (this.get('onShow')) { this.get('onShow')(); }

      // Bind the keycommand `esc` to close dropdown
      bindOnEscape(this.get('elementId'), this.get('actions.hide').bind(this));
    },
    /**
     * Handle the hiding of the dropdown
     * @method hide
     * @return {undefined}
     */
    hide() {
      // Toggle display
      this.set('hidden', true);

      // Check for passed closures
      if (this.get('onHide')) { this.get('onHide')(); }

      // Remove listeners
      unbindOnEscape(this.get('elementId'));
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{#unless hidden}}
      {{! Page wide background that closes dropdown on click, not needed for keyboard users }}
      <div class="core-dropdown-background"
        aria-hidden="false"
        {{action "hide"}}>
      </div>
    {{/unless}}

    {{#if Target}}
      {{#core-dropdown/target
        brand=brand
        click=(action (if hidden 'show' 'hide'))
        link=(not buttonStyle)
        hidden=hidden}}
        {{{Target}}}
      {{/core-dropdown/target}}
    {{/if}}

    {{#if Content}}
      {{#core-dropdown/content hidden=hidden}}
        {{{Content}}}
      {{/core-dropdown/content}}
    {{/if}}

    {{yield (hash
      target=(component 'core-dropdown/target'
        brand=brand
        click=(action (if hidden 'show' 'hide'))
        link=(not buttonStyle)
        hidden=hidden)
      content=(component 'core-dropdown/content'
        hidden=hidden)
    ) (action 'show') (action 'hide') hidden aria-describedby aria-labelledby}}
  `
});
