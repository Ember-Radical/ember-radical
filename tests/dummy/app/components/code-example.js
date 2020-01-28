import { htmlSafe } from '@ember/string'
import Component from '@ember/component'
import { getOwner } from '@ember/application'
import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'
const { HTMLBars } = Ember

export default Component.extend({
  // Passed Props
  // ---------------------------------------------------------------------------

  autoRender: true,

  code: '',

  language: '',

  title: '',

  // Props
  // ---------------------------------------------------------------------------

  classNames: ['code-example'],

  codeBlockHeight: 0,

  codeBlockHeightCSS: '',

  renderPartialName: '',

  showCode: false,

  // Methods
  // ---------------------------------------------------------------------------

  _calculateCodeBlockHeight() {
    // let codeBlockHeight = this.$(this.$('.code-block pre')[0]).outerHeight()
    // this.set('codeBlockHeight', codeBlockHeight + 50)
  },

  _checkActionRefs(templateString) {
    if (!templateString) {
      return
    }

    const firstFilter = /action\s"(\w*?)"/gim
    const secondFilter = /\'(.*?)\'/gi
    let matchedActions = templateString.match(firstFilter)

    if (!matchedActions) {
      return
    }

    let actionNames = matchedActions.map(item => {
      return item
        .replace(/\"/g, "'")
        .match(secondFilter)[0]
        .replace(/\'/g, '')
    })

    // Loop through the list of actions and set up no-ops on the local context
    // so that the test app doesn't explode
    actionNames.forEach(action => {
      if (!this.get(`actions.${action}`)) {
        this.set(`actions.${action}`, function() {})
        console.log(`Setting up a no-op for action name of ${action}`) //:brule:
      }
    })
  },

  _renderCode(templateString) {
    try {
      let uniqueId = `${this.get('elementId')}-render-result`

      // Ensure non-existant passed in actions don't cause the app to explode
      this._checkActionRefs(templateString)

      // Compile the string into a template and register it on the container
      getOwner(this).register(
        `template:partials/${uniqueId}`,
        HTMLBars.compile(templateString),
      )
      // Update the reference of the preview's partialName to match the newly generated partial
      this.set('renderPartialName', `partials/${uniqueId}`)
    } catch (ex) {
      this.set('renderPartialName', '')
      console.warn(ex)
    }
  },

  // Hooks
  // ---------------------------------------------------------------------------

  didInsertElement() {
    if (this.get('autoRender')) {
      this._renderCode(this.get('code'))
    }
    this._calculateCodeBlockHeight()
  },

  init() {
    this._super(...arguments)
    this.set('codeBlockHeightCSS', htmlSafe('max-height: 0px;'))
  },

  willDestroyElement() {
    if (!this.get('isDestroyed') && this.get('autoRender')) {
      getOwner(this).unregister(`template:${this.get('renderPartialName')}`)
    }
  },

  // Actions
  // ---------------------------------------------------------------------------

  actions: {
    // available as a regular syntax quoted action example
    exampleAction() {
      console.info('Example action called')
    },
    toggleCode() {
      this.toggleProperty('showCode')
      let heightValue = this.get('showCode') ? this.get('codeBlockHeight') : 0
      let heightCSS = htmlSafe(`max-height: ${heightValue}px;`)
      this.set('codeBlockHeightCSS', heightCSS)
    },
  },

  // Layout
  // ---------------------------------------------------------------------------

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
        <div class="code-block{{if showCode '' ' hidden'}}" style={{codeBlockHeightCSS}}>
          {{highlight-code code=code language=language}}
        </div>
        <div class="rendered-example">
          {{#if autoRender}}
            {{partial renderPartialName}}
          {{/if}}
          {{yield}}
        </div>
      {{/components.body}}
    {{/rad-card}}
  `,
})
