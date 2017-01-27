import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-modal/header', 'Integration | Component | rad modal/header', {
  integration: true
});

test('it renders', function(assert) {
  this.set('actions.toggleModal', () => {});

  this.render(hbs`
    {{#rad-modal/header closeModal=(action 'toggleModal') aria-labelledby='aria'}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Test Header x icon', 'Component renders block form correctly');
  assert.ok(this.$('button.close-x'), 'Close button should be rendered');
});

test('it binds appropriate attrs', function(assert) {
  this.set('actions.toggleModal', () => {});

  this.render(hbs`
    {{#rad-modal/header closeModal=(action 'toggleModal') aria-labelledby='aria'}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.equal(this.$('header').attr('id'), 'aria', 'passed aria-labelledby should be bound to header id');
  assert.notOk(this.$('header').hasClass('primary-bg'), 'without a brand no brand classes should be rendered');
  assert.notOk(this.$('header').hasClass('branded'), 'without a brand no brand classes should be rendered');
  assert.equal(this.$('button.close-x').attr('aria-label'), 'close', 'Close button should have aria-label close');
});

test('it binds appropriate brand classes', function(assert) {
  this.set('actions.toggleModal', () => {});

  this.render(hbs`
    {{#rad-modal/header brand='primary' closeModal=(action 'toggleModal') aria-labelledby='aria'}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.ok(this.$('header').hasClass('primary-bg'), 'passed brand should render brand class');
  assert.ok(this.$('header').hasClass('branded'), 'passed brand should render branded class used to handle whitespace');
  assert.ok(this.$('button.close-x svg').hasClass('primary'), 'close x should also be branded');
});

// @TODO: Reinstate this test once we get branding and tagging set back up

// test('it binds tagging props when passed', function(assert) {
//   const tagging = Ember.Service.extend({
//     fireTag(tagcategory, tagaction, taglabel) {
//       assert.equal(tagcategory, 'Radical', 'fireTag is called with passed tagClose.category');
//       assert.equal(tagaction, 'Action', 'fireTag is called with passed tagClose.action');
//       assert.equal(taglabel, 'Tag', 'fireTag is called with passed tagClose.label');
//     }
//   });
//
//   this.register('service:tagging', tagging);
//   this.inject.service('tagging', { as: 'tagging' });
//   this.set('actions.toggleModal', () => {});
//
//
//   this.render(hbs`
//     {{#rad-modal/header
//       closeModal=(action 'toggleModal')
//       aria-labelledby='aria'
//       tagClose=(hash category="Radical" action="Action" label="Tag")
//       tagging=tagging}}
//       Test Header
//     {{/rad-modal/header}}
//   `);
//
//   // Trigger mouseDown on close x to test that fireTag is triggered with appropriate data
//   this.$('button.close-x').mousedown();
// });

test('it hides the close x if configured', function(assert) {
  this.set('actions.toggleModal', () => {});

  this.render(hbs`
    {{#rad-modal/header closeModal=(action 'toggleModal') aria-labelledby='aria' hideX=true}}
      Test Header
    {{/rad-modal/header}}
  `);

  assert.notOk(this.$('button.close-x').length, 'no close button is rendered in the header if hideX=true');
});
