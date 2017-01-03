import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

import { describedby } from '../../utils/arias';

/**
 * A fully accessible tooltip component. The `core-tooltip` component can be
 * used by itself or in block form as a parent of the title/content
 * subcomponents which represent the title/trigger text to show the
 * tooltip and the content to be revealed within the tooltip, respectively.
 *
 * ### Usage
 *
 * #### 1. Simple invocation
 * ```handlebars
 * {{core-tooltip Title="Hover me" Content="For some rad information"}}
 * ```
 *
 * {{core-tooltip Title="Hover me" Content="For some rad information"}}
 *
 * #### 2. Block form using contextual components
 * ```handlebars
 * {{#core-tooltip as |components|}}
 *   {{#components.title}}Hover me{{/components.title}}
 *   {{#components.content}}For some rad information{{/components.content}}
 * {{/core-tooltip}}
 * ```
 *
 * {{#core-tooltip as |components|}}
 *   {{#components.title}}Hover me{{/components.title}}
 *   {{#components.content}}For some rad information{{/components.content}}
 * {{/core-tooltip}}
 *
 * #### 3. Combine the use of attrs and contextual components.
 * ```handlebars
 * {{#core-tooltip Title="Hover me" as |components|}}
 *   {{#components.content}}For some rad information{{/components.content}}
 * {{/core-tooltip}}
 * ```
 *
 * {{#core-tooltip as |components|}}
 *   {{#components.title}}Hover me{{/components.title}}
 *   {{#components.content}}For some rad information{{/components.content}}
 * {{/core-tooltip}}
 *
 * #### 4. Turn the title into a button with `buttonStyle` and pass a
 * `brand` to change the color of the button.
 * ```handlebars
 * {{core-tooltip buttonStyle=true brand="primary" Title="Hover me" Content="For some rad information"}}
 * ```
 *
 * {{core-tooltip buttonStyle=true brand="primary" Title="Hover me" Content="For some rad information"}}
 *
 * @class Component.CoreTooltip
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
  /**
   * Available hook that is called on hide of the tooltip
   * @property onHide
   * @type {function}
   */
  onHide: null,
  /**
   * Available hook that is called on show of the tooltip
   * @property onShow
   * @type {function}
   */
  onShow: null,

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Unique string used to handle setting up aria roles for A++ usability. This
   * identifier needs to be set as the `aria-describedby` attr of the tooltip
   * hover target and the `id` of the actual tooltip content
   * @property aria-describedby
   * @type {string}
   * @param elementId
   */
  'aria-describedby': Ember.computed('elementId', describedby),
  /**
   * State boolean for display of the tooltip content. Is toggled true/false to
   * handle show/hide. Updated in `_showContent` and `_hideContent`
   * @property hidden
   * @type {Boolean}
   * @default true
   */
  hidden: true,

  // Ember Props
  // ---------------------------------------------------------------------------

  /**
   * Core component class for targeting element when necessary
   * @property classNames
   * @type {Array}
   * @default ['core-tooltip']
   */
  classNames: ['core-tooltip'],
  /**
   * Tooltips should almost aways be inline spans.
   * @property tagName
   * @type {string}
   * @default span
   */
  tagName: 'span',

  // Methods
  // ---------------------------------------------------------------------------
  /**
   * Handle showing tooltip content
   * @method _showContent
   * @returns undefined
   */
  _showContent() {
    this.set('hidden', false);
    if (this.get('onShow')) { this.get('onShow')(); }
  },
  /**
   * Handle showing tooltip content
   * @method _hideContent
   * @returns undefined
   */
  _hideContent() {
    this.set('hidden', true);
    if (this.get('onHide')) { this.get('onHide')(); }
  },

  // Events
  // ---------------------------------------------------------------------------
  /**
   * Show content on mouse enter
   * @event mouseEnter
   */
  mouseEnter(evt) {
    this._showContent();
  },
  /**
   * Hide content on mouse leave
   * @event mouseLeave
   */
  mouseLeave(evt) {
    this._hideContent();
  },
  /**
   * Show content on focus
   * @event focusIn
   */
  focusIn() {
    this._showContent();
  },
  /**
   * Hide content on focusOut
   * @event focusOut
   */
  focusOut() {
    this._hideContent();
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{#if Title}}
      {{#core-tooltip/title
        aria-describedby=aria-describedby
        brand=brand
        link=(not buttonStyle)
        tagcategory=tagcategory
        tagaction=tagaction
        taglabel=taglabel
        tagvalue=tagvalue
        tagcd=tagcd}}
        {{{Title}}}
      {{/core-tooltip/title}}
    {{/if}}

    {{yield (hash
      title=(component 'core-tooltip/title'
        aria-describedby=aria-describedby
        brand=brand
        link=(not buttonStyle)
        tagcategory=tagcategory
        tagaction=tagaction
        taglabel=taglabel
        tagvalue=tagvalue
        tagcd=tagcd)
      content=(component 'core-tooltip/content'
        aria-describedby=aria-describedby
        hidden=hidden)
    ) aria-describedby hidden}}

    {{#if Content}}
      {{#core-tooltip/content
        aria-describedby=aria-describedby
        hidden=hidden}}
        {{{Content}}}
      {{/core-tooltip/content}}
    {{/if}}
  `
});
