import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import hbs from 'htmlbars-inline-precompile'

/**
 * The `rad-button` component is used for all user interaction targets in Ember
 * Radical. The component handles a number of housekeeping tasks including:
 * - Outline suppression only on clicks
 * - Tag firing when enabled
 * - Aria and html attributes
 *
 * {{#rad-button}}Rad Button{{/rad-button}}
 *
 * Configuration | Type | Default | Description
 * --- | --- | --- | ---
 * `brand` | {'primary', 'secondary', 'info' etc. } | `null` | Adds classes for a styled button
 * `outline` | boolean | `false` | Adds outline button class. _(Requires a `brand` property.)_
 * `link` | boolean | `false` | Adds classes to make the button look and act like a link
 *
 * @class Component.RadButton
 * @constructor
 * @extends Ember.Component
 */

// Feature Assets
// ---------------------------------------------------------------------------
let taggingAssets = {}

if (TAGGING) {
  taggingAssets = {
    tagging: service(),

    /**
     * Internal method that handles firiing a tag with or without custom dimensions.
     * @method _fireTag
     * @return {undefined}
     */
    _fireTag() {
      const { tagcategory, tagaction, taglabel, tagvalue, tagcd } = this

      // Fire off that tag, pass along available props
      this.tagging.fireTag({
        tagcategory,
        tagaction,
        taglabel,
        tagvalue,
        tagcd,
      })

      // If we're only tagging once, null out the category to prevent additional fires
      if (this.tagonce) {
        this.set('tagcategory', null)
      }
    },
  }
}

export default Component.extend(taggingAssets, {
  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * Pass a brand to have `btn-${brand}` class applied
   * @property brand
   * @passed
   * @public
   * @type {?string}
   * @default null
   */
  brand: null,
  /**
   * Pass true to create a button that looks and behaves like a link. This is
   * useful for creating accessible interaction targets.
   * @property link
   * @passed
   * @public
   * @type {Boolean}
   * @default false
   */
  link: false,
  /**
   * Pass a {{c-l 'brand'}} along with `true` for `outline` to include outline style
   * classes.
   * @property outline
   * @type {boolean}
   * @default false
   */
  outline: false,
  /**
   * Tagging property. See `one-tag` for tagging documentation.
   * @property tagcategory
   * @passed
   * @public
   * @type {string}
   * @default ''
   */
  tagcategory: '',
  /**
   * Tagging property. See `one-tag` for tagging documentation.
   * @property tagaction
   * @passed
   * @public
   * @type {string}
   * @default ''
   */
  tagaction: '',
  /**
   * Tagging property. See `one-tag` for tagging documentation. Set to undefined
   * so the tagging service will properly correct an un-passed value.
   *
   * @property taglabel
   * @passed
   * @public
   * @type {string}
   * @default null
   */
  taglabel: null,
  /**
   * Tagging property. See `one-tag` for tagging documentation.
   * @property tagvalue
   * @passed
   * @public
   * @type {string}
   * @default ''
   */
  tagvalue: '',
  /**
   * Tagging property. See `one-tag` for tagging documentation.
   * @property tagcd
   * @passed
   * @public
   * @type {Object}
   * @default null
   */
  tagcd: null,
  /**
   * Tagging property. Handles firing a tag on hover when true.
   * @property taghover
   * @passed
   * @public
   * @type {Boolean}
   * @default false
   */
  taghover: false,
  /**
   * Tagging property. See `one-tag` for tagging documentation.
   * @property tagonce
   * @passed
   * @public
   * @type {Boolean}
   * @default false
   */
  tagonce: false,

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Generate color class using presence of {{c-l 'brand'}} and {{c-l 'outline'}}
   * flags.
   * @property brandClass
   * @type {string}
   * @param 'brand'
   * @param 'outline'
   */
  brandClass: computed('brand', 'outline', function() {
    if (this.outline) {
      return this.brand ? `btn-outline-${this.brand}` : null
    } else {
      return this.brand ? `btn-${this.brand}` : null
    }
  }),

  // Ember Props
  // ---------------------------------------------------------------------------

  /**
   * ALLLLLLLLLLL the attributes you might need.
   * NOTE: `role` should not be bound here. You can set the role of a button
   * by passing an [ariaRole](http://emberjs.com/api/classes/Ember.Component.html#property_ariaRole) prop.
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: [
    'aria-controls',
    'aria-describedby',
    'aria-expanded',
    'aria-hidden',
    'aria-label',
    'aria-labelledby',
    'data-test',
    'disabled',
    'type',
  ],
  /**
   * Bind standard rad classname for component: `rad-button`
   * @property classNames
   * @type {Array}
   */
  classNames: ['rad-button', 'btn'],
  /**
   * Handle binding brand and link related css class names
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['brandClass', 'link:btn-link', 'link:btn-unstyled'],
  /**
   * Button DOM element
   * @property tagName
   * @type {string}
   * @default 'button'
   */
  tagName: 'button',
  /**
   * Include type button for usability.
   * @property type
   * @type {string}
   * @default 'button'
   */
  type: 'button',

  // Events
  // ---------------------------------------------------------------------------
  didInsertElement() {
    if (TAGGING) {
      const { element, _fireTag, taghover } = this
      if (taghover) {
        element.addEventListener('mouseenter', _fireTag.bind(this))
      } else element.addEventListener('click', _fireTag.bind(this))
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`,
})
