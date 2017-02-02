import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-modal/header', 'Integration | Component | rad modal/header', {
  integration: true,
  beforeEach() {
    // Create dummy action required for rendering
    this.set('actions.toggleModal', () => {});
  }
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#rad-modal/header closeModal=(action 'toggleModal')}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.ok(this.$().text().includes('Test Header'),
    'Component renders block form correctly');
  assert.ok(this.$('[data-test="rad-modal-close-button"]').length,
    'Close button should be rendered by default');
});

test('it binds appropriate attrs', function(assert) {
  this.render(hbs`
    {{#rad-modal/header closeModal=(action 'toggleModal')}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.notOk(this.$('header').hasClass('primary-bg'),
    'without a brand no brand classes should be rendered');
  assert.notOk(this.$('header').hasClass('branded'),
    'without a brand no brand classes should be rendered');
  assert.equal(this.$('[data-test="rad-modal-close-button"]').attr('aria-label'), 'close',
    'Close button should have aria-label close');
  // Don't test aria-labelledby binding with subcomponent only, this component
  // should only be used as a contextual component, the `rad-modal` handles
  // setting the id of the header to match the aria-labelledby
});

test('it binds appropriate brand classes', function(assert) {
  this.render(hbs`
    {{#rad-modal/header
      brand='primary'
      closeModal=(action 'toggleModal')}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.ok(this.$('header').hasClass('primary-bg'),
    'passed brand should render brand class');
  assert.ok(this.$('header').hasClass('branded'),
    'passed brand should render branded class used to handle whitespace');
  assert.ok(this.$('[data-test="rad-modal-close-button"]').find('svg').hasClass('primary'),
    'close button should also be branded');
});

test('it binds close button svgId to passed closeIcon', function(assert) {
  this.render(hbs`
    {{#rad-modal/header
      closeIcon='arrow-down'
      closeModal=(action 'toggleModal')}}
      template block text
    {{/rad-modal/header}}
  `);

  assert.ok(this.$('svg').hasClass('arrow-down'),
    'passed closeIcon is used for close button svg id');
});

test('it hides the close button if configured', function(assert) {
  this.render(hbs`
    {{#rad-modal/header
      closeButton=false
      closeModal=(action 'toggleModal')}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.notOk(this.$('[data-test="rad-modal-close-button"]').length,
    'no close button is rendered in the header if closeButton=false');
});

test('it calls passed closeModal action when close button is clicked', function(assert) {
  this.set('actions.closeModal', () => {
    assert.ok(true, 'close modal action is called');
  });

  assert.expect(1);

  this.render(hbs`
    {{#rad-modal/header closeModal=(action 'closeModal')}}
      Test Header
    {{/rad-modal/header}}
  `);

  this.$('[data-test="rad-modal-close-button"]').click();
});

test('it uses default no-op if a closeModal action isnt passed', function(assert) {
  this.render(hbs`
    {{#rad-modal/header}}
      Test Header
    {{/rad-modal/header}}
  `);

  this.$('[data-test="rad-modal-close-button"]').click();

  assert.ok(this.$().text().includes('Test Header'),
    'Component renders without errors without closure action');
});

test('it binds tagging props when passed', function(assert) {
  const tagging = Ember.Service.extend({
    fireTag({ tagcategory, tagaction, taglabel }) {
      assert.equal(tagcategory, 'Radical', 'fireTag is called with passed tagClose.category');
      assert.equal(tagaction, 'Action', 'fireTag is called with passed tagClose.action');
      assert.equal(taglabel, 'Tag', 'fireTag is called with passed tagClose.label');
    }
  });

  this.register('service:tagging', tagging);

  this.render(hbs`
    {{#rad-modal/header
      closeModal=(action 'toggleModal')
      tagClose=(hash category="Radical" action="Action" label="Tag")}}
      Test Header
    {{/rad-modal/header}}
  `);

  // Trigger mouseDown on close x to test that fireTag is triggered with appropriate data
  this.$('[data-test="rad-modal-close-button"]').mousedown();
});
