import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, find, findAll, triggerEvent } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad tooltip', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{rad-tooltip Title="Hover me" Content="For some rad info"}}`)

    assert.equal(
      find('*')
        .textContent.trim()
        .replace(/\s\s+/g, ' '),
      'Hover me For some rad info',
      'component renders inline form correctly',
    )
    assert.equal(
      findAll('button').length,
      1,
      'Tooltip target should be a button for accessibility',
    )
  })

  test('it binds the required attributes', async function(assert) {
    await render(hbs`{{rad-tooltip Title="Hover me" Content="For some rad info"}}`)

    assert.equal(
      find('button').getAttribute('type'),
      'button',
      'tooltip target should be a button with correct type attr',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('role'),
      'tooltip',
      'tooltip content should have aria role tooltip',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('aria-hidden'),
      'true',
      'tooltip content should have aria-hidden true by default',
    )
    assert.equal(
      find('button').getAttribute('aria-describedby'),
      find('.tooltip-content').id,
      'aria-describedby on tooltip target should match id of content',
    )
  })

  test('property buttonStyle binds the appropriate classes', async function(assert) {
    await render(hbs`{{rad-tooltip Title="Hover me" Content="For some rad info"}}`)
    assert.ok(
      find('.tooltip-title').classList.contains('btn-link'),
      'tooltip title should default to link styles',
    )

    await render(
      hbs`{{rad-tooltip Title="Hover me" Content="For some rad info" buttonStyle=true}}`,
    )
    assert.notOk(
      find('.tooltip-title').classList.contains('btn-link'),
      'tooltip title should not have class btn-link when passed true',
    )
  })

  test('it only shows tooltip content on hover', async function(assert) {
    await render(hbs`{{rad-tooltip Title="Hover me" Content="For some rad info"}}`)

    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden on render',
    )

    await triggerEvent('button', 'mouseover')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'block',
      'content is displayed on button hover',
    )

    await triggerEvent('button', 'mouseout')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden again on mouseleave',
    )
  })

  test('it plays nice with subcomponent title', async function(assert) {
    await render(hbs`
      {{#rad-tooltip Content="For some rad info." as |components aria-describedby|}}
        {{#components.title aria-describedby=aria-describedby}}
          Hover me
        {{/components.title}}
      {{/rad-tooltip}}
    `)
    assert.equal(
      find('*')
        .textContent.trim()
        .replace(/\s\s+/g, ' '),
      'Hover me For some rad info.',
      'component renders inline form correctly',
    )
    assert.equal(
      findAll('button').length,
      1,
      'Tooltip target should be a button for accessibility',
    )

    // Test all attributes
    assert.equal(
      find('button').getAttribute('type'),
      'button',
      'tooltip target should be a button with correct type attr',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('role'),
      'tooltip',
      'tooltip content should have aria role tooltip',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('aria-hidden'),
      'true',
      'tooltip content should have aria-hidden true by default',
    )
    assert.equal(
      find('button').getAttribute('aria-describedby'),
      find('.tooltip-content').id,
      'aria-describedby on tooltip target should match id of content',
    )

    // Test user interaction
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden on render',
    )

    await triggerEvent('button', 'mouseover')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'block',
      'content is displayed on button hover',
    )

    await triggerEvent('button', 'mouseout')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden again on mouseleave',
    )
  })

  test('it plays nice with subcomponent content', async function(assert) {
    await render(hbs`
      {{#rad-tooltip Title="Hover me" as |components aria-describedby hidden|}}
        {{#components.content aria-describedby=aria-describedby hidden=hidden}}
          For some rad info.
        {{/components.content}}
      {{/rad-tooltip}}
    `)
    assert.equal(
      find('*')
        .textContent.trim()
        .replace(/\s\s+/g, ' '),
      'Hover me For some rad info.',
      'component renders inline form correctly',
    )
    assert.equal(
      findAll('button').length,
      1,
      'Tooltip target should be a button for accessibility',
    )

    // Test all attributes
    assert.equal(
      find('button').getAttribute('type'),
      'button',
      'tooltip target should be a button with correct type attr',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('role'),
      'tooltip',
      'tooltip content should have aria role tooltip',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('aria-hidden'),
      'true',
      'tooltip content should have aria-hidden true by default',
    )
    assert.equal(
      find('button').getAttribute('aria-describedby'),
      find('.tooltip-content').id,
      'aria-describedby on tooltip target should match id of content',
    )

    // Test user interaction
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden on render',
    )

    await triggerEvent('button', 'mouseover')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'block',
      'content is displayed on button hover',
    )

    await triggerEvent('button', 'mouseout')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden again on mouseleave',
    )
  })

  test('it plays nice with both subcomponents title+content', async function(assert) {
    await render(hbs`
      {{#rad-tooltip as |components aria-describedby hidden|}}
        {{#components.title aria-describedby=aria-describedby}}
          Hover me
        {{/components.title}}
        {{#components.content aria-describedby=aria-describedby hidden=hidden}}
          For some rad info.
        {{/components.content}}
      {{/rad-tooltip}}
    `)
    assert.equal(
      find('*')
        .textContent.trim()
        .replace(/\s\s+/g, ' '),
      'Hover me For some rad info.',
      'component renders inline form correctly',
    )
    assert.equal(
      findAll('button').length,
      1,
      'Tooltip target should be a button for accessibility',
    )

    // Test all attributes
    assert.equal(
      find('button').getAttribute('type'),
      'button',
      'tooltip target should be a button with correct type attr',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('role'),
      'tooltip',
      'tooltip content should have aria role tooltip',
    )
    assert.equal(
      find('.tooltip-content').getAttribute('aria-hidden'),
      'true',
      'tooltip content should have aria-hidden true by default',
    )
    assert.equal(
      find('button').getAttribute('aria-describedby'),
      find('.tooltip-content').id,
      'aria-describedby on tooltip target should match id of content',
    )

    // Test user interaction
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden on render',
    )

    await triggerEvent('button', 'mouseover')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'block',
      'content is displayed on button hover',
    )

    await triggerEvent('button', 'mouseout')
    assert.equal(
      getComputedStyle(find('.tooltip-content')).display,
      'none',
      'content is hidden again on mouseleave',
    )
  })
})
