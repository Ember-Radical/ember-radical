import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('core-modal', 'Integration | Component | core modal', {
  integration: true,
  beforeEach() {
    // Create dummy action required for rendering
    this.set('actions.toggleModal', () => {});
  }
});

// ========================================================
// Modal tests w/out subcomponents
// ========================================================

test('it renders', function(assert) {
  this.render(hbs`
    {{#core-modal closeModal=(action 'toggleModal') Header='Test Header'}}
      template block text
    {{/core-modal}}
  `);

  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Test Header x icon template block text', 'Component renders block form correctly');
  assert.equal(this.$('.core-modal-wrapper').attr('role'), 'dialog', 'Component renders role dialog');
});

test('it renders a passed size', function(assert) {
  this.render(hbs`
    {{#core-modal closeModal=(action 'toggleModal') Header='Test Header' size='medium'}}
      template block text
    {{/core-modal}}
  `);

  assert.equal(this.$('.core-modal-wrapper.medium').length, 1, 'Size is bound to modal wrapper');
});

test('it binds aria-labelledby to a passed Header', function(assert) {
  this.render(hbs`
    {{#core-modal closeModal=(action 'toggleModal') Header='Test Header'}}
      template block text
    {{/core-modal}}
  `);

  const ariaLabel = this.$('.core-modal-wrapper').attr('aria-labelledby');
  const boundId = this.$('.modal-header').attr('id');

  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for modal header');
});

test('it binds aria-labelledby to passed ariaHeader', function(assert) {
  this.set('hideX', false);
  this.render(hbs`
    {{#core-modal closeModal=(action 'toggleModal') ariaHeader="test label" hideX=hideX}}
      template block text
    {{/core-modal}}
  `);

  const ariaLabel = this.$('.core-modal-wrapper').attr('aria-labelledby');
  const boundId = this.$('.aria-header').attr('id');

  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for aria header');
  assert.equal(this.$('svg.x').length, 1, 'should render a close x inside of the header placeholder');

  // Pass hideX prop as well
  this.set('hideX', true);
  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for aria header');
  assert.equal(this.$('svg.x').length, 0, 'should not render a close x inside of the header placeholder');
});

test('it toggles aria-hidden attrs appropriately to handle show and hide', function(assert) {
  this.set('active', false);

  this.render(hbs`
    {{#core-modal closeModal=(action 'toggleModal') open=active Header='Test Header'}}
      template block text
    {{/core-modal}}
  `);

  // The modal has transitions, so we have to use a very special spell
  // to delay the test assertions until the animations have had time to complete

  // Wait any ember.run statements to finish, then do assertions
  return wait().then(() => {
    // Hidden by default
    // ---------------------------------------------------------------------------
    assert.equal(this.$('.core-modal-background').attr('aria-hidden'), 'true', 'background aria-hidden true when open is falsey');
    assert.equal(this.$('.core-modal-background').css('display'), 'none', 'background display none when open is falsey');
    assert.equal(this.$('.core-modal-background').css('visibility'), 'hidden', 'background hidden when open is falsey');
    assert.equal(this.$('.core-modal-background').css('pointer-events'), 'none', 'clicks disabled when open is falsey');

    assert.equal(this.$('.core-modal-wrapper').attr('aria-hidden'), 'true', 'wrapper aria-hidden true when open is falsey');
    assert.equal(this.$('.core-modal-wrapper').css('display'), 'none', 'wrapper display none when open is falsey');
    assert.equal(this.$('.core-modal-wrapper').css('visibility'), 'hidden', 'wrapper hidden when open is falsey');
    assert.equal(this.$('.core-modal-wrapper').css('pointer-events'), 'none', 'clicks disabled when open is falsey');

    // set property to show the modal
    this.set('active', true);

    return wait().then(() => {
      // Show the modal
      // --------------------------------------------s-------------------------------
      assert.equal(this.$('.core-modal-background').attr('aria-hidden'), 'false', 'background aria-hidden false when open is truthy');
      assert.equal(this.$('.core-modal-background').css('display'), 'block', 'background display block when open is truthy');
      assert.equal(this.$('.core-modal-background').css('visibility'), 'visible', 'background not hidden when open is truthy');
      assert.equal(this.$('.core-modal-background').css('pointer-events'), 'auto', 'clicks not disabled when open is truthy');

      assert.equal(this.$('.core-modal-wrapper').attr('aria-hidden'), 'false', 'wrapper aria-hidden false when open is truthy');
      assert.equal(this.$('.core-modal-wrapper').css('display'), 'block', 'wrapper display block when open is truthy');
      assert.equal(this.$('.core-modal-wrapper').css('visibility'), 'visible', 'wrapper not hidden when open is truthy');
      assert.equal(this.$('.core-modal-wrapper').css('pointer-events'), 'auto', 'clicks not disabled when open is truthy');

    });
  });

});

test('it passes and binds closeModal action to background and header', function(assert) {
  assert.expect(4);

  this.set('actions.closeModalAction', () => {
    assert.ok(this.$('.core-modal-wrapper'), 'close action fired');
  });

  this.setProperties({
    Header: 'test-header',
    ariaHeader: ''
  });

  this.render(hbs`
    {{#core-modal closeModal=(action 'closeModalAction') Header=Header ariaHeader=ariaHeader open=true}}
      template block text
    {{/core-modal}}
  `);

  // Fire clicks
  // ---------------------------------------------------------------------------
  this.$('.core-modal-background').click();
  this.$('button.close-x').click();

  // Switch to ariaHeader
  // ---------------------------------------------------------------------------
  this.setProperties({
    Header: '',
    ariaHeader: 'aria label'
  });

  this.$('.core-modal-background').click();
  this.$('button.close-x').click();
});

// ========================================================
// Sub Component Tests
// ========================================================

test('it binds aria-labelledby when yielded and passed to subcomponent', function(assert) {
  this.render(hbs`
    {{#core-modal closeModal=(action 'toggleModal') as |components|}}
      {{#components.header}}Test Header{{/components.header}}
      template block text
    {{/core-modal}}
  `);

  const ariaLabel = this.$('.core-modal-wrapper').attr('aria-labelledby');
  const boundId = this.$('.modal-header').attr('id');

  assert.equal(ariaLabel, boundId, 'aria-labelledby matches bound id for modal header');
});

// ========================================================
// Animation Tests
// ========================================================

test('it adds animation classes to the core-modal-wrapper div', function(assert) {
  this.render(hbs`
    {{#core-modal ariaHeader='animation test left' closeModal=(action 'toggleModal') animateFrom='left'}}
      template block text
    {{/core-modal}}
  `);

  assert.ok(this.$('.core-modal-wrapper').hasClass('animate-left'), '.animate-left class is added');

  this.render(hbs`
    {{#core-modal ariaHeader='animation test right' closeModal=(action 'toggleModal') animateFrom='right'}}
      template block text
    {{/core-modal}}
  `);

  assert.ok(this.$('.core-modal-wrapper').hasClass('animate-right'), '.animate-right class is added');

  // Not passing animateFrom doesn't add an .animate- class
  this.render(hbs`
    {{#core-modal ariaHeader='animation-test-none' closeModal=(action 'toggleModal')}}
      template block text
    {{/core-modal}}
  `);

  assert.ok(!this.$('.core-modal-wrapper').hasClass('animate-'), '.animate- class is not added');
});
