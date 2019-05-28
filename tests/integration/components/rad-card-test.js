import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, find, findAll } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad card', function(hooks) {
  setupRenderingTest(hooks)

  // #1 Basic Render Test
  // ---------------------------------------------------------------------------

  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-card as |components|}}
        {{#components.title}}Card title{{/components.title}}
        {{#components.body}}Card body{{/components.body}}
        {{#components.footer}}Card body{{/components.footer}}
      {{/rad-card}}
    `)

    assert.ok(findAll('.rad-card').length, 'renders root element')
    assert.ok(
      find('.rad-card').classList.contains('card-default'),
      'renders default brand class',
    )
    assert.ok(findAll('.card-title').length, 'renders title element')
    assert.ok(findAll('.card-body').length, 'renders body element')
    assert.ok(findAll('.card-footer').length, 'renders footer element')
  })

  // #2 Brand Class Test
  // ---------------------------------------------------------------------------

  test('it renders brand class', async function(assert) {
    await render(hbs`
      {{#rad-card brand="primary" as |components|}}
        {{#components.body}}Card body{{/components.body}}
      {{/rad-card}}
    `)

    assert.ok(
      find('.rad-card').classList.contains('card-primary'),
      'renders primary brand class',
    )
  })
})
