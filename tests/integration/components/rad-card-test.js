import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rad card', function(hooks) {
  setupRenderingTest(hooks);

  // #1 Basic Render Test
  // ---------------------------------------------------------------------------

  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-card as |components|}}
        {{#components.title}}Card title{{/components.title}}
        {{#components.body}}Card body{{/components.body}}
        {{#components.footer}}Card body{{/components.footer}}
      {{/rad-card}}
    `);

    assert.ok(findAll('.rad-card').length, 'renders root element');
    assert.ok(find('.rad-card').classList.contains('card-default'), 'renders default brand class');
    assert.ok(findAll('.card-title').length, 'renders title element');
    assert.ok(findAll('.card-body').length, 'renders body element');
    assert.ok(findAll('.card-footer').length, 'renders footer element');
  });

  // #2 Brand Class Test
  // ---------------------------------------------------------------------------

  test('it renders brand class', async function(assert) {
    await render(hbs`
      {{#rad-card brand="primary" as |components|}}
        {{#components.body}}Card body{{/components.body}}
      {{/rad-card}}
    `);

    assert.ok(find('.rad-card').classList.contains('card-primary'), 'renders primary brand class');
  });

  // #3 Custom classNames Test
  // ---------------------------------------------------------------------------

  test('it applies custom classNames from passed props to the component template elements', async function(assert) {
    await render(hbs`
      {{#rad-card
        classNames='custom-card-root-class'
        cardBodyClassNames='crazy-card-body'
        cardFooterClassNames='totally-rad-footer'
        cardTitleClassNames='supes-amazing-title'
        data-test='class-test-root' as |components|}}
        {{#components.title data-test='class-test-title'}}Hey{{/components.title}}
        {{#components.body data-test='class-test-body'}}Hi{{/components.body}}
        {{#components.footer data-test='class-test-footer'}}Yo{{/components.footer}}
      {{/rad-card}}
    `);

    assert.ok(find('[data-test="class-test-root"]').classList.contains('custom-card-root-class'));

    assert.ok(find('[data-test="class-test-title"]').classList.contains('supes-amazing-title'), 'The custom cardClassNames should be applied to the component root element');

    assert.ok(find('[data-test="class-test-body"]').classList.contains('crazy-card-body'), 'The custom cardClassNames should be applied to the component root element');

    assert.ok(find('[data-test="class-test-footer"]').classList.contains('totally-rad-footer'), 'The custom cardClassNames should be applied to the component root element');
  });
});
