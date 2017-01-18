import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-popover/content', 'Integration | Component | core popover/content', {
  integration: true,
  beforeEach: function() {
    this.set('aria-describedby', 'popover-content-test');
  }
});

// #1 Basic render test
// ---------------------------------------------------------------------------
test('it renders', function(assert) {
  this.render(hbs`
    {{#core-popover/content aria-describedby=aria-describedby data-test="render-test-content"}}Render test content{{/core-popover/content}}
  `);

  assert.equal(this.$().text().trim(), 'Render test content', 'The popover content subcomponent should display its supplied content');
});

// #2 Accessibility test
// ---------------------------------------------------------------------------
test('aria-describedby is translated to component ID attr', function(assert) {
  this.render(hbs`
    {{#core-popover/content aria-describedby=aria-describedby data-test="accessibility-test-content"}}Accessibility test content{{/core-popover/content}}
  `);

  assert.equal(this.$('[data-test="accessibility-test-content"]').attr('id'), this.get('aria-describedby'), 'The ID of the content subcomponent element should match the value of the aria-describedby property passed into it.');
});

// #3 Position attribute test
// ---------------------------------------------------------------------------
test('Position attribute applies the correct classes', function(assert) {

  this.set('position', 'top');

  this.render(hbs`
    {{#core-popover/content aria-describedby=aria-describedby position=position data-test="position-test-content"}}Position test content{{/core-popover/content}}
  `);

  assert.ok(this.$('[data-test="position-test-content"]').hasClass('top'), 'The position attribute should apply the corresponding positional CSS class');

  this.set('position', 'bottom-right');

  assert.ok(this.$('[data-test="position-test-content"]').hasClass('bottom-right'), 'The position attribute should be correctly updated with the appropriate positional CSS class');
});

// #4 Size attribute test
// ---------------------------------------------------------------------------
test('Position attribute applies the correct classes', function(assert) {

  this.set('size', 'large');

  this.render(hbs`
    {{#core-popover/content aria-describedby=aria-describedby size=size data-test="size-test-content"}}Size test content{{/core-popover/content}}
  `);

  assert.ok(this.$('[data-test="size-test-content"]').hasClass('large'), 'The size attribute should apply the corresponding sizing CSS class');

  this.set('size', 'small');

  assert.ok(this.$('[data-test="size-test-content"]').hasClass('small'), 'The size attribute should be correctly updated with the appropriate sizing CSS class');
});
