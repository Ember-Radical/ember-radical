import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-card', 'Integration | Component | rad card', {
  integration: true
});

// #1 Basic Render Test
// ---------------------------------------------------------------------------

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

// #2 Brand Class Test
// ---------------------------------------------------------------------------

test('it renders brand class', function(assert) {
  this.render(hbs`
    {{#rad-card brand="primary" as |components|}}
      {{#components.body}}Card body{{/components.body}}
    {{/rad-card}}
  `);

  assert.ok(this.$('.rad-card').hasClass('card-primary'), 'renders primary brand class');
});

// #3 Custom classNames Test
// ---------------------------------------------------------------------------

test('it applies custom classNames from passed props to the component template elements', function(assert) {
  this.render(hbs`
    {{#rad-card
      cardClassNames='custom-card-root-class'
      cardBodyClassNames='crazy-card-body'
      cardFooterClassNames='totally-rad-footer'
      cardTitleClassNames='supes-amazing-title'
      data-test='class-test-root' as |components|}}
      {{#components.title data-test='class-test-title'}}Hey{{/components.title}}
      {{#components.body data-test='class-test-body'}}Hi{{/components.body}}
      {{#components.footer data-test='class-test-footer'}}Yo{{/components.footer}}
    {{/rad-card}}
  `);

  console.log(this.$().html());

  assert.ok(this.$('[data-test="class-test-root"]').hasClass('custom-card-root-class'), 'The custom cardClassNames should be applied to the component root element');

  assert.ok(this.$('[data-test="class-test-title"]').hasClass('supes-amazing-title'), 'The custom cardClassNames should be applied to the component root element');

  assert.ok(this.$('[data-test="class-test-body"]').hasClass('crazy-card-body'), 'The custom cardClassNames should be applied to the component root element');

  assert.ok(this.$('[data-test="class-test-footer"]').hasClass('totally-rad-footer'), 'The custom cardClassNames should be applied to the component root element');
});
