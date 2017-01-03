import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

import CoreButton from '../../core-button/component';
import { expanded } from '../../../utils/arias';

/**
 * Core dropdown target component
 *
 * @class Component.CoreDropdown.Target
 * @constructor
 * @extends Component.CoreButton
 */
export default CoreButton.extend({
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

  // Ember Props
  // ---------------------------------------------------------------------------
  /**
   * Bind `aria-haspopup` and `aria-expanded` for A+ usability
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['aria-haspopup', 'expanded:aria-expanded'],
  /**
   * Bind `dropdown-target`
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-target'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});
