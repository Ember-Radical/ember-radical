import Component from 'ember-component';

/**
 * Library component used within contextual components to create elements with
 * assigned classes.
 *
 * Class name should be assigned through {{c-l '_classNames'}}.
 * @class Component.RadClassnamed
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @property attributeBindings
   * @type {Array}
   * @default ['data-test']
   */
  attributeBindings: ['data-test'],
  /**
   * Internally assigned classNames by contextual props cannot be passed through
   * `classNames` prop or they will be overridden by any consumer that also passes
   * a `classNames`. Binding the private `_classNames` allows us to assign classes
   * through contexutal components.
   * @property classNameBindings
   * @type {Array}
   * @default ['_classNames']
   */
  classNameBindings: ['_classNames']
});
