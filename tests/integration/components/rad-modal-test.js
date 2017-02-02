import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('rad-modal', 'Integration | Component | rad modal', {
  integration: true,
  beforeEach() {
    // Create dummy action required for rendering
    this.set('actions.toggleModal', () => {});
  }
});

// ========================================================
// Modal tests w/out subcomponents
// ========================================================

test('it renders all the bits', function(assert) {
  this.render(hbs`
    {{#rad-modal
      Header='Test Header'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  assert.ok(this.$().text().includes('template block text'),
    'Component renders block form correctly');
  assert.equal(this.$('.rad-modal-wrapper').attr('role'), 'dialog',
    'Component renders role dialog');
  assert.ok(this.$('[data-test="rad-modal-close-button"]').length,
    'close button is rendered inside of header');
});

test('it renders a passed size', function(assert) {
  this.render(hbs`
    {{#rad-modal
      Header='Test Header'
      size='medium'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  assert.equal(this.$('.rad-modal-wrapper.medium').length, 1,
    'Size is bound to modal wrapper');
});

test('it binds close button svgId to passed closeIcon', function(assert) {
  this.render(hbs`
    {{#rad-modal
      Header='Test Header'
      closeIcon='arrow-down'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  assert.ok(this.$('[data-test="rad-modal-close-button"] svg').hasClass('arrow-down'),
    'passed closeIcon is used for close button svg id');
});

test('it binds aria-labelledby to a passed Header', function(assert) {
  this.render(hbs`
    {{#rad-modal
      Header='Test Header'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  const ariaLabel = this.$('.rad-modal-wrapper').attr('aria-labelledby');
  const boundId = this.$('.modal-header').attr('id');

  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for modal header');
});

test('it binds aria-labelledby to passed ariaHeader', function(assert) {
  this.set('closeButton', true);
  this.render(hbs`
    {{#rad-modal
      ariaHeader="test label"
      closeButton=closeButton}}
      template block text
    {{/rad-modal}}
  `);

  const ariaLabel = this.$('.rad-modal-wrapper').attr('aria-labelledby');
  const boundId = this.$('.aria-header').attr('id');

  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for aria header');
  assert.equal(this.$('[data-test="rad-modal-close-button"]').length, 1,
    'should render a close x inside of the header placeholder');

  // Hide the close button
  this.set('closeButton', false);
  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for aria header');
  assert.equal(this.$('[data-test="rad-modal-close-button"]').length, 0,
    'should not render a close x inside of the header placeholder');
});

test('it toggles aria-hidden attrs appropriately to handle show and hide', function(assert) {
  this.set('active', false);

  this.render(hbs`
    {{#rad-modal
      Header='Test Header'
      open=active
      closeModal=(action 'toggleModal') }}
      template block text
    {{/rad-modal}}
  `);

  // The modal has transitions, so we have to use a very special spell
  // to delay the test assertions until the animations have had time to complete

  // Wait any ember.run statements to finish, then do assertions
  return wait().then(() => {
    // Hidden by default
    // ---------------------------------------------------------------------------
    assert.equal(this.$('.rad-modal-background').attr('aria-hidden'), 'true',
      'background aria-hidden true when open is falsey');
    assert.equal(this.$('.rad-modal-background').css('display'), 'none',
      'background display none when open is falsey');
    assert.equal(this.$('.rad-modal-background').css('visibility'), 'hidden',
      'background hidden when open is falsey');
    assert.equal(this.$('.rad-modal-background').css('pointer-events'), 'none',
      'clicks disabled when open is falsey');

    assert.equal(this.$('.rad-modal-wrapper').attr('aria-hidden'), 'true',
      'wrapper aria-hidden true when open is falsey');
    assert.equal(this.$('.rad-modal-wrapper').css('display'), 'none',
      'wrapper display none when open is falsey');
    assert.equal(this.$('.rad-modal-wrapper').css('visibility'), 'hidden',
      'wrapper hidden when open is falsey');
    assert.equal(this.$('.rad-modal-wrapper').css('pointer-events'), 'none',
      'clicks disabled when open is falsey');

    // set property to show the modal
    this.set('active', true);

    return wait().then(() => {
      // Show the modal
      // --------------------------------------------s-------------------------------
      assert.equal(this.$('.rad-modal-background').attr('aria-hidden'),
        'false', 'background aria-hidden false when open is truthy');
      assert.equal(this.$('.rad-modal-background').css('display'), 'block',
        'background display block when open is truthy');
      assert.equal(this.$('.rad-modal-background').css('visibility'), 'visible',
        'background not hidden when open is truthy');
      assert.equal(this.$('.rad-modal-background').css('pointer-events'), 'auto',
        'clicks not disabled when open is truthy');

      assert.equal(this.$('.rad-modal-wrapper').attr('aria-hidden'), 'false',
        'wrapper aria-hidden false when open is truthy');
      assert.equal(this.$('.rad-modal-wrapper').css('display'), 'block',
        'wrapper display block when open is truthy');
      assert.equal(this.$('.rad-modal-wrapper').css('visibility'), 'visible',
        'wrapper not hidden when open is truthy');
      assert.equal(this.$('.rad-modal-wrapper').css('pointer-events'), 'auto',
        'clicks not disabled when open is truthy');

    });
  });
});

test('it uses default no-op if a closeModal action isnt passed', function(assert) {
  this.set('active', false);

  this.render(hbs`
    {{#rad-modal
      Header='Test Header'
      open=active}}
      template block text
    {{/rad-modal}}
  `);

  assert.ok(this.$().text().includes('template block text'),
    'Component renders without errors without closure action');

  this.set('active', true);

  return wait().then(() => {
    assert.ok(this.$().text().includes('template block text'),
      'Component renders without errors without closure action');
  });
});

test('it passes and binds closeModal action to background and header (normal header)', function(assert) {

  this.setProperties({
    ariaHeader: '',
    Header: 'test-header',
    modalIsOpen: true,
    closeModal: () => {
      this.set('modalIsOpen', false);
    }
  });

  this.render(hbs`
    {{#rad-modal
      ariaHeader=ariaHeader
      Header=Header
      open=modalIsOpen
      closeModal=closeModal}}
      template block text
    {{/rad-modal}}
  `);

  // Verify modal is visible at start when passed `open` prop is true
  assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'false',
    'modal background state begins as visible');
  assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'false',
    'modal wrapper begins as visible');

  // Trigger background click
  this.$('.rad-modal-background').click();

  // Wait for updates
  return wait().then(() => {
    // Validate that modal elements are hidden
    assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'true',
      'modal background state is !visible after close action fires from background click');
    assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'true',
      'modal wrapper state is !visible after close action fires from background click');

    // Reset open state, confirm modal is open again
    this.set('modalIsOpen', true);
    assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'false',
      'modal background returns to visible');
    assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'false',
      'modal wrapper returns to visible');

    // Click close button
    this.$('[data-test="rad-modal-close-button"]').click();

    // Wait for updates
    return wait().then(() => {
      // Confirm modal is hidden
      assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'true',
        'modal background state is !visible after close action fires from close button click');
      assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'true',
        'modal wrapper state is !visible after close action fires from background click');
    });
  });
});

