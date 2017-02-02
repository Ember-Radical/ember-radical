import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-button', 'Integration | Component | rad button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{#rad-button}}Default button{{/rad-button}}`);

  assert.equal(this.$().text().trim(), 'Default button', 'component renders block form correctly');
  assert.equal(this.$('button').length, 1, 'component is a button element');
  assert.ok(this.$('button').hasClass('btn'), 'component always bind class btn');
  assert.ok(this.$('button').hasClass('rad-button'), 'component renders addon class name');
});

test('it renders brand classes', function(assert) {
  this.render(hbs`{{#rad-button brand="success"}}Default button{{/rad-button}}`);
  assert.ok(this.$('button').hasClass('btn-success'), 'the component binds branding class');
});

test('it uses prop link to output link class', function(assert) {
  // Not configured default link=false
  this.render(hbs`{{#rad-button}}Default button{{/rad-button}}`);
  assert.notOk(this.$('button').hasClass('btn-link'), 'component does not render btn-link by default');

  // link = false
  this.render(hbs`{{#rad-button link=false}}Default button{{/rad-button}}`);
  assert.notOk(this.$('button').hasClass('btn-link'), 'component does not render btn-link when link=false');

  // explicit link = true
  this.render(hbs`{{#rad-button link=true}}Default button{{/rad-button}}`);
  assert.ok(this.$('button').hasClass('btn-link'), 'component renders btn-link class when link=true');
});

test('it binds passed attributes', function(assert) {
  this.render(hbs`
    {{#rad-button
      aria-describedby='describes'}}
      Button
    {{/rad-button}}`);

  assert.equal(this.$('button').attr('aria-describedby'), 'describes',
    'component binds aria-describedby');
});

test('it calls the tagging service on click', function(assert) {
  const taggingStub = Ember.Service.extend({
    fireTag({ tagcategory, tagaction, taglabel}) {
      assert.equal(tagcategory, 'Category', 'category is passed to tagging on click');
      assert.equal(tagaction, 'Action', 'action is passed to tagging on click');
      assert.equal(taglabel, 'Label', 'label is passed to tagging on click');
    }
  });

  // Only one tag should be fired, if more are fired it's a bug
  assert.expect(3);

  this.register('service:tagging', taggingStub);
  this.set('tagcategory', 'Category');

  this.render(hbs`
    {{#rad-button
      tagcategory=tagcategory
      tagaction="Action"
      taglabel="Label"}}
      Tagged Button
    {{/rad-button}}`);
  this.$('button').mousedown();

  // Test tagcategory (The button should only fire a tag if there is a tagcategory present)
  // ---------------------------------------------------------------------------
  this.set('tagcategory', '');
  this.$('button').mousedown();
});

test('it calls the tagging service on hover if specified', function(assert) {
  const taggingStub = Ember.Service.extend({
    fireTag({ tagcategory, tagaction, taglabel }) {
      assert.equal(tagcategory, 'Category', 'category is passed to tagging on click');
      assert.equal(tagaction, 'Action', 'action is passed to tagging on click');
      assert.equal(taglabel, 'Label', 'label is passed to tagging on click');
    }
  });

  // Only one tag should be fired, if more are fired it's a bug
  assert.expect(3);

  this.register('service:tagging', taggingStub);
  this.set('tagcategory', 'Category');

  this.render(hbs`
    {{#rad-button
      taghover=true
      tagcategory=tagcategory
      tagaction="Action"
      taglabel="Label"}}
      Tagged Button
    {{/rad-button}}`);
  this.$('button').mouseenter();

  // Test tagcategory (The button should only fire a tag if there is a tagcategory present)
  // ---------------------------------------------------------------------------
  this.set('tagcategory', '');
  this.$('button').mouseenter();
});
