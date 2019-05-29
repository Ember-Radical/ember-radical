import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, click, find } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad state', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{#rad-state as |state stateActions|}}{{/rad-state}}`)

    assert.equal(
      find('*').textContent.trim(),
      '',
      'Component renders block form correctly',
    )
  })

  test('it can be used as a state tracker', async function(assert) {
    await render(hbs`
      {{#rad-state as |state stateActions|}}
        {{#rad-button click=(action stateActions.setTrue) id="open"}}Open{{/rad-button}}
        {{#rad-button click=(action stateActions.setFalse) id="close"}}Close{{/rad-button}}

        <div aria-hidden={{if state 'false' 'true'}} id="secrets">SECRET CONTENT</div>
      {{/rad-state}}
    `)

    assert.equal(
      getComputedStyle(find('#secrets')).display,
      'none',
      'active state is false by default, so things can start hidden',
    )

    await click('#open') // Call the `open` action

    assert.equal(
      getComputedStyle(find('#secrets')).display,
      'block',
      'active state is true after open action is called',
    )

    await click('#close') // Call the `close` action

    assert.equal(
      getComputedStyle(find('#secrets')).display,
      'none',
      'active state is false after close action is called',
    )
  })

  test('it can be used as a state toggler', async function(assert) {
    await render(hbs`
      {{#rad-state as |state stateActions|}}
        {{#rad-button click=(action stateActions.toggleState) id="toggle"}}Toggle{{/rad-button}}
        <div aria-hidden={{if state 'false' 'true'}} id="secrets">SECRET CONTENT</div>
      {{/rad-state}}
    `)

    assert.equal(
      getComputedStyle(find('#secrets')).display,
      'none',
      'active state is false by default, so things can start hidden',
    )

    await click('#toggle') // Call the `open` action

    assert.equal(
      getComputedStyle(find('#secrets')).display,
      'block',
      'active state is true after open action is called',
    )

    await click('#toggle') // Call the `close` action

    assert.equal(
      getComputedStyle(find('#secrets')).display,
      'none',
      'active state is false after close action is called',
    )
  })
})
