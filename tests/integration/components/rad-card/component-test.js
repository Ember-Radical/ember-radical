import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-card', 'Integration | Component | rad card', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#rad-card as |components|}}
      {{#components.title}}Card title{{/components.title}}
      {{#components.body}}Card body{{/components.body}}
      {{#components.footer}}Card body{{/components.footer}}
    {{/rad-card}}
  `);

  assert.ok(this.$('.rad-card').length, 'renders root element');
  assert.ok(this.$('.rad-card').hasClass('card-default'), 'renders default brand class');
  assert.ok(this.$('.card-title').length, 'renders title element');
  assert.ok(this.$('.card-body').length, 'renders body element');
  assert.ok(this.$('.card-footer').length, 'renders footer element');
});

test('it renders brand class', function(assert) {
  this.render(hbs`
    {{#rad-card brand="primary" as |components|}}
      {{#components.body}}Card body{{/components.body}}
    {{/rad-card}}
  `);

  assert.ok(this.$('.rad-card').hasClass('card-primary'), 'renders primary brand class');
});
