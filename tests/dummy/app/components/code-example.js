import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component } = Ember;

export default Component.extend({

  code: '',

  language: '',

  showCode: false,

  title: '',

  actions: {
    toggleCode() {
      this.toggleProperty('showCode');
    }
  },

  layout: hbs`
    {{#rad-card as |components|}}
      {{#components.title
        classNames='code-card-title'}}
        <span class="example-title">{{title}}</span>
        {{#rad-button
          brand='secondary'
          classNames='code-toggle-button'
          click=(action 'toggleCode')}}<b>&lt;/&gt;</b>{{/rad-button}}
      {{/components.title}}
      {{#components.body}}
        <div class="code-sample {{if showCode '' 'hidden'}}">
          {{highlight-code code=code language=language}}
        </div>
        <div class="rendered-sample">
          {{!-- {{code}} --}}
          {{! @TODO: get an auto-rendered version of the example, make it optional in case the functional version needs to differ from the example version }}
          {{yield}}
        </div>
      {{/components.body}}
    {{/rad-card}}
  `
});
