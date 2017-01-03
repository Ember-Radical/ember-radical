import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-tooltip', 'Integration | Component | core tooltip', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{core-tooltip Title="Hover me" Content="For some rad info"}}`);

  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Hover me For some rad info', 'component renders inline form correctly');
  assert.equal(this.$('button').length, 1, 'Tooltip target should be a button for accessibility');
});

test('it binds the required attributes', function(assert) {
  this.render(hbs`{{core-tooltip Title="Hover me" Content="For some rad info"}}`);

  assert.equal(this.$('button').attr('type'), 'button', 'tooltip target should be a button with correct type attr');
  assert.equal(this.$('.tooltip-content').attr('role'), 'tooltip', 'tooltip content should have aria role tooltip');
  assert.equal(this.$('.tooltip-content').attr('aria-hidden'), 'true', 'tooltip content should have aria-hidden true by default');
  assert.equal(this.$('button').attr('aria-describedby'), this.$('.tooltip-content').attr('id'), 'aria-describedby on tooltip target should match id of content');
});

test('property buttonStyle binds the appropriate classes', function(assert) {
  this.render(hbs`{{core-tooltip Title="Hover me" Content="For some rad info"}}`);
  assert.ok(this.$('.tooltip-title').hasClass('btn-link'), 'tooltip title should default to link styles');

  this.render(hbs`{{core-tooltip Title="Hover me" Content="For some rad info" buttonStyle=true}}`);
  assert.notOk(this.$('.tooltip-title').hasClass('btn-link'), 'tooltip title should not have class btn-link when passed true');
});

test('it only shows tooltip content on hover', function(assert) {
  this.render(hbs`{{core-tooltip Title="Hover me" Content="For some rad info"}}`);

  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden on render');

  this.$('button').mouseenter();
  assert.equal(this.$('.tooltip-content').css('display'), 'block', 'content is displayed on button hover');

  this.$('button').mouseleave();
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden again on mouseleave');
});

test('it plays nice with subcomponent title', function(assert) {
  this.render(hbs`
    {{#core-tooltip Content="For some rad info." as |components aria-describedby|}}
      {{#components.title aria-describedby=aria-describedby}}
        Hover me
      {{/components.title}}
    {{/core-tooltip}}
  `);
  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Hover me For some rad info.', 'component renders inline form correctly');
  assert.equal(this.$('button').length, 1, 'Tooltip target should be a button for accessibility');

  // Test all attributes
  assert.equal(this.$('button').attr('type'), 'button', 'tooltip target should be a button with correct type attr');
  assert.equal(this.$('.tooltip-content').attr('role'), 'tooltip', 'tooltip content should have aria role tooltip');
  assert.equal(this.$('.tooltip-content').attr('aria-hidden'), 'true', 'tooltip content should have aria-hidden true by default');
  assert.equal(this.$('button').attr('aria-describedby'), this.$('.tooltip-content').attr('id'), 'aria-describedby on tooltip target should match id of content');

  // Test user interaction
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden on render');

  this.$('button').mouseenter();
  assert.equal(this.$('.tooltip-content').css('display'), 'block', 'content is displayed on button hover');

  this.$('button').mouseleave();
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden again on mouseleave');
});

test('it plays nice with subcomponent content', function(assert) {
  this.render(hbs`
    {{#core-tooltip Title="Hover me" as |components aria-describedby hidden|}}
      {{#components.content aria-describedby=aria-describedby hidden=hidden}}
        For some rad info.
      {{/components.content}}
    {{/core-tooltip}}
  `);
  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Hover me For some rad info.', 'component renders inline form correctly');
  assert.equal(this.$('button').length, 1, 'Tooltip target should be a button for accessibility');

  // Test all attributes
  assert.equal(this.$('button').attr('type'), 'button', 'tooltip target should be a button with correct type attr');
  assert.equal(this.$('.tooltip-content').attr('role'), 'tooltip', 'tooltip content should have aria role tooltip');
  assert.equal(this.$('.tooltip-content').attr('aria-hidden'), 'true', 'tooltip content should have aria-hidden true by default');
  assert.equal(this.$('button').attr('aria-describedby'), this.$('.tooltip-content').attr('id'), 'aria-describedby on tooltip target should match id of content');

  // Test user interaction
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden on render');

  this.$('button').mouseenter();
  assert.equal(this.$('.tooltip-content').css('display'), 'block', 'content is displayed on button hover');

  this.$('button').mouseleave();
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden again on mouseleave');
});

test('it plays nice with both subcomponents title+content', function(assert) {
  this.render(hbs`
    {{#core-tooltip as |components aria-describedby hidden|}}
      {{#components.title aria-describedby=aria-describedby}}
        Hover me
      {{/components.title}}
      {{#components.content aria-describedby=aria-describedby hidden=hidden}}
        For some rad info.
      {{/components.content}}
    {{/core-tooltip}}
  `);
  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Hover me For some rad info.', 'component renders inline form correctly');
  assert.equal(this.$('button').length, 1, 'Tooltip target should be a button for accessibility');

  // Test all attributes
  assert.equal(this.$('button').attr('type'), 'button', 'tooltip target should be a button with correct type attr');
  assert.equal(this.$('.tooltip-content').attr('role'), 'tooltip', 'tooltip content should have aria role tooltip');
  assert.equal(this.$('.tooltip-content').attr('aria-hidden'), 'true', 'tooltip content should have aria-hidden true by default');
  assert.equal(this.$('button').attr('aria-describedby'), this.$('.tooltip-content').attr('id'), 'aria-describedby on tooltip target should match id of content');

  // Test user interaction
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden on render');

  this.$('button').mouseenter();
  assert.equal(this.$('.tooltip-content').css('display'), 'block', 'content is displayed on button hover');

  this.$('button').mouseleave();
  assert.equal(this.$('.tooltip-content').css('display'), 'none', 'content is hidden again on mouseleave');
});
