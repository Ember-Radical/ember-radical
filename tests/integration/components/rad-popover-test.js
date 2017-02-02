import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-popover', 'Integration | Component | rad popover', {
  integration: true
});

// #1 Basic render test
// ---------------------------------------------------------------------------
test('it renders', function(assert) {
  this.render(hbs`
    {{#rad-popover data-test="render-test" as |components|}}
      {{#components.target}}Render test target{{/components.target}}
      {{#components.content}}Render test content{{/components.content}}
    {{/rad-popover}}
  `);

  assert.ok(this.$('[data-test="render-test"]').length, 'The component should render');
  assert.ok(this.$('[data-test="render-test-target"]').is('button'), 'The component should render a button as its target subcomponent');
  assert.ok(this.$('[data-test="render-test-content"]').length, 'The component should render a content subcomponent when invoked');
});

// #2 Verify accessibility attrs
// ---------------------------------------------------------------------------
test('Accessibility attrs are set up correctly', function(assert) {
  this.render(hbs`
    {{#rad-popover data-test="accessibility-test" as |components|}}
      {{#components.target}}Accessibility test target{{/components.target}}
      {{#components.content}}Accessibility test content{{/components.content}}
    {{/rad-popover}}
  `);

  assert.equal(this.$('[data-test="accessibility-test-target"]').attr('aria-describedby'), this.$('[data-test="accessibility-test-content"]').attr('id'), 'The aria-describedby attribute of the target subcomponent should match the id of the content subcomponent');
});

// #3 Verify content passthrough
// ---------------------------------------------------------------------------
test('Content is passed through correctly', function(assert) {
  this.render(hbs`
    {{#rad-popover data-test="content-test" as |components|}}
      {{#components.target}}Content test target{{/components.target}}
      {{#components.content}}Content test content{{/components.content}}
    {{/rad-popover}}
  `);

  assert.equal(this.$('[data-test="content-test-target"]').text().trim(),
    'Content test target', 'The target subcomponent should display the expected text inside of the button');
  assert.equal(this.$('[data-test="content-test-content"]').text().trim(),
    'Content test content', 'The content subcomponent should display the expected text inside of itself');
});

// #4 Hovering on the popover causes it to become visible
// ---------------------------------------------------------------------------
test('Popover becomes visible on hover', function(assert) {
  this.render(hbs`
    {{#rad-popover data-test="interact-test" as |components|}}
      {{#components.target}}Interact test target{{/components.target}}
      {{#components.content}}Interact test content{{/components.content}}
    {{/rad-popover}}
  `);

  // Confirm default state
  assert.equal(this.$('[data-test="interact-test-content"]').attr('aria-hidden'), 'true', 'The aria-hidden attribute should be set to true by default');
  assert.equal(this.$('[data-test="interact-test-content"]').css('display'), 'none', 'The display property should be hidden by default');

  // Simulate mouseEnter
  this.$('[data-test="interact-test-target"]').mouseenter();

  assert.equal(this.$('[data-test="interact-test-content"]').attr('aria-hidden'), 'false', 'The aria-hidden attribute should be set to false on mouseEnter');
  assert.equal(this.$('[data-test="interact-test-content"]').css('display'), 'block', 'The display property should be block on mouseEnter');

  // Simulate mouseLeave
  this.$('[data-test="interact-test-target"]').mouseleave();

  assert.equal(this.$('[data-test="interact-test-content"]').attr('aria-hidden'), 'true', 'The aria-hidden attribute should be set to true again on mouseLeave');
  assert.equal(this.$('[data-test="interact-test-content"]').css('display'), 'none', 'The display property should be set to hidden again when on mouseLeave');
});

// #5 Basic customization passthrough test
// ---------------------------------------------------------------------------
test('Popover customization attrs are correctly passed through', function(assert) {
  this.render(hbs`
    {{#rad-popover size="large" position="top" data-test="customize-test" as |components|}}
      {{#components.target}}Customize test target{{/components.target}}
      {{#components.content}}Customize test content{{/components.content}}
    {{/rad-popover}}
  `);

  assert.ok(this.$('[data-test="customize-test-content"]').hasClass('large'), 'Size property applies the correct class to the content subcomponent');
  assert.ok(this.$('[data-test="customize-test-content"]').hasClass('top'), 'Position property applies the correct class to the content subcomponent');
});
