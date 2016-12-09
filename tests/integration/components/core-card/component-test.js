import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-card', 'Integration | Component | core card', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#core-card as |components|}}
      {{#components.title}}Card title{{/components.title}}
      {{#components.body}}Card body{{/components.body}}
      {{#components.footer}}Card body{{/components.footer}}
    {{/core-card}}
  `);

  assert.ok(this.$('.core-card').length, 'renders root element');
  assert.ok(this.$('.core-card').hasClass('card-default'), 'renders default brand class');
  assert.ok(this.$('.card-title').length, 'renders title element');
  assert.ok(this.$('.card-body').length, 'renders body element');
  assert.ok(this.$('.card-footer').length, 'renders footer element');
});

test('it renders brand class', function(assert) {
  this.render(hbs`
    {{#core-card brand="primary" as |components|}}
      {{#components.body}}Card body{{/components.body}}
    {{/core-card}}
  `);

  assert.ok(this.$('.core-card').hasClass('card-primary'), 'renders primary brand class');
});
