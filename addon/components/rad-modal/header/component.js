import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';
import computed from 'ember-computed';

/**
 * Used to handle rendering a header for an Ember Radical Modal. Should always
 * be accessed via the `Header` prop or `components` hash of `rad-modal`.
 *
 * ### Accessibility
 *
 * The Core Modal Header always receives an `aria-labelledby` attribute from
 * its parent modal, which it uses to set up as its own `elementId` to ensure
 * that screen readers are able to correctly associate the modal header with the
 * modal that it labels. Some form of a Header is always required for instances
 * of Core Modal to ensure that they are properly labelled.
 *
 * #### Configurations
 * - `brand`: When accessing the header subcomponent in block form, you can use
 *   this property to access and apply standard branding classes to the header,
 *   e.g. `"primary"` or `"secondary"`.
 *
 * @class Component.RadModal.Header
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
  // Closure Actions
  // ---------------------------------------------------------------------------
  /**
   * Action closure passed in to modal. Is mounted to the modal background for
   * close on click (unless 'hideBackground' is true)
   * @property closeModal
   * @type {function}
   * @default () => {}
   */
  closeModal: () => {},
  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * Property bound to component id for usability
   * @property aria-labelledby
   * @type {string}
   */
  'aria-labelledby': null,
  /**
   * If you want that header to have some pop
   * @property brand
   * @type {string}
   */
  brand: null,
  /**
   * Pass a `(hash)` of tagging properties when you need to bind a tag fire to
   * close of the modal. Expects syntax:
   *
   * `(hash category="Tag Category" action="Tag Action" label="Tag Label")`
   * @property tagclose
   * @type {[type]}
   */
  tagClose: {
    category: null,
    action: null,
    label: null
  },

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Computed css class bound to component. Handled by component to allow for
   * flexibility in future updates to branding class names
   * @property brandClass
   * @type {string}
   * @param 'brand'
   */
  brandClass: computed('brand', function() {
    return this.get('brand') ? `${this.get('brand')}-bg`: null;
  }),
  /**
   * Handle binding brand and basic related css class names
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['brandClass', 'brandClass:branded'],
  /**
   * Bind class names
   * @property classNames
   * @type {Array}
   */
  classNames: ['modal-header'],
  /**
   * Wrapping `<header>`
   * @property tagName
   * @type {string}
   */
  tagName: 'header',

  // Hooks
  // ---------------------------------------------------------------------------
  /**
   * Set id of component to aria-labelledby on init for usability
   * @event init
   */
  init() {
    this._super(...arguments);
    if (!this.get('aria-labelledby')) { return console.warn('Modal header requires aria-labelledby'); }

    // This id matches the `aria-labelledby` of the rad-modal instance.
    this.set('elementId', this.get('aria-labelledby'));
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! Main content for modal header, yielded}}
    {{yield}}

    {{! X to close modal included and action mounted for your convenience. }}
    {{#unless hideX}}
      {{#rad-button
        link=true
        aria-label="close"
        classNames="close"
        click=(action closeModal)
        tagcategory=tagClose.category
        tagaction=tagClose.action
        taglabel=tagClose.label
        data-test='rad-modal-close-button'}}
        {{rad-svg svgId="x" classNames=(concat 'modal-svg ' (if brand brand))}}
      {{/rad-button}}
    {{/unless}}
  `
});
