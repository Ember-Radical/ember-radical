import Component from '@ember/component';
import { computed } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { controls } from '../utils/arias';

/**
 * Fully accessible expandable drawer/expandable content component.
 * The `rad-drawer` component is the parent container for a set of `target` and
 * `content` subcomponents, which represent the title/trigger text to open the
 * drawer and the content to be revealed within the drawer, respectively.
 *
 * ## Usage
 *
 * There are two ways to use `rad-drawer`'s subcomponents:
 *
 * ### 1. Simple invocation via attrs
 *
 * If you only have simple text (or pre-determined text/HTML within a variable)
 * to yield, you can simply use the `Target` and `Content` attrs on `rad-drawer` to auto-invoke the subcomponents, like so:
 *
 * ```glimmer
 * {{rad-drawer
 *   Target='Click to read more about puppies'
 *   Content='Imagine five paragraphs about puppies instead of this one sentence.'}}
 * ```
 *
 * This is the easiest and quickest way to create an instance of `rad-drawer`.
 *
 * ### 2. Full invocation via contextual components
 *
 * If you have more complex needs in terms of the text/html/template code
 * that needs to exist in either the `target` or `content` subcomponents,
 * `rad-drawer` yields contextual components for both which you can access
 * directly within the block invocation of `rad-drawer`.
 *
 * ```glimmer
 * {{#rad-drawer as |components|}}
 *   {{#components.target}}
 *     <h2>This is a very large drawer that will be hard to not see</h2>
 *   {{/components.target}}
 *   {{#components.content}}
 *     <img src="https://media.giphy.com/media/6Bfnhb5jQqvny/giphy.gif" alt="" />
 *   {{/components.content}}
 * {{/rad-drawer}}
 * ```
 *
 * You can also combine the use of attrs and contextual components:
 *
 * ```glimmer
 * {{#rad-drawer Target='Click me! Come on, do it!' as |components|}}
 *   {{#components.content}}
 *     <img src="https://media.giphy.com/media/RDG5Q86EJiNTG/giphy.gif" alt="" />
 *   {{/components.content}}
 * {{/rad-drawer}}
 * ```
 *
 * Additionally, the open/closed state of a `rad-drawer` can be updated from
 * an external state source. This can be very useful for situations where you
 * want another user interaction to trigger a drawer to open, or for setting
 * a drawer to be open by default. For example, you may wish to use a button to
 * automatically expand or collapse all core drawer instances at once.
 *
 * ```handlebars
 * {{#rad-button click=(action 'changeSomeProp')}}Toggle Drawer{{/rad-button}}
 *
 * {{rad-drawer Target='Hello' Content='I am open now' hidden=someProp}}
 * ```
 *
 * {{#rad-state as |state stateActions|}}
 *   {{#rad-button click=(action stateActions.toggleState)}}Toggle Drawer{{/rad-button}}
 *   {{rad-drawer Target='Hello' Content='I am open now' hidden=state}}
 * {{/rad-state}}
 *
 * `rad-drawer` will still continue to function normally with this property
 * passed in, but it gives you the ability to control it externally.
 *
 * ## Properties
 *
 * Configuration | Type | Default | Description
 * --- | --- | --- | ---
 * `buttonStyle` | boolean | false | Whether to style the `target` to look like a button
 * `hidden` | boolean | false | Pass in any other property to cause `rad-drawer` to update when that property updates
 * `icon` | string/boolean | 'arrow-down' | Specifies which SVG icon to show in the `target`. Hides the icon if set to `false`
 *
 * ## A++ Accessibility Features
 *
 * - Drawer target auto-binds `aria-controls` to the value of the component ID
 * - Drawer target auto-binds `aria-expanded` to the expanded/collapsed state
 * - Show/hide of `content` is managed through `aria-hidden` attr
 *
 * @class Component.RadDrawer
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
   * State boolean for display of the drawer content. Is toggled true/false to
   * handle show/hide. Updated in `toggleHidden`.
   *
   * You may optionally pass a boolean property into this component to control
   * its state from the outside (one-way only).
   * @property hidden
   * @type {Boolean}
   * @default true
   */
  hidden: true,
  /**
   * If you want to use a different SVG icon from the default on your `target`,
   * specify it by name/id here. If you don't want to display an icon
   * at all, pass `false` into this property
   * @property icon
   * @type {string|Boolean}
   * @default 'arrow-down'
   */
  icon: 'arrow-down',

  // Contextual Component Specifications
  // ---------------------------------------------------------------------------

  /**
   * @property contentComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-drawer/content'
   */
  contentComponent: 'rad-drawer/content',
  /**
   * @property contentComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-drawer/content'
   */
  targetComponent: 'rad-drawer/target',

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
   * @property classNameBindings
   * @type {Array}
   * @default ['hidden::active']
   */
  classNameBindings: ['hidden::active'],
  /**
   * Bind `rad-drawer` to component
   * @property classNames
   * @type {Array}
   */
  classNames: ['rad-drawer'],

  // Hooks
  // ---------------------------------------------------------------------------

  // Ember Properties
  // ---------------------------------------------------------------------------

  /**
   * Auto-binds `data-test` attributes
   *
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],

  // Actions
  // ---------------------------------------------------------------------------

  /**
   * Actions Hash
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * Toggle internal {{c-l hidden}} property. Pass state boolean if specific state is needed.
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
      {{#rad-drawer/target
        ariaId=ariaId
        click=(action 'toggleHidden')
        hidden=hidden
        icon=icon
        link=(not buttonStyle)
        tagcategory=tagcategory tagaction=tagaction taglabel=taglabel tagvalue=tagvalue tagcd=tagcd
        data-test=(if data-test (concat data-test '-target'))}}
        {{{Target}}}
      {{/rad-drawer/target}}
    {{/if}}

    {{yield (hash
      content=(component contentComponent
        ariaId=ariaId
        hidden=hidden
        data-test=(if data-test data-test))
      target=(component targetComponent
        ariaId=ariaId
        click=(action 'toggleHidden')
        hidden=hidden
        icon=icon
        link=(not buttonStyle)
        tagcategory=tagcategory tagaction=tagaction taglabel=taglabel tagvalue=tagvalue tagcd=tagcd
        data-test=(if data-test (concat data-test '-target')))
    ) hidden}}

    {{#if Content}}
      {{#rad-drawer/content hidden=hidden ariaId=ariaId data-test=(if data-test (concat data-test '-content'))}}
        {{{Content}}}
      {{/rad-drawer/content}}
    {{/if}}
  `
});
