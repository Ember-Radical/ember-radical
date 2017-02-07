import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';
import {later} from 'ember-runloop';
import $ from 'jquery';

// Utils
import { bindOnEscape, unbindOnEscape } from '../utils/listeners';

/**
 * ### Ember Radical DDAU Modal
 * Triggering modal open and close is handled using a data point to represent
 * the open state instead of an event listener on body filtering for some
 * identifier. This state should be handled by a data level service (could
 * also be a route or component).
 *
 * #### Usage:
 *
 * **With Basic Header:**
 * ```handlebars
 * {{#rad-modal
 *   open=someService.modalActive
 *   Header='This is the modal title'
 *   closeModal=(action 'closeModal' target=someService)}}
 *   <p>This is a totally rad modal!</p>
 * {{/rad-modal}}
 * ```
 *
 * **With Full/Custom Header:**
 * ```handlebars
 * {{#rad-modal
 *   open=someService.modalActive
 *   closeModal=(action "closeModal" target=someService)
 *   as |components|}}
 *   {{! Modal Header Subcomponent}}
 *   {{#components.header}}
 *     <h3>{{rad-svg svgId="sparkles"}} It Just Works™</h3>
 *   {{/components.header}}
 *   <p>I will be yielded inside of the modal body! Don't worry about adding
 *   padding to me, the modal has 30px padding all around.</p>
 * {{/rad-modal}}
 * ```
 *
 * **With No Header:**
 * Even if you don't want or need a header for your modal, _some form of header
 * text is required for 508 compliance_.
 *
 * ```handlebars
 * {{#rad-modal
 *   open=someService.modalActive
 *   ariaHeader='This is the puppy modal'
 *   closeModal=(action "closeModal" target=someService)}}
 *   <p>Imagine several cute puppy images and/or gifs here.</p>
 * {{/components.header}}
 * ```
 *
 * Note that `open`, `closeAction` and some form of a header are all required.
 *
 * #### Data Down
 * A boolean data point `open` must be passed into this component. This
 * data point represents the state of the modal and must be controlled by some
 * parent context (a Service, Controller or some parent component). DO NOT
 * MUTATE THIS DATA POINT IN THIS COMPONENT!
 *
 * When following DDAU this component will automagically rerender whenever the
 * `open` state of your component changes because it is **passed down** as
 * data. This removes the need for observers and event listeners (🙌 🙌 🙌) and
 * allows us to programmatically open and close the modal based purely on user
 * actions && application data/state.
 *
 * When `open` is truthy, the template will add a class `active` to the modal's
 * `<div>`s. This class toggles visibility and fades in the modal using a CSS
 * transition. (The `aria-hidden` attribute is used to control actual visbility
 * for all users/browsers and screen readers; `active` is purely presentational)
 *
 * #### Actions Up
 * Provide a closure action to the component as `closeModal`. This action will
 * be automagically attached to the gray modal background. Whenever a user
 * clicks the background, that action will relay the event to your parent
 * context. You can then reliably handle whatever closing logic needs to happen
 * and mutate your modal's `open` state on the parent context. This update will
 * flow back down into the component and make the necessary changes to "close"
 * the modal.
 *
 * #### Yielded Data
 * This component will yield:
 *
 * - A `components` hash which you can use to directly invoke the `header`
 *   subcomponent for situations where you need more than just text in your
 *   modal header. You can reference in your template as:
 *   `{{#components.header}}Some text and elements here{{/components.header}}`
 * - The `open` state of the modal, in case something in your header or modal
 *   body needs access to this state.
 *
 * #### Configurations
 * The component can be configured with the following flags:
 *
 * - `animateFrom`: If you would like the modal to animate in, use this property
 *   to set up an animation direction; "left", "right", "top", or "bottom".
 * - `autoFocus`: set to false to prevent the modal from refocusing
 *   the last element that was active in the DOM before the modal as opened.
 * - `closeButton`: Controls display of the header close button. Set to false to
 *   hide close button.
 * - `removeFromDomOnClose`: While you normally may wish to control whether
 *   your modal is being rendered at all via external logic, there are cases
 *   where you may be using the modal (e.g. in a wizard-like user flow) where
 *   you may want to have the modal destroy itself when it closes. Use this
 *   property if you want this kind of behavior.
 * - `size`: Default size of the modal is 60% of browser width on desktop. You
 *   may optionally choose `small` (30%), `medium` (45%), or `full` (100%).
 *   Modals are always full-width on small screen sizes.
 *
 * #### Non-Dismissable Modal
 * Create a modal that cannot be dismissed on click of the modal background by
 * not passing a `closeModal` closure _(Modal components are set up with a no op
 * `closeModal` action by default)_. Note that although not required, it's
 * suggested to pass `closeButton=false` to suppress display of the close button
 * because it won't do anything.
 *
 * ##### TODO:
 * - Explore/Document how to handle having multiple modals of the same type? One
 *   modal with dynamic content? or multiple modals with modal ids?
 * - Handle returning focus to the modal when a user tabs focus outside of the
 *   modal. Start with Bootstrap modals (which accomplish this). Can it be done
 *   without event listeners?
 *
 * @class Component.RadModal
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * If a modal should not have a visible header, pass a label for the modal
   * using this property. It will be bound to a hidden div with the correct
   * aria attrs so that we're rocking A+ accessibility all day every day.
   * @property ariaHeader
   * @type {string}
   * @default ''
   */
  ariaHeader: '',
  /**
   * Unless autoFocus is toggled to false, the modal will store a
   * reference to whatever element is currently active in the dom and return
   * focus to that element when the modal closes.
   * @property autoFocus
   * @type {Boolean}
   * @default false
   */
  autoFocus: false,
  /**
   * CSS transitions the modal on open. Accepts 'left', 'right', 'bottom', 'top'.
   * @property animateFrom
   * @type {String}
   */
  animateFrom: '',
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
   * Flag used to handle showing and hiding the modal. This property
   * should be passed in by a component/service+controller that controls the
   * state of the modal.
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: false,
  /**
   * Determines if the modal should be removed from the DOM when it is closed.
   * This is to help performance on the beefier modals.
   * @property removeFromDomOnClose
   * @default false
   * @type {Boolean}
   */
  removeFromDomOnClose: false,
  /**
   * The size of the modal to display. The default size caps the width of the
   * modal at 60% of the browser's viewport. Additional sizes available are:
   *
   * - `"small"` (30% on large, 45% on medium)
   * - `"medium"` (45% on large, 60% on medium)
   * - `"full"` (100% on large and medium)
   *
   * Modals will always render at 100% on mobile/small screen view.
   * @property size
   * @type {string}
   * @default ''
   */
  size: '',
  /**
   * Pass a string for simple text modal header. If the modal should have no
   * header, pass null to this property. This will ensure that `aria-labelledby`
   * is _not_ bound to the modal instance (because there is no header to label
   * the modal).
   * @property Header
   * @type {string}
   * @default ''
   */
  Header: '',
  /**
   * Pass a `(hash)` of tagging properties when you need to bind a tag fire to
   * close of the modal. Expects syntax:
   * `(hash category="Tag Category" action="Tag Action" label="Tag Label")`
   * @property tagclose
   * @type {Object}
   */
  tagClose: {
    category: null,
    action: null,
    label: null
  },

  // Closure Actions
  // ---------------------------------------------------------------------------
  /**
   * Closure action passed into the modal. Is event delegated to the modal
   * background for close on click (unless 'hideBackground' is true)
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
   * Determines if the modal is currently _active_, which means that the modal
   * has been opened/closed. Note that this is different from _visible_. Due to
   * transition time, a modal can be _active_ but not yet _visible_ to the user.
   * Seperate props are required for tracking active vs visible to allow the
   * css animations to trigger.
   * @property _active
   * @type {Boolean}
   * @default false
   */
  _active: false,
  /**
   * Private reference to the last focused element in the DOM before the modal
   * was opened. This is used to make the experience for keyboard users not
   * terrible.
   *
   * @property _lastFocusedElement
   * @type {Object}
   * @default undefined
   */
  _lastFocusedElement: undefined,
  /**
   * Determines if the modal should be rendered in the template. This is not
   * equivalent to `open`. In order for CSS transitions to work properly, the
   * modal must be rendered in the DOM when the class that applies the
   * transition is added to/removed from the modal.
   * @property _visible
   * @type {Boolean}
   * @default false
   */
  _visible: false,

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Handle modal cleanup here:
   *
   * - Unfreeze body
   * - Remove 'active' class from modal elements to hide them if still in DOM
   * - Return focus to last active element unless disabled (for better
   *   usability)
   *
   * @method _handleClose
   * @return {undefined}
   */
  _handleClose() {
    // Fire user hooks
    if (this.get('onHide')) { this.get('onHide')(); }

    // Remove body scroll freeze
    $('body').removeClass('fixed-body');

    // Remove active classes in case modal stays in DOM while it is closed
    this.set('_active', false);

    // Move focus back to last element (usually the button that opened the
    // modal) and clear out _lastFocusedElement to boy scout against any weird
    // bugs involving opening and closing modals multiple times
    if (this.get('autoFocus') && this.get('_lastFocusedElement')) {
      this.get('_lastFocusedElement').focus();
      this.set('_lastFocusedElement', undefined);
    }

    // Unbind escape listener
    unbindOnEscape(this.get('elementId'));

    // The modal isn't the quickest of components, and needs some more time
    // finish it's transition/animation.
    later(() => {
      // Don't run this on a dealy if the object is destoryed. This can
      // happen when the user transitions to another route or during tests
      if (!this.get('isDestroyed')) {
        this.set('_visible', false);
      }

      // Fire user hooks
      if (this.get('onHidden')) { this.get('onHidden')(); }
    }, 500);
  },
  /**
   * Handle modal open work here:
   *
   * * Freeze the body so that scrolling inside the modal doesn't jank up the
   *   screen
   * * Add 'active' class to modal elements, if the modal is already in DOM this
   *   will make it visible
   * * Set private reference to currently active DOM element so we can return
   *   focus to it when the modal closes (for usability)
   *
   * @method _handleOpen
   * @return {undefined}
   */
  _handleOpen() {
    // Fire user hooks
    if (this.get('onShow')) { this.get('onShow')(); }

    // Prevent body scroll while modal is open
    $('body').addClass('fixed-body');

    // Set the modal to be shown in the DOM first to allow for transitions
    // to work properly.
    this.set('_visible', true);

    // Set the current `activeElement` from the document to focus on close
    if (this.get('autoFocus')) {
      this.set('_lastFocusedElement', document.activeElement);
    }

    // Bind the keycommand `esc` to close modal
    bindOnEscape(this.get('elementId'), this.get('closeModal').bind(this));

    // Wait to add active to modal elements until next run loop. This is
    // required for when we wait to render the modal until it should be active
    // if we add the active class at this point, then the modal renders with
    // active class and so there is no *transition*
    later(() => {
      this.set('_active', true);

      // Focus the modal wrapper for usability
      // @TODO: A method to handle checking for an autoFocus element would be A++
      this.$('.rad-modal-wrapper').focus();

      // Fire user hooks
      if (this.get('onShown')) { this.get('onShown')(); }
    }, 15);
  },

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * Whenever this component receives attrs check if the `open` prop matches the
   * template status. If not, call the handlers for open/close
   *
   * @event didReceiveAttrs
   * @return {undefined}
   */
  didReceiveAttrs() {
    const background = this.$('.rad-modal-background');
    const hidden = background ? background.attr('aria-hidden') : null;

    if (this.get('open') && hidden === 'true') {
      this._handleOpen();
    } else if (!this.get('open') && hidden === 'false') {
      this._handleClose();
    }
  },
  /**
   * When modal is inserted into DOM, check if it should be open by default, if
   * so we need to call `_handleOpen` manually to open it.
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments);

    if (this.get('open')) {
      this._handleOpen();
    }

    if (DEVELOPMENT) {
      // In dev builds, check for a header element with the correct aria bindings
      // aria-labelledby is required for A++ Accessibility
      const elementId = this.get('elementId');
      const headerId = `#aria-labelledby-${elementId}`;
      // @TODO: Figure out how to make this check _reliably_ for modals that
      // have `removeFromDomOnClose` enabled
      if (!this.get('removeFromDomOnClose') && !$(headerId).is('header')) {
        console.image('https://media.giphy.com/media/6Bfnhb5jQqvny/giphy.gif', 2);
        throw new Error('{{rad-modal}}: You must specify a modal header or supply an `ariaHeader` string, ya dongus', headerId);
      }
    }
  },
  /**
   * willDestroyElement hook used to ensure that all of the closing logic that
   * needs to happen fires off.
   *
   * **NOTE:** This will make sure that the body doesn't get frozen in place if
   * your modal isn't cleaned up, but when you navigate back to whatever created
   * this modal it may still be open. If this is the case remember that the
   * open state of your modal is a data down property which needs to be cleaned
   * up on whatever parent context controls it.
   *
   * @event willDestroyElement
   * @return {undefined}
   */
  willDestroyElement() {
    this._handleClose();
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! Modal background is passed closeModal closure action for closing on click}}
    <div class='rad-modal-background{{if animateFrom ' animate-from'}}{{if _active ' active'}}'
      aria-hidden='{{not _visible}}'
      {{action closeModal}}
      data-firetag
      data-tagcategory={{tagClose.category}}
      data-tagaction={{tagClose.action}}
      data-taglabel={{tagClose.label}}
      data-test='rad-modal-background'>
    </div>

    {{#if (or _visible (not removeFromDomOnClose))}}
      {{! The actual modal div. { role, labelledby, hidden } => 508 compliance attrs  }}
      {{! Note that if passed Header is null, we do not bind aria-labelledby }}
      <div
        class='rad-modal-wrapper {{size}}{{if animateFrom (concat ' animate-' animateFrom)}}{{if _active ' active'}}'
        role='dialog'
        tabindex='-1'
        aria-labelledby='aria-labelledby-{{elementId}}'
        aria-hidden='{{not _visible}}'
        data-test='rad-modal-wrapper'>

        {{! If a Header is passed, handle setting one up }}
        {{#if Header}}
          {{#rad-modal/header
            closeButton=closeButton
            closeIcon=closeIcon
            closeModal=closeModal
            elementId=(concat 'aria-labelledby-' elementId)
            tagClose=tagClose}}
            <h2>{{{Header}}}</h2>
          {{/rad-modal/header}}
        {{/if}}

        {{#if ariaHeader}}
          {{!-- Render aria label for screen readers --}}
          <header id='aria-labelledby-{{elementId}}' class='aria-header'>{{ariaHeader}}</header>
          {{#if closeButton}}
            <div class='clearfix'>
              {{#rad-button
                link=true
                aria-label='close'
                classNames='close pull-right'
                click=closeModal
                tagcategory=tagClose.category
                tagaction=tagClose.action
                taglabel=tagClose.label
                data-test='rad-modal-close-button'}}
                {{rad-svg svgId=closeIcon}}
              {{/rad-button}}
            </div>
          {{/if}}
        {{/if}}

        {{! ----------------------------------------------------------------- }}
        {{! Yield a unique identifier from inside this template so that we can
        {{! reliably set this div's aria-labelledby and the id of a descriptive
        {{! element inside the modal to the same identifier. Also yield open
        {{! because who knows, we'll probably need it for something crazy
        {{! ----------------------------------------------------------------- }}
        {{yield
          (hash
            header=(component 'rad-modal/header'
              closeModal=closeModal
              elementId=(concat 'aria-labelledby-' elementId)
              closeButton=closeButton
              tagClose=tagClose
            )
            footer=(component 'rad-modal/footer')
          )
          open
        }}
      </div>
    {{/if}}
  `
});
