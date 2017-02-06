import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';
import computed from 'ember-computed';

/**
 * Used to handle rendering a header for an Ember Radical Modal. Should always
 * be accessed via the `Header` prop or `components` hash of `rad-modal`.
 *
 * ### Accessibility
 *
 * This component should only be used as a contextual component within a
 * `core-modal` instance. The parent `core-modal` handles setting the `elementId`
 * of this component to match an `aria-labelledby` on the parent modal.
 * This ensures that screen readers are able to correctly associate the modal
 * header with the modal that it labels. Some form of a Header is always
 * required for instances of Core Modal to ensure that they are properly
 * labelled.
 *
 * #### Configurations
 * - `brand`: When accessing the header subcomponent in block form, you can use
 *   this property to access and apply standard branding classes to the header,
 *   e.g. `"primary"` or `"secondary"` .
 * - `closeButton`: Controls display of the header close button. Set to false to
 *   hide close button.
 * - `tagClose`: Pass an object of tagging data to have a tag event fired on
 *   click of header close button
 *
 * @class Component.RadModal.Header
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * The elementId of this component must be set to match the `aria-labelledby`
   * of the parent component. This is handled through the contextual component
   * setup of `core-modal`
   * @property elementId
   * @type {string}
   * @passed Component.RadModal
   * @required
   */
  /**
   * If you want that header to have some pop
   * @property brand
   * @type {?string}
   * @passed
   * @optional
   * @default null
   */
  brand: null,
  /**
   * Controls display of the modal header close button. Is defaulted to true and
   * can be set to false in order to suppress the header close button.
   * @property closeButton
   * @type {!Boolean}
   * @passed
   * @optional
   * @default true
   */
  closeButton: true,
  /**
   * Controls the SVG Id of the close button.
   * @property closeIcon
   * @type {string}
   * @passed
   * @optional
   * @default 'close'
   */
  closeIcon: 'close',
  /**
   * Pass a `(hash)` of tagging properties when you need to bind a tag fire to
   * close of the modal. Expects syntax:
   *
   * `(hash category="Tag Category" action="Tag Action" label="Tag Label")`
   * @property tagclose
   * @type {Object}
   * @passed
   * @optional
   * @default null
   */
  tagClose: null,

  // Closure Actions
  // ---------------------------------------------------------------------------
  /**
   * Closure action bound to header close button.
   * @property closeModal
   * @type {function}
   * @passed
   * @optional
   * @closure
   */
  closeModal: () => {},

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Computed css class bound to component. Handled by component to allow for
   * flexibility in future updates to branding class names
   * @property brandClass
   * @type {string}
   * @param {string} brand
   */
  brandClass: computed('brand', function() {
    return this.get('brand') ? `${this.get('brand')}-bg`: null;
  }),
  /**
   * @property classNameBindings
   * @type {Array}
   * @default ['brandClass', 'brandClass:branded']
   */
  classNameBindings: ['brandClass', 'brandClass:branded'],
  /**
   * @property classNames
   * @type {Array}
   * @default ['modal-header']
   */
  classNames: ['modal-header'],
  /**
   * @property tagName
   * @type {string}
   * @default 'header'
   */
  tagName: 'header',

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! Main content for modal header, yielded }}
    {{! This div has flex-grow 1 to take up the entire header except the close button }}
    <div class='header-content'>
      {{yield}}
    </div>

    {{! X to close modal included and action mounted for your convenience. }}
    {{#if closeButton}}
      {{! This wrapping div lets flexbox do it's magic with width }}
      <div class='header-close-wrapper'>
        {{#rad-button
          link=true
          aria-label='close'
          classNames='close'
          click=(action closeModal)
          tagcategory=tagClose.category
          tagaction=tagClose.action
          taglabel=tagClose.label
          data-test='rad-modal-close-button'}}
          {{rad-svg svgId=closeIcon classNames=(concat 'modal-svg ' (if brand brand))}}
        {{/rad-button}}
      </div>
    {{/if}}
  `
});
