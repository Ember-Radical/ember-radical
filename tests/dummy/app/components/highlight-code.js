/* global Prism */
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, computed } = Ember;

export default Component.extend({

  // Passed props
  // ---------------------------------------------------------------------------

  code: '',

  language: '',

  // Computed Props
  // ---------------------------------------------------------------------------

  languageClass: computed('language', function() {
    return `language-${this.get('language')}`;
  }),

  // Props
  // ---------------------------------------------------------------------------

  classNames: ['highlight-code'],
  classNameBindings: ['languageClass'],
  tagName: 'pre',

  // Hooks
  // ---------------------------------------------------------------------------

  didInsertElement() {
    Prism.highlightElement(this.get('element'));
  },

  // Layout
  // ---------------------------------------------------------------------------

  layout: hbs`{{code}}`
});
