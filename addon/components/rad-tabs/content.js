import Component from '@ember/component'
import hbs from 'htmlbars-inline-precompile'

/**
 * This component is yielded by the `rad-tabs` component. The `activeId` and
 * actions `registerTab` and `updateTab` are privately bound for internal use.
 *
 * On init each tab will register itself with the `rad-tabs` wrapping container,
 * passing all its data. The `rad-tabs` container uses this to build out the
 * tab buttons.
 *
 * ```handlebars
 * {{#rad-tabs defaultTab="dumpsterShrimp" as |components|}}
 *   {{#components.content label="Shrimp" elementId="dumpsterShrimp" tabDataTest="a-nifty-tab-button"}}
 *     BRINGO! There's some pretty good lil' shrimpers in here, lets check it out.
 *   {{/components.content}}
 * {{/rad-tabs}}
 * ```
 *
 * @class Component.RadTabs.Content
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * Whether this tab should be hidden from view. Useful for situations where
   * a tab needs to exist in a particular place in the tab ordering but may
   * not have the data it needs to display information at the time when
   * `registerTab` is invoked. This allows you to make sure your tab can be
   * hidden while preserving its place in the list.
   *
   * @property hidden
   * @passed
   * @public
   * @type {Boolean}
   */
  hidden: false,
  /**
   * The button label text of this tab. This will be passed up via a closure
   * action to the containing `rad-tabs` component.
   *
   * @property label
   * @passed
   * @public
   * @type {String}
   * @default ''
   */
  label: '',
  /**
   * Use this attribute to place a custom `data-test` attribute on the tab button
   * for this tab. This will allow easier, specific/direct targeting of clicking
   * this tab in automated testing.
   *
   * @property tabDataTest
   * @passed
   * @public
   * @type {string}
   * @default ''
   */
  tabDataTest: '',

  // Auto-Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * The id of the currently active tab in the scope of the rad-tabs component.
   * This is provided privately in the `rad-tabs` yield hash.
   * @property activeId
   * @type {String}
   * @default ''
   */
  activeId: '',

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
   * `_hidden` accounts for whether the tab is selected (by checking
   * `activeId`) && if this tab has been flagged to be hidden with property
   * `hidden`
   * @property _hidden
   * @param {string} activeId
   * @param {boolean} hidden
   * @return {string} String of true/false for use with `aria-hidden` binding
   */
  _hidden: 'true',
  // Internal Methods
  //----------------------------------------------------------------------------
  _getProps() {
    return {
      label: this.label,
      hidden: this.hidden,
    }
  },
  _calculateHidden() {
    const { hidden, activeId, defaultTab, element } = this
    const propToUse = activeId || defaultTab || null
    if (!element || hidden || propToUse !== this.element.id) {
      this.set('_hidden', 'true')
    } else {
      this.set('_hidden', 'false')
    }
  },
  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * Handle registering with the tabs container on int by firing `registerTab`
   * closure action with this tab's data.
   * @event didInsertElement
   */
  didInsertElement() {
    this._super(...arguments)
    this._calculateHidden()
    const {
      element: { id: elementId },
      label,
      hidden,
      tabDataTest,
      tagcategory,
      tagaction,
      taglabel,
    } = this
    this.registerTab({
      elementId,
      label,
      hidden,
      tabDataTest,
      tagcategory,
      tagaction,
      taglabel,
    })
  },
  /**
   * Sets the props label and hidden on initializing these Properties
   * and after `didUpdateAttrs` fires
   * @event didReceiveAttrs
   */
  didReceiveAttrs() {
    this._calculateHidden()
    // Update the private hidden state so it can be used for comparison
    // on the next attrs update
    this.set('_oldProps', this._getProps())
  },
  /**
   * Actions Up: When something changes in this component we need to let the
   * container tabs know by firing the `updateTab` closure action with this
   * tabs changed data.
   *
   * _(Currently the only change we're notifying on is the `hidden` prop)_
   * @event didUpdateAttrs
   */
  didUpdateAttrs() {
    const props = this._getProps()
    const oldProps = this._oldProps
    for (const key in props) {
      if (props[key] === oldProps[key]) {
        delete props[key]
      }
    }
    if (Object.keys(props).length) {
      this.updateTab(this.element.id, props)
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{yield}}`,
})
