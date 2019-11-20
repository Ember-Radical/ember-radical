import Service from '@ember/service'
import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import {
  render,
  find,
  findAll,
  triggerEvent,
  click
} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad button', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{#rad-button}}Default button{{/rad-button}}`)

    assert.equal(
      find('*').textContent.trim(),
      'Default button',
      'component renders block form correctly',
    )
    assert.equal(findAll('button').length, 1, 'component is a button element')
    assert.ok(
      find('button').classList.contains('btn'),
      'component always bind class btn',
    )
    assert.ok(
      find('button').classList.contains('rad-button'),
      'component renders addon class name',
    )
  })

  test('it renders brand classes', async function(assert) {
    await render(hbs`{{#rad-button brand="success"}}Default button{{/rad-button}}`)
    assert.ok(
      find('button').classList.contains('btn-success'),
      'the component binds branding class',
    )
  })

  test('it renders outline classes', async function(assert) {
    await render(
      hbs`{{#rad-button brand="success" outline=true}}Default button{{/rad-button}}`,
    )
    assert.ok(
      find('button').classList.contains('btn-outline-success'),
      'the component binds outline class',
    )
    assert.notOk(
      find('button').classList.contains('btn-success'),
      'the component binds ONLY outline class',
    )
  })

  test('it uses prop link to output link class', async function(assert) {
    // Not configured default link=false
    await render(hbs`{{#rad-button}}Default button{{/rad-button}}`)
    assert.notOk(
      find('button').classList.contains('btn-link'),
      'component does not render btn-link by default',
    )

    // link = false
    await render(hbs`{{#rad-button link=false}}Default button{{/rad-button}}`)
    assert.notOk(
      find('button').classList.contains('btn-link'),
      'component does not render btn-link when link=false',
    )

    // explicit link = true
    await render(hbs`{{#rad-button link=true}}Default button{{/rad-button}}`)
    assert.ok(
      find('button').classList.contains('btn-link'),
      'component renders btn-link class when link=true',
    )
  })

  test('it binds passed attributes', async function(assert) {
    await render(hbs`
      {{#rad-button
        aria-describedby='describes'}}
        Button
      {{/rad-button}}`)

    assert.equal(
      find('button').getAttribute('aria-describedby'),
      'describes',
      'component binds aria-describedby',
    )
  })

  test('it calls the tagging service on click', async function(assert) {
    const taggingStub = Service.extend({
      fireTag({ tagcategory, tagaction, taglabel }) {
        assert.equal(
          tagcategory,
          'Category',
          'category is passed to tagging on click',
        )
        assert.equal(tagaction, 'Action', 'action is passed to tagging on click')
        assert.equal(taglabel, 'Label', 'label is passed to tagging on click')
      },
    })

    // Only one tag should be fired, if more are fired it's a bug
    assert.expect(3)

    this.owner.register('service:tagging', taggingStub)
    this.tagging = this.owner.lookup('service:tagging')
    this.set('tagcategory', 'Category')
    await render(hbs`
      {{#rad-button
        tagcategory=tagcategory
        tagaction="Action"
        taglabel="Label"}}
        Tagged Button
      {{/rad-button}}`)
    await click('button')
    // Test tagcategory (The button should only fire a tag if there is a tagcategory present)
    // ---------------------------------------------------------------------------
    this.set('tagcategory', '')
    await click('button')
  })

  test('it calls the tagging service on hover if specified', async function(assert) {
    const taggingStub = Service.extend({
      fireTag({ tagcategory, tagaction, taglabel }) {
        assert.equal(
          tagcategory,
          'Category',
          'category is passed to tagging on click',
        )
        assert.equal(tagaction, 'Action', 'action is passed to tagging on click')
        assert.equal(taglabel, 'Label', 'label is passed to tagging on click')
      },
    })

    // Only one tag should be fired, if more are fired it's a bug
    assert.expect(3)

    this.owner.register('service:tagging', taggingStub)
    this.tagging = this.owner.lookup('service:tagging')
    this.set('tagcategory', 'Category')

    await render(hbs`
      {{#rad-button
        taghover=true
        tagcategory=tagcategory
        tagaction="Action"
        taglabel="Label"}}
        Tagged Button
      {{/rad-button}}`)
    await triggerEvent('button', 'mouseover')

    // Test tagcategory (The button should only fire a tag if there is a tagcategory present)
    // ---------------------------------------------------------------------------
    this.set('tagcategory', '')
    await triggerEvent('button', 'mouseover')
  })
})
