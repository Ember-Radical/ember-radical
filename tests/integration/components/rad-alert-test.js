import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, click, find, findAll } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad alert', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{#rad-alert brand='primary'}}Check-it-out{{/rad-alert}}`)

    assert.ok(findAll('.rad-alert').length, 'renders root element')
    assert.ok(
      find('.rad-alert').classList.contains('alert-primary'),
      'renders brand class',
    )
    assert.ok(findAll('.close').length, 'renders the close button')
    assert.ok(
      find('.rad-alert').textContent.indexOf('Check-it-out') > 0,
      'renders alert content',
    )
  })

  test('can disable dismiss button', async function(assert) {
    await render(
      hbs`{{#rad-alert brand='success' dismissible=false}}Check-it-out{{/rad-alert}}`,
    )

    assert.ok(findAll('.rad-alert').length, 'renders root element')
    assert.ok(
      find('.rad-alert').classList.contains('alert-success'),
      'renders brand class',
    )
    assert.notOk(findAll('.close').length, 'does not render the close button')
    assert.ok(
      find('.rad-alert').textContent.indexOf('Check-it-out') > 0,
      'renders alert content',
    )
  })

  test('dismissing alert fires onDeactivate action', async function(assert) {
    assert.expect(1)

    this.set('handleDismiss', () => {
      assert.ok(true, 'onDismiss action is fired')
    })

    await render(
      hbs`{{#rad-alert brand='primary' onDeactivate=(action handleDismiss)}}Check-it-out{{/rad-alert}}`,
    )

    await click('button.close')
  })
})
