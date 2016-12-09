import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-button', 'Integration | Component | core button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{#core-button}}Default button{{/core-button}}`);

  assert.equal(this.$().text().trim(), 'Default button', 'component renders block form correctly');
  assert.equal(this.$('button').length, 1, 'component is a button element');
  assert.ok(this.$('button').hasClass('btn'), 'component always bind class btn');
  assert.ok(this.$('button').hasClass('core-button'), 'component renders addon class name');
});

test('it renders brand classes', function(assert) {
  this.render(hbs`{{#core-button brand="success"}}Default button{{/core-button}}`);

  assert.ok(this.$('button').hasClass('btn-success'), 'the component binds branding class');
});

test('it uses prop link to output link class', function(assert) {
  // Not configured
  this.render(hbs`{{#core-button}}Default button{{/core-button}}`);
  assert.notOk(this.$('button').hasClass('btn-link'), 'component does not render btn-link by default');

  // link = false
  this.render(hbs`{{#core-button link=false}}Default button{{/core-button}}`);
  assert.notOk(this.$('button').hasClass('btn-link'), 'component does not render btn-link when link=false');

  // link = true
  this.render(hbs`{{#core-button link=true}}Default button{{/core-button}}`);
  assert.ok(this.$('button').hasClass('btn-link'), 'component renders btn-link class when link=true');
});

// test('it calls the tagging service on click', function(assert) {
//   const taggingStub = Ember.Service.extend({
//     fireTag(category, action, label) {
//       assert.equal(category, 'Category', 'category is passed to tagging on click');
//       assert.equal(action, 'Action', 'action is passed to tagging on click');
//       assert.equal(label, 'Label', 'label is passed to tagging on click');
//     }
//   });
//
//   // Only one tag should be fired, if more are fired it's a bug
//   assert.expect(3);
//
//   this.register('service:tagging', taggingStub);
//   this.inject.service('tagging');
//
//   this.set('tagcategory', 'Category');
//
//   this.render(hbs`
//     {{#core-button
//       tagcategory=tagcategory
//       tagaction="Action"
//       taglabel="Label"
//       tagging=tagging}}
//       Tagged Button
//     {{/core-button}}`);
//   this.$('button').mousedown();
//
//   // Test tagcategory (The button should only fire a tag if there is a tagcategory present)
//   // ---------------------------------------------------------------------------
//   this.set('tagcategory', '');
//   this.$('button').mousedown();
// });

// test('it calls the tagging service on hover if specified', function(assert) {
//   const taggingStub = Ember.Service.extend({
//     fireTag(category, action, label) {
//       assert.equal(category, 'Category', 'category is passed to tagging on click');
//       assert.equal(action, 'Action', 'action is passed to tagging on click');
//       assert.equal(label, 'Label', 'label is passed to tagging on click');
//     }
//   });
//
//   // Only one tag should be fired, if more are fired it's a bug
//   assert.expect(3);
//
//   this.register('service:tagging', taggingStub);
//   this.inject.service('tagging');
//
//   this.set('tagcategory', 'Category');
//
//   this.render(hbs`
//     {{#core-button
//       taghover=true
//       tagcategory=tagcategory
//       tagaction="Action"
//       taglabel="Label"
//       tagging=tagging}}
//       Tagged Button
//     {{/core-button}}`);
//   this.$('button').mouseenter();
//
//   // Test tagcategory (The button should only fire a tag if there is a tagcategory present)
//   // ---------------------------------------------------------------------------
//   this.set('tagcategory', '');
//   this.$('button').mouseenter();
// });
