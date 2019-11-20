import Service from '@ember/service'
import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import {
  render,
  find,
  click,
  findAll,
  triggerEvent
} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad modal/header', function(hooks) {
  setupRenderingTest(hooks)

  hooks.beforeEach(function() {
    // Create dummy action required for rendering
    this.set('actions', {
      toggleModal: () => {},
    })
  })

  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-modal/header closeModal=(action 'toggleModal')}}
        Test Header
      {{/rad-modal/header}}
    `)

    assert.ok(
      find('*').textContent.includes('Test Header'),
      'Component renders block form correctly',
    )
    assert.ok(
      findAll('[data-test="rad-modal-close-button"]').length,
      'Close button should be rendered by default',
    )
  })

  test('it binds appropriate attrs', async function(assert) {
    await render(hbs`
      {{#rad-modal/header closeModal=(action 'toggleModal')}}
        Test Header
      {{/rad-modal/header}}
    `)

    assert.notOk(
      find('header').classList.contains('primary-bg'),
      'without a brand no brand classes should be rendered',
    )
    assert.notOk(
      find('header').classList.contains('branded'),
      'without a brand no brand classes should be rendered',
    )
    assert.equal(
      find('[data-test="rad-modal-close-button"]').getAttribute('aria-label'),
      'close',
      'Close button should have aria-label close',
    )
    // Don't test aria-labelledby binding with subcomponent only, this component
    // should only be used as a contextual component, the `rad-modal` handles
    // setting the id of the header to match the aria-labelledby
  })

  test('it binds appropriate brand classes', async function(assert) {
    await render(hbs`
      {{#rad-modal/header
        brand='primary'
        closeModal=(action 'toggleModal')}}
        Test Header
      {{/rad-modal/header}}
    `)

    assert.ok(
      find('header').classList.contains('primary-bg'),
      'passed brand should render brand class',
    )
    assert.ok(
      find('header').classList.contains('branded'),
      'passed brand should render branded class used to handle whitespace',
    )
    assert.ok(
      find('[data-test="rad-modal-close-button"] svg').classList.contains(
        'primary',
      ),
      'close button should also be branded',
    )
  })

  test('it binds close button svgId to passed closeIcon', async function(assert) {
    await render(hbs`
      {{#rad-modal/header
        closeIcon='arrow-down'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal/header}}
    `)

    assert.ok(
      find('svg').classList.contains('arrow-down'),
      'passed closeIcon is used for close button svg id',
    )
  })

  test('it hides the close button if configured', async function(assert) {
    await render(hbs`
      {{#rad-modal/header
        closeButton=false
        closeModal=(action 'toggleModal')}}
        Test Header
      {{/rad-modal/header}}
    `)

    assert.notOk(
      findAll('[data-test="rad-modal-close-button"]').length,
      'no close button is rendered in the header if closeButton=false',
    )
  })

  test('it calls passed closeModal action when close button is clicked', async function(assert) {
    this.set('actions', {
      closeModal: () => {
        assert.ok(true, 'close modal action is called')
      },
    })

    assert.expect(1)

    await render(hbs`
      {{#rad-modal/header closeModal=(action 'closeModal')}}
        Test Header
      {{/rad-modal/header}}
    `)

    await click('[data-test="rad-modal-close-button"]')
  })

  test('it uses default no-op if a closeModal action isnt passed', async function(assert) {
    await render(hbs`
      {{#rad-modal/header}}
        Test Header
      {{/rad-modal/header}}
    `)

    await click('[data-test="rad-modal-close-button"]')

    assert.ok(
      find('*').textContent.includes('Test Header'),
      'Component renders without errors without closure action',
    )
  })

  test('it binds tagging props when passed', async function(assert) {
    const tagging = Service.extend({
      fireTag({ tagcategory, tagaction, taglabel }) {
        assert.equal(
          tagcategory,
          'Radical',
          'fireTag is called with passed tagClose.category',
        )
        assert.equal(
          tagaction,
          'Action',
          'fireTag is called with passed tagClose.action',
        )
        assert.equal(
          taglabel,
          'Tag',
          'fireTag is called with passed tagClose.label',
        )
      },
    })

    this.owner.register('service:tagging', tagging)

    await render(hbs`
      {{#rad-modal/header
        closeModal=(action 'toggleModal')
        tagClose=(hash category="Radical" action="Action" label="Tag")}}
        Test Header
      {{/rad-modal/header}}
    `)

    // Trigger mouseDown on close x to test that fireTag is triggered with appropriate data
    await triggerEvent('[data-test="rad-modal-close-button"]', 'mousedown')
  })
})
