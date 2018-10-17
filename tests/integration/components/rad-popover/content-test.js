import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rad popover/content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('aria-describedby', 'popover-content-test');
  });

  // #1 Basic render test
  // ---------------------------------------------------------------------------
  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-popover/content aria-describedby=aria-describedby data-test="render-test-content"}}Render test content{{/rad-popover/content}}
    `);

    assert.equal(find('*').textContent.trim(), 'Render test content', 'The popover content subcomponent should display its supplied content');
  });

  // #2 Accessibility test
  // ---------------------------------------------------------------------------
  test('aria-describedby is translated to component ID attr', async function(assert) {
    await render(hbs`
      {{#rad-popover/content aria-describedby=aria-describedby data-test="accessibility-test-content"}}Accessibility test content{{/rad-popover/content}}
    `);

    assert.equal(find('[data-test="accessibility-test-content"]').id, this.get('aria-describedby'), 'The ID of the content subcomponent element should match the value of the aria-describedby property passed into it.');
  });

  // #3 Position attribute test
  // ---------------------------------------------------------------------------
  test('Position attribute applies the correct classes', async function(assert) {

    this.set('position', 'top');

    await render(hbs`
      {{#rad-popover/content aria-describedby=aria-describedby position=position data-test="position-test-content"}}Position test content{{/rad-popover/content}}
    `);

    assert.ok(find('[data-test="position-test-content"]').classList.contains('top'), 'The position attribute should apply the corresponding positional CSS class');

    this.set('position', 'bottom-right');

    assert.ok(find('[data-test="position-test-content"]').classList.contains('bottom-right'), 'The position attribute should be correctly updated with the appropriate positional CSS class');
  });

  // #4 Size attribute test
  // ---------------------------------------------------------------------------
  test('Size attribute applies the correct classes', async function(assert) {

    this.set('size', 'large');

    await render(hbs`
      {{#rad-popover/content aria-describedby=aria-describedby size=size data-test="size-test-content"}}Size test content{{/rad-popover/content}}
    `);

    assert.ok(find('[data-test="size-test-content"]').classList.contains('large'), 'The size attribute should apply the corresponding sizing CSS class');

    this.set('size', 'small');

    assert.ok(find('[data-test="size-test-content"]').classList.contains('small'), 'The size attribute should be correctly updated with the appropriate sizing CSS class');
  });
});
