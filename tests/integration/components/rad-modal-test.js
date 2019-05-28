import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, settled, find, click, findAll } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad modal', function(hooks) {
  setupRenderingTest(hooks)

  hooks.beforeEach(function() {
    // Create dummy action required for rendering
    this.set('actions', {
      toggleModal: () => {},
    })
  })

  // ========================================================
  // Modal tests w/out subcomponents
  // ========================================================

  test('it renders all the bits', async function(assert) {
    await render(hbs`
      {{#rad-modal
        Header='Test Header'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    assert.ok(
      find('*').textContent.includes('template block text'),
      'Component renders block form correctly',
    )
    assert.equal(
      find('.rad-modal-wrapper').getAttribute('role'),
      'dialog',
      'Component renders role dialog',
    )
    assert.ok(
      findAll('[data-test="rad-modal-close-button"]').length,
      'close button is rendered inside of header',
    )
  })

  test('it renders a passed size', async function(assert) {
    await render(hbs`
      {{#rad-modal
        Header='Test Header'
        size='medium'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    assert.equal(
      findAll('.rad-modal-wrapper.medium').length,
      1,
      'Size is bound to modal wrapper',
    )
  })

  test('it binds close button svgId to passed closeIcon', async function(assert) {
    await render(hbs`
      {{#rad-modal
        Header='Test Header'
        closeIcon='arrow-down'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    assert.ok(
      find('[data-test="rad-modal-close-button"] svg').classList.contains(
        'arrow-down',
      ),
      'passed closeIcon is used for close button svg id',
    )
  })

  test('it binds aria-labelledby to a passed Header', async function(assert) {
    await render(hbs`
      {{#rad-modal
        Header='Test Header'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    const ariaLabel = find('.rad-modal-wrapper').getAttribute('aria-labelledby')
    const boundId = find('.modal-header').id

    assert.equal(
      ariaLabel,
      boundId,
      'aria-labelledby matches bound id for modal header',
    )
  })

  test('it binds aria-labelledby to passed ariaHeader', async function(assert) {
    this.set('closeButton', true)
    await render(hbs`
      {{#rad-modal
        ariaHeader="test label"
        closeButton=closeButton}}
        template block text
      {{/rad-modal}}
    `)

    const ariaLabel = find('.rad-modal-wrapper').getAttribute('aria-labelledby')
    const boundId = find('.aria-header').id

    assert.equal(
      ariaLabel,
      boundId,
      'aria-labelledby matches bound id for aria header',
    )
    assert.equal(
      findAll('[data-test="rad-modal-close-button"]').length,
      1,
      'should render a close x inside of the header placeholder',
    )

    // Hide the close button
    this.set('closeButton', false)
    assert.equal(
      ariaLabel,
      boundId,
      'aria-labelledby matches bound id for aria header',
    )
    assert.equal(
      findAll('[data-test="rad-modal-close-button"]').length,
      0,
      'should not render a close x inside of the header placeholder',
    )
  })

  test('it toggles aria-hidden attrs appropriately to handle show and hide', async function(assert) {
    this.set('active', false)

    await render(hbs`
      {{#rad-modal
        Header='Test Header'
        open=active
        closeModal=(action 'toggleModal') }}
        template block text
      {{/rad-modal}}
    `)

    // The modal has transitions, so we have to use a very special spell
    // to delay the test assertions until the animations have had time to complete

    // Wait any ember.run statements to finish, then do assertions
    return settled().then(() => {
      // Hidden by default
      // ---------------------------------------------------------------------------
      assert.equal(
        find('.rad-modal-background').getAttribute('aria-hidden'),
        'true',
        'background aria-hidden true when open is falsey',
      )
      assert.equal(
        getComputedStyle(find('.rad-modal-background')).display,
        'none',
        'background display none when open is falsey',
      )
      assert.equal(
        getComputedStyle(find('.rad-modal-background')).visibility,
        'hidden',
        'background hidden when open is falsey',
      )
      assert.equal(
        getComputedStyle(find('.rad-modal-background'))['pointer-events'],
        'none',
        'clicks disabled when open is falsey',
      )

      assert.equal(
        find('.rad-modal-wrapper').getAttribute('aria-hidden'),
        'true',
        'wrapper aria-hidden true when open is falsey',
      )
      assert.equal(
        getComputedStyle(find('.rad-modal-wrapper')).display,
        'none',
        'wrapper display none when open is falsey',
      )
      assert.equal(
        getComputedStyle(find('.rad-modal-wrapper')).visibility,
        'hidden',
        'wrapper hidden when open is falsey',
      )
      assert.equal(
        getComputedStyle(find('.rad-modal-wrapper'))['pointer-events'],
        'none',
        'clicks disabled when open is falsey',
      )

      // set property to show the modal
      this.set('active', true)

      return settled().then(() => {
        // Show the modal
        // --------------------------------------------s-------------------------------
        assert.equal(
          find('.rad-modal-background').getAttribute('aria-hidden'),
          'false',
          'background aria-hidden false when open is truthy',
        )
        assert.equal(
          getComputedStyle(find('.rad-modal-background')).display,
          'block',
          'background display block when open is truthy',
        )
        assert.equal(
          getComputedStyle(find('.rad-modal-background')).visibility,
          'visible',
          'background not hidden when open is truthy',
        )
        assert.equal(
          getComputedStyle(find('.rad-modal-background'))['pointer-events'],
          'auto',
          'clicks not disabled when open is truthy',
        )

        assert.equal(
          find('.rad-modal-wrapper').getAttribute('aria-hidden'),
          'false',
          'wrapper aria-hidden false when open is truthy',
        )
        assert.equal(
          getComputedStyle(find('.rad-modal-wrapper')).display,
          'block',
          'wrapper display block when open is truthy',
        )
        assert.equal(
          getComputedStyle(find('.rad-modal-wrapper')).visibility,
          'visible',
          'wrapper not hidden when open is truthy',
        )
        assert.equal(
          getComputedStyle(find('.rad-modal-wrapper'))['pointer-events'],
          'auto',
          'clicks not disabled when open is truthy',
        )
      })
    })
  })

  test('it uses default no-op if a closeModal action isnt passed', async function(assert) {
    this.set('active', false)

    await render(hbs`
      {{#rad-modal
        Header='Test Header'
        open=active}}
        template block text
      {{/rad-modal}}
    `)

    assert.ok(
      find('*').textContent.includes('template block text'),
      'Component renders without errors without closure action',
    )

    this.set('active', true)

    return settled().then(() => {
      assert.ok(
        find('*').textContent.includes('template block text'),
        'Component renders without errors without closure action',
      )
    })
  })

  test('it passes and binds closeModal action to background and header (normal header)', async function(assert) {
    this.setProperties({
      ariaHeader: '',
      Header: 'test-header',
      modalIsOpen: true,
      closeModal: () => {
        this.set('modalIsOpen', false)
      },
    })

    await render(hbs`
      {{#rad-modal
        ariaHeader=ariaHeader
        Header=Header
        open=modalIsOpen
        closeModal=closeModal}}
        template block text
      {{/rad-modal}}
    `)

    // Verify modal is visible at start when passed `open` prop is true
    assert.equal(
      find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
      'false',
      'modal background state begins as visible',
    )
    assert.equal(
      find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
      'false',
      'modal wrapper begins as visible',
    )

    // Trigger background click
    await click('.rad-modal-background')

    // Wait for updates
    return settled().then(async () => {
      // Validate that modal elements are hidden
      assert.equal(
        find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
        'true',
        'modal background state is !visible after close action fires from background click',
      )
      assert.equal(
        find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
        'true',
        'modal wrapper state is !visible after close action fires from background click',
      )

      // Reset open state, confirm modal is open again
      this.set('modalIsOpen', true)
      assert.equal(
        find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
        'false',
        'modal background returns to visible',
      )
      assert.equal(
        find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
        'false',
        'modal wrapper returns to visible',
      )

      // Click close button
      await click('[data-test="rad-modal-close-button"]')

      // Wait for updates
      return settled().then(() => {
        // Confirm modal is hidden
        assert.equal(
          find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
          'true',
          'modal background state is !visible after close action fires from close button click',
        )
        assert.equal(
          find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
          'true',
          'modal wrapper state is !visible after close action fires from background click',
        )
      })
    })
  })

  test('it passes and binds closeModal action to background and header (aria header)', async function(assert) {
    this.setProperties({
      ariaHeader: 'aria label for header',
      Header: '',
      modalIsOpen: true,
      closeModal: () => {
        this.set('modalIsOpen', false)
      },
    })

    await render(hbs`
      {{#rad-modal
        ariaHeader=ariaHeader
        Header=Header
        open=modalIsOpen
        closeModal=closeModal }}
        template block text
      {{/rad-modal}}
    `)

    // Verify modal is visible at start when passed `open` prop is true
    assert.equal(
      find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
      'false',
      'modal background state begins as visible',
    )
    assert.equal(
      find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
      'false',
      'modal wrapper begins as visible',
    )

    // Trigger background click
    await click('.rad-modal-background')

    // Wait for updates
    return settled().then(async () => {
      // Validate that modal elements are hidden
      assert.equal(
        find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
        'true',
        'modal background state is !visible after close action fires from background click',
      )
      assert.equal(
        find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
        'true',
        'modal wrapper state is !visible after close action fires from background click',
      )

      // Reset open state, confirm modal is open again
      this.set('modalIsOpen', true)
      assert.equal(
        find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
        'false',
        'modal background returns to visible',
      )
      assert.equal(
        find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
        'false',
        'modal wrapper returns to visible',
      )

      // Click close button
      await click('[data-test="rad-modal-close-button"]')

      // Wait for updates
      return settled().then(() => {
        // Confirm modal is hidden
        assert.equal(
          find('[data-test="rad-modal-background"]').getAttribute('aria-hidden'),
          'true',
          'modal background state is !visible after close action fires from close button click',
        )
        assert.equal(
          find('[data-test="rad-modal-wrapper"]').getAttribute('aria-hidden'),
          'true',
          'modal wrapper state is !visible after close action fires from background click',
        )
      })
    })
  })

  // ========================================================
  // Sub Component Tests
  // ========================================================

  test('it binds aria-labelledby when yielded and passed to subcomponent', async function(assert) {
    await render(hbs`
      {{#rad-modal closeModal=(action 'toggleModal') as |components|}}
        {{#components.header}}Test Header{{/components.header}}
        template block text
      {{/rad-modal}}
    `)

    const ariaLabel = find('.rad-modal-wrapper').getAttribute('aria-labelledby')
    const boundId = find('.modal-header').id

    assert.equal(
      ariaLabel,
      boundId,
      'aria-labelledby matches bound id for modal header',
    )
  })

  // ========================================================
  // Animation Tests
  // ========================================================

  test('it adds animation classes to the rad-modal-wrapper div', async function(assert) {
    await render(hbs`
      {{#rad-modal
        animateFrom='left'
        ariaHeader='animation test left'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    assert.ok(
      find('.rad-modal-wrapper').classList.contains('animate-left'),
      '.animate-left class is added',
    )

    await render(hbs`
      {{#rad-modal
        animateFrom='right'
        ariaHeader='animation test right'
        closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    assert.ok(
      find('.rad-modal-wrapper').classList.contains('animate-right'),
      '.animate-right class is added',
    )

    // Not passing animateFrom doesn't add an .animate- class
    await render(hbs`
      {{#rad-modal ariaHeader='animation-test-none' closeModal=(action 'toggleModal')}}
        template block text
      {{/rad-modal}}
    `)

    assert.notOk(
      find('.rad-modal-wrapper').classList.contains('animate-'),
      '.animate- class is not added',
    )
  })
})
