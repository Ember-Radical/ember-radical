import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, find, click, findAll } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad dropdown', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(
      hbs`{{rad-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`,
    )

    assert.equal(
      find('*')
        .textContent.trim()
        .replace(/\s\s+/g, ' '),
      'Dropdown Target Dropdown Content',
      'component renders inline form correctly',
    )
    assert.equal(
      findAll('button').length,
      1,
      'Dropdown target should be a button for accessibility',
    )
    assert.ok(
      find('button').classList.contains('btn-link'),
      'target should be a link style button by default',
    )

    await render(hbs`
      {{#rad-dropdown as |components|}}
        {{#components.target}}Dropdown Target{{/components.target}}
        {{#components.content}}Dropdown Content{{/components.content}}
      {{/rad-dropdown}}
    `)

    assert.equal(
      find('*')
        .textContent.trim()
        .replace(/\s\s+/g, ' '),
      'Dropdown Target Dropdown Content',
      'component renders inline form correctly',
    )
    assert.equal(
      findAll('button').length,
      1,
      'Dropdown target should be a button for accessibility',
    )
  })

  test('it binds the required attributes', async function(assert) {
    await render(
      hbs`{{rad-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`,
    )

    assert.equal(
      find('button').getAttribute('type'),
      'button',
      'target should be a button with correct type attr',
    )
    assert.equal(
      find('button').getAttribute('aria-haspopup'),
      'true',
      'target should have popup aria attr',
    )
    assert.equal(
      find('button').getAttribute('aria-expanded'),
      'false',
      'target should have aria expanded false by default',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'true',
      'content should have aria-hidden true by default',
    )
    assert.equal(
      find('.dropdown-target').id,
      `aria-labelledby-${find('.rad-dropdown').id}`,
      'target should have proper id',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-labelledby'),
      `aria-labelledby-${find('.rad-dropdown').id}`,
      'content should have aria-labelledby attr',
    )
  })

  test('property buttonStyles binds the appropriate classes', async function(assert) {
    await render(
      hbs`{{rad-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`,
    )
    assert.ok(
      find('.dropdown-target').classList.contains('btn-link'),
      'target should default to link styles',
    )

    await render(
      hbs`{{rad-dropdown Target="Dropdown Target" Content="Dropdown Content" buttonStyle=true}}`,
    )
    assert.notOk(
      find('.dropdown-target').classList.contains('btn-link'),
      'class btn-link is suppressed with buttonStyle prop',
    )
  })

  test('property position binds the appropriate classes', async function(assert) {
    await render(
      hbs`{{rad-dropdown Target='Dropdown Target' Content='Dropdown Content' position='top right' data-test="position-test"}}`,
    )

    assert.ok(
      find('[data-test="position-test"] .dropdown-content').classList.contains(
        'top',
      ),
      'top positioning class should be applied',
    )
    assert.ok(
      find('[data-test="position-test"] .dropdown-content').classList.contains(
        'right',
      ),
      'right positioning class should be applied',
    )
  })

  test('content is shown on click', async function(assert) {
    await render(
      hbs`{{rad-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`,
    )

    assert.equal(
      find('.dropdown-target').getAttribute('aria-expanded'),
      'false',
      'target shows expanded false before click',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'true',
      'content should have aria-hidden true by default',
    )
    assert.equal(
      getComputedStyle(find('.dropdown-content')).display,
      'none',
      'content is not displayed before click',
    )

    await click('button.dropdown-target')

    assert.equal(
      find('.dropdown-target').getAttribute('aria-expanded'),
      'true',
      'target shows expanded true after click',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'false',
      'aria-hidden is false after click',
    )
    assert.equal(
      getComputedStyle(find('.dropdown-content')).display,
      'block',
      'content is displayed after click',
    )

    await click('button.dropdown-target')

    assert.equal(
      find('.dropdown-target').getAttribute('aria-expanded'),
      'false',
      'target shows expanded false after 2nd click',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'true',
      'content shows have aria-hidden true after 2nd click',
    )
    assert.equal(
      getComputedStyle(find('.dropdown-content')).display,
      'none',
      'content is not displayed after 2nd click',
    )
  })

  test('pressing escape closes the dropdown', async function(assert) {
    await render(
      hbs`{{rad-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`,
    )

    assert.equal(
      find('.dropdown-target').getAttribute('aria-expanded'),
      'false',
      'target shows expanded false before click',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'true',
      'content should have aria-hidden true by default',
    )
    assert.equal(
      getComputedStyle(find('.dropdown-content')).display,
      'none',
      'content is not displayed before click',
    )

    await click('button.dropdown-target')

    assert.equal(
      find('.dropdown-target').getAttribute('aria-expanded'),
      'true',
      'target shows expanded true after click',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'false',
      'aria-hidden is false after click',
    )
    assert.equal(
      getComputedStyle(find('.dropdown-content')).display,
      'block',
      'content is displayed after click',
    )
  })

  test('use the dropdown as a dropdown menu', async function(assert) {
    await render(hbs`
      {{#rad-dropdown dropdownMenu=true as |components|}}
        {{#components.target}}Dropdown Target{{/components.target}}
        {{#components.content}}
          {{#components.menu-item}}Dropdown Option{{/components.menu-item}}
        {{/components.content}}
      {{/rad-dropdown}}
    `)

    assert.ok(
      find('.dropdown-content').classList.contains('dropdown-menu'),
      'dropdown-menu class exists',
    )
    assert.equal(
      findAll('.dropdown-item').length,
      1,
      'a dropdown menu-item is rendered',
    )
  })

  test('clicking a menu-item closes the dropdown', async function(assert) {
    await render(hbs`
      {{#rad-dropdown dropdownMenu=true as |components|}}
        {{#components.target}}Dropdown Target{{/components.target}}
        {{#components.content}}
          {{#components.menu-item}}Dropdown Option{{/components.menu-item}}
        {{/components.content}}
      {{/rad-dropdown}}
    `)

    await click('.dropdown-item')

    assert.equal(
      find('.dropdown-target').getAttribute('aria-expanded'),
      'false',
      'target shows expanded false after pressing escape',
    )
    assert.equal(
      find('.dropdown-content').getAttribute('aria-hidden'),
      'true',
      'content shows have aria-hidden true after pressing escape',
    )
    assert.equal(
      getComputedStyle(find('.dropdown-content')).display,
      'none',
      'content is not displayed after pressing escape',
    )
  })
})
