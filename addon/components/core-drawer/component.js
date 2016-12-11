import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';
import {controls} from '../../utils/arias';

/**
 * Fully accessible expandable drawer/expandable content component.
 * The `core-drawer` component is the parent container for a set of `target` and
 * `content` subcomponents, which represent the title/trigger text to open the
 * drawer and the content to be revealed within the drawer, respectively.
 *
 * ### Usage
 *
 * There are two ways to use `core-drawer`'s subcomponents:
 *
 * #### 1. Simple invocation via attrs
 *
 * If you only have simple text (or pre-determined text/HTML within a variable)
 * to yield, you can simply use the `Target` and `Content` attrs on `core-drawer` to auto-invoke the subcomponents, like so:
 *
 * ```handlebars
 * {{core-drawer Target='Click to read more about puppies' Content='Imagine five paragraphs about puppies instead of this one sentence.'}}
 * ```
 *
 * This is the easiest and quickest way to create an instance of `core-drawer`.
 *
 * #### 2. Full invocation via contextual components
 *
 * If you have more complex needs in terms of the text/html/template code
 * that needs to exist in either the `target` or `content` subcomponents,
 * `core-drawer` yields contextual components for both which you can access
 * directly within the block invocation of `core-drawer`.
 *
 * ```handlebars
 * {{#core-drawer as |components|}}
 *   {{#components.target}}
 *     <h2>This is a very large drawer that will be hard to not see</h2>
 *   {{/components.target}}
 *   {{#components.content}}
 *     <img src="https://media.giphy.com/media/6Bfnhb5jQqvny/giphy.gif" alt="" />
 *   {{/components.content}}
 * {{/core-drawer}}
 * ```
 *
 * You can also combine the use of attrs and contextual components:
 *
 * ```handlebars
 * {{#core-drawer Target='Click me! Come on, do it!' as |components|}}
 *   {{#components.content}}
 *     <img src="https://media.giphy.com/media/RDG5Q86EJiNTG/giphy.gif" alt="" />
 *   {{/components.content}}
 * {{/core-drawer}}
 *
 * Additionally, the open/closed state of a `core-drawer` can be updated from
 * an external state source. This can be very useful for situations where you
 * want another user interaction to trigger a drawer to open, or for setting
 * a drawer to be open by default. For example, you may wish to use a button to
 * automatically expand or collapse all core drawer instances at once.
 *
 * ```handlebars
 * {{#core-button click=(action 'changeSomeProp')}}Toggle Drawer{{/core-button}}
 *
 * {{#core-drawer Target='Hello' Content='I am open now' externalToggle=someProp}}
 * ```
 *
 * `core-drawer` will still continue to function normally with this property
 * passed in, but it gives you the ability to control it externally.
 *
 * Configuration | Type | Default | Description
 * --- | --- | ---
 * `externalToggle` | boolean | false | Pass in any other property to cause `core-drawer` to update when that property updates
 * `icon` | string/boolean | 'arrow-down2' | Specifies which SVG icon to show in the `target`. Hides the icon if set to `false`
 * `buttonStyle` | boolean | false | Whether to style the `target` to look like a button
 *
 * ### A++ Accessibility
 *
 * - Drawer target auto-binds `aria-controls` to the value of the component ID
 * - Drawer target auto-binds `aria-expanded` to the expanded/collapsed state
 * - Show/hide of `content` is managed through `aria-hidden` attr
 *
 * @class Component.CoreDrawer
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * By default, the `target` subcomponent will display as a plain link. If you
   * would like it to display as a button, set this to `true`.
   * @property buttonStyle
   * @type {Boolean}
   */
  buttonStyle: false,
  /**
   * Allow for external controls to update the open/closed state of a `core-drawer`
   * @property externalToggle
   * @type {Boolean}
   */
  externalToggle: false,
  /**
   * If you want to use a different SVG icon from the default on your `target`,
   * specify it by name/id here. If you don't want to display an icon
   * at all, pass `false` into this property
   * @property icon
   * @type {string|Boolean}
   * @default 'arrow-down2'
   */
  icon: 'arrow-down',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Unique id for binding `aria-controls` in subcomponents
   * @property ariaId
   * @type {string}
   * @param elementId
   */
  ariaId: computed('elementId', controls),
  /**
   * Bind `core-drawer` to component
   * @property classNames
   * @type {Array}
   */
  classNames: ['core-drawer'],
  /**
   * State boolean for display of the drawer content. Is toggled true/false to
   * handle show/hide. Updated in `toggleHidden`
   * @property hidden
   * @type {Boolean}
   * @default true
   */
  hidden: true,

  // Ember Properties
  // ---------------------------------------------------------------------------
  /**
   * Auto-binds `data-test` attributes
   *
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * The component's `didReceiveAttrs` hook. Allows udpates from external state
   * to adjust the `hidden` state of a `core-drawer` instance.
   *
   * @event didReceiveAttrs
   * @return {undefined}
   */
  didReceiveAttrs({newAttrs, oldAttrs}) {
    if (oldAttrs && newAttrs.externalToggle.value !== oldAttrs.externalToggle.value) {
      const externalToggle = this.get('externalToggle');
      this.set('hidden', !externalToggle);
    }
  },

  // Actions
  // ---------------------------------------------------------------------------

  /**
   * Actions Hash
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * Toggle internal hidden property. Pass state boolean if specific state is needed.
     * @method toggleHidden
     * @param {Object}  evt     Event object
     * @param {boolean} [state] Specific state to set
     */
    toggleHidden(evt, state) {
      if (state !== undefined) {
        this.set('hidden', state);
      } else {
        this.toggleProperty('hidden');
      }
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{#if Target}}
      {{#core-drawer/target
        ariaId=ariaId
        click=(action 'toggleHidden')
        hidden=hidden
        icon=icon
        buttonStyle=buttonStyle
        tagcategory=tagcategory tagaction=tagaction taglabel=taglabel tagvalue=tagvalue tagcd=tagcd
        data-test=data-test}}
        {{{Target}}}
      {{/core-drawer/target}}
    {{/if}}

    {{yield (hash
      content=(component 'core-drawer/content'
        ariaId=ariaId
        hidden=hidden
        data-test=data-test)
      target=(component 'core-drawer/target'
        ariaId=ariaId
        click=(action 'toggleHidden')
        hidden=hidden
        icon=icon
        buttonStyle=buttonStyle
        tagcategory=tagcategory tagaction=tagaction taglabel=taglabel tagvalue=tagvalue tagcd=tagcd
        data-test=data-test)
    )}}

    {{#if Content}}
      {{#core-drawer/content hidden=hidden ariaId=ariaId data-test=data-test}}
        {{{Content}}}
      {{/core-drawer/content}}
    {{/if}}
  `
});
