import Ember from 'ember';
import Component from 'ember-component';
import run from 'ember-runloop';
import hbs from 'htmlbars-inline-precompile';

const { $ } = Ember;

/**
 * A++ Accessible tabs. The `core-tabs` component is the parent container for
 * a given set of tabs. The `core-tabs` component yields a `content` contextual
 * component inside of the `components` hash.
 *
 * #### Usage
 *
 * ```handlebars
 * {{#core-tabs as |components|}}
 *   {{#components.content name="Delgrango's" id="delGrangos"}}
 *     This is my favorite resaurant at the marinara, name of Delgrango's
 *   {{/components.content}}
 *   {{#components.content name="Fresh Water" id="water"}}
 *     Boy I sure did work up a thirst after eating all them shramps. Time to
 *     wash it down with a cool glass of marina water.
 *   {{/components.content}}
 * {{/core-tabs}}
 * ```
 *
 * You can include any number of `components.content` contextual components,
 * however keep in mind that adding too many `content` components may result in
 * the tab labels becoming unreadable depending on the space alotted for
 * displaying them.
 *
 * You can also specify a default tab by setting the `defaultTab` parameter that
 * matches one of content components' `id` property:
 *
 * ```handlebars
 * {{#core-tabs defaultTab="dumpsterShrimp" as |components|}}
 *   {{#components.content name="Shrimp" id="dumpsterShrimp"}}
 *     BRINGO! There's some pretty good lil' shrimpers in here, lets check it out.
 *   {{/components.content}}
 *   {{#components.content name="Delgrango's" id="delGrangos"}}
 *     This is my favorite resaurant at the marinara, name of Delgrango's
 *   {{/components.content}}
 * {{/core-tabs}}
 * ```
 *
 * Configuration | Type | Default | Description
 * --- | --- | ---
 * `buttonStyle` | boolean | true | Set to false for tab buttons without primary background-color
 * `defaultTab` | string | null | Tab to render shown by default
 * `scrollOnClick` | boolean | false | Set to true to scroll page to top on tab click
 * `scrollTarget` | jQuery selector | 'body, html' | Specify scroll animation target
 *
 * ### Feature Notes:
 * - The tab list is a flexbox container with flex-grow 1 for each tab. This auto
 *   magically grows the tabs to fill the entire width of tab container.
 *
 * @class CoreTabs
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * The optional tab ID of the tab that should be shown by default. This is
   * useful for cases where the user has come into a page and is expecting one
   * of the tabs to be shown by default.
   * @property defaultTab
   * @type {String}
   * @default ''
   */
  defaultTab: '',
  /**
   * Whether the page should scroll the tab context back to the top when one of
   * the tabs is clicked. This can be a nice convenience for usabilitee.
   * @property scrollOnClick
   * @type {Boolean}
   * @default false
   */
  scrollOnClick: false,
  /**
   * What the target of the `scrollOnClick` behavior should be. By default,
   * the entire page/body scrolls, however if this instance of `core-tabs` is
   * contained within a modal or some other scrollable sub-container, it may
   * be more desirable to execute a scroll against that instead of the entire
   * page. Simply pass a standard jQuery-like selector in as a string.
   * @property scrollTarget
   * @type {string}
   * @default 'body, html'
   */
  scrollTarget: 'body, html',
  /**
   * Pass false to use tab style without primary color tabs.
   * @property buttonStyle
   * @type {Boolean}
   * @default true
   */
  buttonStyle: true,

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * The ID of the currently opened tab. This determines which tab is active and
   * which tab's content to display. If this is empty, no tabs are open.
   * @property _activeId
   * @type {String}
   * @default ''
   */
  _activeId: '',
  /**
   * Bound attributes:
   * - `data-test`: for precise testing identification
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Class names: `core-tabs`
   * @property classNames
   * @type {Array}
   */
  classNames: ['core-tabs'],
  /**
   * List of tabs to display. This is iterated through in the template to
   * rendered the buttons that are used to change tabs.
   * @property tabNameList
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
   * This prevents multiple instances of core-tabs on a given page from
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
      this.set('_activeId', this.get('defaultTab'));
    }
  },

  // Actions
  // ---------------------------------------------------------------------------

  actions: {
    /**
     * Action to show a tab. Set `_activeId` to the passed id. `_activeId` is
     * passed down to children content components
     * @method showTab
     * @param {String} id Id of the tab to show
     */
    showTab(id) {
      if (this.get('scrollOnClick')) {
        let scrollTarget = this.get('scrollTarget');
        $(scrollTarget).animate({
          scrollTop: $('#' + this.get('elementId')).offset().top - 120
        }, 1000);
      }
      this.set('_activeId', id);
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
     * @param {string}  tab.id     Id of tab to update
     * @param {boolean} tab.hidden Hidden status of changed tab
     */
    updateTab({ id, hidden }) {
      const tabToUpdate = this.get('tabList').filter(tab => tab.id === id);

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
    {{! A list of buttons that are all automagically added to the tabList based on the number of core-tabs.content components are nested inside the component. }}
    <ul class="tab-list{{if buttonStyle ' button-style'}}" role="tablist" data-test="tab-list">
      {{#each tabList as |tab|}}
        <li class="tab-li"
          aria-hidden="{{if tab.hidden true false}}">
          {{#core-button
            ariaRole="tab"
            aria-controls=tab.elementId
            class=(concat 'tab' (if (eq tab.id _activeId) ' active'))
            link=true
            click=(action 'showTab' tab.id)
            data-test=tab.dataTest
            tagcategory=tab.tagcategory
            tagaction=tab.tagaction
            taglabel=tab.taglabel}}
            {{tab.name}}
          {{/core-button}}
        </li>
      {{/each}}
    </ul>
    <div class="content-container">
      {{! Yield the core-tabs/content component pre-bound with internal props }}
      {{yield (hash
        content=(component 'core-tabs/content'
          registerTab=(action 'registerTab')
          updateTab=(action 'updateTab')
          _activeId=_activeId)
      )}}
    </div>
  `
});
