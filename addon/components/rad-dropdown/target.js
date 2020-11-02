import { computed } from '@ember/object'
import hbs from 'htmlbars-inline-precompile'

import RadButton from '../rad-button'
import { expanded } from '../../utils/arias'

/**
 * Core dropdown target component
 *
 * @class Component.RadDropdown.Target
 * @constructor
 * @extends Component.RadButton
 */
export default RadButton.extend({
  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Ember fun: Attribute bindings require a value to bind on.
   * @property aria-haspopup
   * @type string
   */
  'aria-haspopup': 'true',
  /**
   * String representation of boolean state for `aria` attrs.
   * @property expanded
   * @type {string}
   * @param hidden
   */
  expanded: computed('hidden', expanded),
  /**
   * `ariaLabelledBy` accounts for which header is the label for the dropdown
   * @property ariaLabelledBy
   * @return {string} String of id name for use with `aria-labelledby` binding
   */
  ariaLabelledBy: '',

  // Ember Props
  // ---------------------------------------------------------------------------
  /**
   * Bind `aria-haspopup`, `aria-expanded`, and `aria-lablelledby` for A+ usability;
   * Auto-binds `data-test` attribute
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['aria-haspopup', 'data-test', 'expanded:aria-expanded', 'ariaLabelledBy:aria-labelledby',],
  /**
   * Bind `dropdown-target`
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-target'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`,
})
