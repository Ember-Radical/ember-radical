import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import {
  render,
  find,
  findAll,
  triggerEvent
} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad popover', function(hooks) {
  setupRenderingTest(hooks)

  // #1 Basic render test
  // ---------------------------------------------------------------------------
  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-popover data-test="render-test" as |components|}}
        {{#components.target}}Render test target{{/components.target}}
        {{#components.content}}Render test content{{/components.content}}
      {{/rad-popover}}
    `)

    assert.ok(
      findAll('[data-test="render-test"]').length,
      'The component should render',
    )
    assert.ok(
      find('[data-test="render-test-target"]').matches('button'),
      'The component should render a button as its target subcomponent',
    )
    assert.ok(
      findAll('[data-test="render-test-content"]').length,
      'The component should render a content subcomponent when invoked',
    )
  })

  // #2 Verify accessibility attrs
  // ---------------------------------------------------------------------------
  test('Accessibility attrs are set up correctly', async function(assert) {
    await render(hbs`
      {{#rad-popover data-test="accessibility-test" as |components|}}
        {{#components.target}}Accessibility test target{{/components.target}}
        {{#components.content}}Accessibility test content{{/components.content}}
      {{/rad-popover}}
    `)

    assert.equal(
      find('[data-test="accessibility-test-target"]').getAttribute(
        'aria-describedby',
      ),
      find('[data-test="accessibility-test-content"]').id,
      'The aria-describedby attribute of the target subcomponent should match the id of the content subcomponent',
    )
  })

  // #3 Verify content passthrough
  // ---------------------------------------------------------------------------
  test('Content is passed through correctly', async function(assert) {
    await render(hbs`
      {{#rad-popover data-test="content-test" as |components|}}
        {{#components.target}}Content test target{{/components.target}}
        {{#components.content}}Content test content{{/components.content}}
      {{/rad-popover}}
    `)

    assert.equal(
      find('[data-test="content-test-target"]').textContent.trim(),
      'Content test target',
      'The target subcomponent should display the expected text inside of the button',
    )
    assert.equal(
      find('[data-test="content-test-content"]').textContent.trim(),
      'Content test content',
      'The content subcomponent should display the expected text inside of itself',
    )
  })

  // #4 Hovering on the popover causes it to become visible
  // ---------------------------------------------------------------------------
  test('Popover becomes visible on hover', async function(assert) {
    await render(hbs`
      {{#rad-popover data-test="interact-test" as |components|}}
        {{#components.target}}Interact test target{{/components.target}}
        {{#components.content}}Interact test content{{/components.content}}
      {{/rad-popover}}
    `)

    // Confirm default state
    assert.equal(
      find('[data-test="interact-test-content"]').getAttribute('aria-hidden'),
      'true',
      'The aria-hidden attribute should be set to true by default',
    )
    assert.equal(
      getComputedStyle(find('[data-test="interact-test-content"]')).display,
      'none',
      'The display property should be hidden by default',
    )

    // Simulate mouseEnter
    await triggerEvent('[data-test="interact-test-target"]', 'mouseover')

    assert.equal(
      find('[data-test="interact-test-content"]').getAttribute('aria-hidden'),
      'false',
      'The aria-hidden attribute should be set to false on mouseEnter',
    )
    assert.equal(
      getComputedStyle(find('[data-test="interact-test-content"]')).display,
      'block',
      'The display property should be block on mouseEnter',
    )

    // Simulate mouseLeave
    await triggerEvent('[data-test="interact-test-target"]', 'mouseout')

    assert.equal(
      find('[data-test="interact-test-content"]').getAttribute('aria-hidden'),
      'true',
      'The aria-hidden attribute should be set to true again on mouseLeave',
    )
    assert.equal(
      getComputedStyle(find('[data-test="interact-test-content"]')).display,
      'none',
      'The display property should be set to hidden again when on mouseLeave',
    )
  })

  // #5 Basic customization passthrough test
  // ---------------------------------------------------------------------------
  test('Popover customization attrs are correctly passed through', async function(assert) {
    await render(hbs`
      {{#rad-popover size="large" position="top" data-test="customize-test" as |components|}}
        {{#components.target}}Customize test target{{/components.target}}
        {{#components.content}}Customize test content{{/components.content}}
      {{/rad-popover}}
    `)

    assert.ok(
      find('[data-test="customize-test-content"]').classList.contains('large'),
      'Size property applies the correct class to the content subcomponent',
    )
    assert.ok(
      find('[data-test="customize-test-content"]').classList.contains('top'),
      'Position property applies the correct class to the content subcomponent',
    )
  })
})