test('it passes and binds closeModal action to background and header (aria header)', function(assert) {

  this.setProperties({
    ariaHeader: 'aria label for header',
    Header: '',
    modalIsOpen: true,
    closeModal: () => {
      this.set('modalIsOpen', false);
    }
  });

  this.render(hbs`
    {{#rad-modal
      ariaHeader=ariaHeader
      Header=Header
      open=modalIsOpen
      closeModal=closeModal }}
      template block text
    {{/rad-modal}}
  `);

  // Verify modal is visible at start when passed `open` prop is true
  assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'false',
    'modal background state begins as visible');
  assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'false',
    'modal wrapper begins as visible');

  // Trigger background click
  this.$('.rad-modal-background').click();

  // Wait for updates
  return wait().then(() => {
    // Validate that modal elements are hidden
    assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'true',
      'modal background state is !visible after close action fires from background click');
    assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'true',
      'modal wrapper state is !visible after close action fires from background click');

    // Reset open state, confirm modal is open again
    this.set('modalIsOpen', true);
    assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'false',
      'modal background returns to visible');
    assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'false',
      'modal wrapper returns to visible');

    // Click close button
    this.$('[data-test="rad-modal-close-button"]').click();

    // Wait for updates
    return wait().then(() => {
      // Confirm modal is hidden
      assert.equal(this.$('[data-test="rad-modal-background"]').attr('aria-hidden'), 'true',
        'modal background state is !visible after close action fires from close button click');
      assert.equal(this.$('[data-test="rad-modal-wrapper"]').attr('aria-hidden'), 'true',
        'modal wrapper state is !visible after close action fires from background click');
    });
  });
});

// ========================================================
// Sub Component Tests
// ========================================================

test('it binds aria-labelledby when yielded and passed to subcomponent', function(assert) {
  this.render(hbs`
    {{#rad-modal closeModal=(action 'toggleModal') as |components|}}
      {{#components.header}}Test Header{{/components.header}}
      template block text
    {{/rad-modal}}
  `);

  const ariaLabel = this.$('.rad-modal-wrapper').attr('aria-labelledby');
  const boundId = this.$('.modal-header').attr('id');

  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for modal header');
});

// ========================================================
// Animation Tests
// ========================================================

test('it adds animation classes to the rad-modal-wrapper div', function(assert) {
  this.render(hbs`
    {{#rad-modal
      animateFrom='left'
      ariaHeader='animation test left'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  assert.ok(this.$('.rad-modal-wrapper').hasClass('animate-left'),
    '.animate-left class is added');

  this.render(hbs`
    {{#rad-modal
      animateFrom='right'
      ariaHeader='animation test right'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  assert.ok(this.$('.rad-modal-wrapper').hasClass('animate-right'),
    '.animate-right class is added');

  // Not passing animateFrom doesn't add an .animate- class
  this.render(hbs`
    {{#rad-modal ariaHeader='animation-test-none' closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal}}
  `);

  assert.notOk(this.$('.rad-modal-wrapper').hasClass('animate-'),
    '.animate- class is not added');
});
