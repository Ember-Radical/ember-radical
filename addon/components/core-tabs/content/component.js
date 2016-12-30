import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

/**
 * This component is yielded by the `core-tabs` component. The `activeId` and
 * actions `registerTab` and `updateTab` are privately bound for internal use.
 *
 * On init each tab will register itself with the `core-tabs` wrapping container,
 * passing all its data. The `core-tabs` container uses this to build out the
 * tab buttons.
 *
 * ```handlebars
 * {{#core-tabs defaultTab="dumpsterShrimp" as |components|}}
 *   {{#components.content label="Shrimp" elementId="dumpsterShrimp" tabDataTest="a-nifty-tab-button"}}
 *     BRINGO! There's some pretty good lil' shrimpers in here, lets check it out.
 *   {{/components.content}}
 * {{/core-tabs}}
 * ```
 *
 * Configuration | Type | Default | Description
 * --- | --- | --- | ---
 * `label` | string | null | Text label of the tab button for this panel
 * `elementId` | string | null | Set a specific id for this component when using container `defaultTab`
 * `tabDataTest` | string | null | `data-test` for the tab button
 *
 * @class CoreTabs.Content
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * The id of the currently active tab in the scope of the core-tabs component.
   * This is provided privately in the `core-tabs` yield hash.
   * @property activeId
   * @type {String}
   * @default ''
   */
  activeId: '',
  /**
   * Whether this tab should be hidden from view. Useful for situations where
   * a tab needs to exist in a particular place in the tab ordering but may
   * not have the data it needs to display information at the time when
   * `registerTab` is invoked. This allows you to make sure your tab can be
   * hidden while preserving its place in the list.
   *
   * @property hidden
   * @type {Boolean}
   */
  hidden: false,

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Aria role `tabpanel` is bound for A++ accessibility.
   * @property ariaRole
   * @type {string}
   * @default tabpanel
   */
  ariaRole: 'tabpanel',
  /**
   * Bound attributes:
   * - `data-test`: for precise testing identification
   * - `_hidden`: to hide this tab if it is not selected or if prop hidden is true
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test', '_hidden:aria-hidden'],
  /**
   * Class names: `tabs-content`
   * @property classNames
   * @type {Array}
   */
  classNames: ['tabs-content'],
  /**
   * Computed `_hidden` accounts for whether the tab is selected (by checking
   * `activeId`) && if this tab has been flagged to be hidden with property
   * `hidden`
   * @property _hidden
   * @param {string} activeId
   * @param {boolean} hidden
   * @returns {string} String of true/false for use with `aria-hidden` binding
   */
  _hidden: computed('activeId', 'hidden', function() {
    if (this.get('hidden') || this.get('activeId') !== this.get('elementId')) {
      return 'true';
    } else {
      return 'false';
    }
  }),
  /**
   * The button label text of this tab. This will be passed up via a closure
   * action to the containing `core-tabs` component.
   *
   * @property label
   * @type {String}
   * @default ''
   */
  label: '',
  /**
   * Use this attribute to place a custom data-test attribute on the tab button
   * for this tab. This will allow easier, specific/direct targeting of clicking
   * this tab in automated testing.
   *
   * @property tabDataTest
   * @type {string}
   */
  tabDataTest: '',

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * Handle registering with the tabs container on int by firing `registerTab`
   * closure action with this tab's data.
   * @event init
   */
  init() {
    this._super(...arguments);

    this.registerTab(this.getProperties(
      'elementId',
      'label',
      'hidden',
      'tabDataTest',
      'tagcategory',
      'tagaction',
      'taglabel')
    );
  },
  /**
   * Actions Up: When something changes in this component we need to let the
   * container tabs know by firing the `updateTab` closure action with this
   * tabs changed data.
   *
   * _(Currently the only change we're notifying on is the `hidden` prop)_
   * @event didUpdateAttrs
   */
  didUpdateAttrs({ oldAttrs = {}, newAttrs = {}}) {
    let oldHidden = oldAttrs.hidden ? oldAttrs.hidden.value : null;
    let newHidden = newAttrs.hidden ? newAttrs.hidden.value : null;

    if (oldHidden !== newHidden) {
      this.updateTab(this.getProperties('elementId', 'hidden'));
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{yield}}`
});
