import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';
import computed from 'ember-computed';

import { describedby } from '../utils/arias';

/**
 * A fully accessible tooltip component. The `rad-tooltip` component can be
 * used by itself or in block form as a parent of the title/content
 * subcomponents which represent the title/trigger text to show the
 * tooltip and the content to be revealed within the tooltip, respectively.
 *
 * ### Usage
 *
 * #### 1. Simple invocation
 * ```glimmer
 * {{rad-tooltip Title="Hover me" Content="For some rad information that is really really long"}}
 * ```
 *
 * #### 2. Block form using contextual components
 * ```glimmer
 * {{#rad-tooltip as |components|}}
 *   {{#components.title}}Hover me{{/components.title}}
 *   {{#components.content}}
 *     {{rad-svg svgId='close'}} For some really rad information!
 *   {{/components.content}}
 * {{/rad-tooltip}}
 * ```
 *
 * #### 3. Combine the use of attrs and contextual components.
 * ```glimmer
 * {{#rad-tooltip Title="Hover me" as |components|}}
 *   {{#components.content}}For some rad information{{/components.content}}
 * {{/rad-tooltip}}
 * ```
 *
 * #### 4. Turn the title into a button with `buttonStyle` and pass a
 * `brand` to change the color of the button.
 * ```glimmer
 * {{rad-tooltip buttonStyle=true brand="primary" Title="Hover me" Content="For some rad information"}}
 * ```
 *
 * @class Component.RadTooltip
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

  // Contextual Component Specifications
  // ---------------------------------------------------------------------------

  /**
   * @property contentComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-tooltip/content'
   */
  contentComponent: 'rad-tooltip/content',
  /**
   * @property titleComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-tooltip/title'
   */
  titleComponent: 'rad-tooltip/title',

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
  'aria-describedby': computed('elementId', describedby),
  /**
   * @property classNameBindings
   * @type {Array}
   * @default ['hidden::active']
   */
  classNameBindings: ['hidden::active'],
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
   * @default ['rad-tooltip']
   */
  classNames: ['rad-tooltip'],
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
   * @return undefined
   */
  _showContent() {
    this.set('hidden', false);
    if (this.get('onShow')) { this.get('onShow')(); }
  },
  /**
   * Handle showing tooltip content
   * @method _hideContent
   * @return undefined
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
      {{#rad-tooltip/title
        aria-describedby=aria-describedby
        brand=brand
        link=(not buttonStyle)
        tagcategory=tagcategory
        tagaction=tagaction
        taglabel=taglabel
        tagvalue=tagvalue
        tagcd=tagcd}}
        {{{Title}}}
      {{/rad-tooltip/title}}
    {{/if}}

    {{yield (hash
      title=(component titleComponent
        aria-describedby=aria-describedby
        brand=brand
        link=(not buttonStyle)
        tagcategory=tagcategory
        tagaction=tagaction
        taglabel=taglabel
        tagvalue=tagvalue
        tagcd=tagcd)
      content=(component contentComponent
        aria-describedby=aria-describedby
        hidden=hidden)
    ) aria-describedby hidden}}

    {{#if Content}}
      {{#rad-tooltip/content
        aria-describedby=aria-describedby
        hidden=hidden}}
        {{{Content}}}
      {{/rad-tooltip/content}}
    {{/if}}
  `
});
