import Ember from 'ember';
import Component from 'ember-component';
import run from 'ember-runloop';
import hbs from 'htmlbars-inline-precompile';

const { $ } = Ember;

/**
 * A++ Accessible tabs. The `rad-tabs` component is the parent container for
 * a given set of tabs and handles managing the active state of the tabs and tab
 * panels. The `rad-tabs` component yields a `content` contextual component
 * inside of the `components` hash.
 *
 * #### Usage
 *
 * ```handlebars
 * {{#rad-tabs as |components|}}
 *   {{#components.content label="Delgrango's"}}
 *     This is my favorite resaurant at the marinara, name of Delgrango's
 *   {{/components.content}}
 *   {{#components.content label="Fresh Water"}}
 *     Boy I sure did work up a thirst after eating all them shramps. Time to
 *     wash it down with a cool glass of marina water.
 *   {{/components.content}}
 * {{/rad-tabs}}
 * ```
 *
 * You can include any number of `components.content` contextual components.
 * _(However keep in mind that adding too many `content` components may result in
 * the tab labels becoming unreadable depending on the space alotted for
 * displaying them.)_
 *
 * You can also specify a default tab by setting the `defaultTab` parameter to
 * match one of content components' HTML id property:
 *
 * ```handlebars
 * {{#rad-tabs defaultTab="shrimpers" as |components|}}
 *   {{#components.content label="Shrimp" elementId="shrimpers"}}
 *     BRINGO! There's some pretty good lil' shrimpers in here, lets check it out.
 *   {{/components.content}}
 *   {{#components.content label="Delgrango's"}}
 *     This is my favorite resaurant at the marinara, name of Delgrango's
 *   {{/components.content}}
 * {{/rad-tabs}}
 * ```
 *
 * ### Controlled Tabs
 * If you need to programatically open tabs within your application you can
 * create a controlled instance of `rad-tabs` by specifying the `activeId` for
 * the component. This means that you need to track the `activeId` in a parent
 * component or service and pass it down into the controlled tab instance. To do
 * this pass an `onChange` closure into the component. It will be called with
 * the `elementId` of the selected tab any time a user changes tabs.
 *
 * ### A++ Accessibility
 * - Tabs have `aria-controls` set to the `elementId` of the `tabpanel` they show.
 * - Tabs have `role=tab` for role identification
 * - Tabs are instances of `rad-button` for keyboard access
 * - Show/hide of tabs and panels are managed through `aria-hidden` attr
 *
 * ### Feature Notes:
 * - The tab list is a flexbox container with flex-grow 1 for each tab. This auto
 *   magically grows the tabs to fill the entire width of tab container.
 *
 * @class Component.RadTabs
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * The elementId of the currently opened tab. This determines which tab is active and
   * which tab's content to display. If this is empty, no tabs are open.
   * @property activeId
   * @passed
   * @public
   * @type {String}
   * @default ''
   */
  activeId: '',
  /**
   * Pass false to use tab style without primary color tabs.
   * @property buttonStyle
   * @passed
   * @public
   * @type {Boolean}
   * @default true
   */
  buttonStyle: true,
  /**
   * The optional elementId of the tab that should be shown by default. This is
   * useful for cases where the user has come into a page and is expecting one
   * of the tabs to be shown by default.
   * @property defaultTab
   * @passed
   * @public
   * @type {String}
   * @default ''
   */
  defaultTab: '',
  /**
   * Optional closure action that will be called whenever a tab is opened with
   * the id of that tab. Use this to create a controlled tabs instance.
   * @property onChange
   * @passed
   * @public
   * @type {function}
   * @default null
   */
  onChange: null,
  /**
   * Whether the page should scroll the tab context back to the top when one of
   * the tabs is clicked. This can be a nice convenience for usabilitee.
   * @property scrollOnClick
   * @passed
   * @public
   * @type {Boolean}
   * @default false
   */
  scrollOnClick: false,
  /**
   * What the target of the `scrollOnClick` behavior should be. By default,
   * the entire page/body scrolls, however if this instance of `rad-tabs` is
   * contained within a modal or some other scrollable sub-container, it may
   * be more desirable to execute a scroll against that instead of the entire
   * page. Simply pass a standard jQuery-like selector in as a string.
   * @property scrollTarget
   * @passed
   * @public
   * @type {string}
   * @default 'body, html'
   */
  scrollTarget: 'body, html',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bound attributes:
   * - `data-test`: for precise testing identification
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Class names: `rad-tabs`
   * @property classNames
   * @type {Array}
   */
  classNames: ['rad-tabs'],
  /**
   * List of tabs to display. This is iterated through in the template to
   * rendered the buttons that are used to change tabs.
   * @property tabList
   * @type {Array.<Object>}
   * @default null
   */
  tabList: null,

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Internal method that can be used with a `run.once` call to only add new tabs
   * once per run loop. Simply iterates through `_tabsToCreate` and pushes them
   * into the `tabList`. This is needed to prevent multiple renders in a single
   * run loop when all of the `content` subcomponents register themselves with
   * the container during init.
   * @method _createTabsList
   */
  _createTabsList() {
    const tabList = this.get('tabList');

    this.get('_tabsToCreate').forEach(tab => tabList.pushObject(tab));
    this.set('_tabsToCreate', Ember.A());
  },

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * When the component initializes, we set the `tabList` property to an array.
   * This prevents multiple instances of rad-tabs on a given page from
   * inheriting the same tabList array through prototype inheritance.
   * @event init
   * @return {undefined}
   */
  init() {
    this._super(...arguments);

    // Disabled prototype extensions require Ember.A for a new array:
    // https://guides.emberjs.com/v2.10.0/configuring-ember/disabling-prototype-extensions/#toc_arrays
    this.set('tabList', Ember.A());
    this.set('_tabsToCreate', Ember.A());

    // When default tab is passed, update internal flag
    if (this.get('defaultTab')) {
      this.set('activeId', this.get('defaultTab'));
    }
  },

  // Actions
  // ---------------------------------------------------------------------------

  actions: {
    /**
     * Action to show a tab. Set `activeId` to the passed elementId. `activeId`
     * is passed down to children content components
     * @method showTab
     * @param {String} elementId HTML id of the tab to show
     */
    showTab(elementId) {
      if (this.get('scrollOnClick')) {
        let scrollTarget = this.get('scrollTarget');
        $(scrollTarget).animate({
          scrollTop: $('#' + this.get('elementId')).offset().top - 120
        }, 1000);
      }

      // If an onChange closure was passed in, call it with change data. This
      // allows for 'controlled' tabs
      if (this.get('onChange')) {
        this.get('onChange')({ elementId: elementId });
      } else {
        this.set('activeId', elementId);
      }
    },
    /**
     * Closure action passed to content subcomponents that is called on init.
     * Each child tab will register itself with this container. To ensure the
     * tabList is only updated once per render, we proxy new tabs to the
     * `_tabsToCreate` array and then push all of them to `tabList` using a
     * `run.once` call to `_createTabsList`
     * @method registerTab
     * @param {Object} tab Object model of tab to be registered
     */
    registerTab(tab) {
      this.get('_tabsToCreate').pushObject(tab);
      // We only want this to run once
      run.once(this, '_createTabsList');
    },
    /**
     * Closure action passed to content subcomponents that is called whenever
     * a tab has updated in a way this container needs to know of. Currently
     * this is only when a tab's `hidden` status changes.
     * @method updateTab
     * @param {Object}  tab
     * @param {string}  tab.elementId HTML id of tab to update
     * @param {boolean} tab.hidden    Hidden status of changed tab
     */
    updateTab({ elementId, hidden }) {
      const tabToUpdate = this.get('tabList').filter(tab => tab.elementId === elementId);

      if (tabToUpdate.length) {
        // TODO: when updating hidden in the tabList a double render is occuring
        // for some reason. Why???
        run.once(this, () => Ember.set(tabToUpdate[0], 'hidden', hidden));
      }
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! A list of buttons that are all automagically added to the tabList based on the number of rad-tabs.content components are nested inside the component. }}
    <ul class="tab-list{{if buttonStyle ' button-style'}}" role="tablist" data-test="tab-list">
      {{#each tabList as |tab|}}
        <li class="tab-li"
          aria-hidden="{{if tab.hidden true false}}">
          {{#rad-button
            ariaRole="tab"
            aria-controls=tab.elementId
            class=(concat 'tab' (if (eq tab.elementId activeId) ' active'))
            link=true
            click=(action 'showTab' tab.elementId)
            data-test=tab.tabDataTest
            tagcategory=tab.tagcategory
            tagaction=tab.tagaction
            taglabel=tab.taglabel}}
            {{tab.label}}
          {{/rad-button}}
        </li>
      {{/each}}
    </ul>
    <div class="content-container">
      {{! Yield the rad-tabs/content component pre-bound with internal props }}
      {{yield (hash
        content=(component 'rad-tabs/content'
          registerTab=(action 'registerTab')
          updateTab=(action 'updateTab')
          activeId=activeId)
      )}}
    </div>
  `
});
