import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-dropdown', 'Integration | Component | core dropdown', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{core-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`);

  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Dropdown Target Dropdown Content', 'component renders inline form correctly');
  assert.equal(this.$('button').length, 1, 'Dropdown target should be a button for accessibility');
  assert.ok(this.$('button').hasClass('btn-link'), 'target should be a link style button by default');

  this.render(hbs`
    {{#core-dropdown as |components|}}
      {{#components.target}}Dropdown Target{{/components.target}}
      {{#components.content}}Dropdown Content{{/components.content}}
    {{/core-dropdown}}
  `);

  assert.equal(this.$().text().trim().replace(/\s\s+/g, ' '), 'Dropdown Target Dropdown Content', 'component renders inline form correctly');
  assert.equal(this.$('button').length, 1, 'Dropdown target should be a button for accessibility');
});

test('it binds the required attributes', function(assert) {
  this.render(hbs`{{core-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`);

  assert.equal(this.$('button').attr('type'), 'button', 'target should be a button with correct type attr');
  assert.equal(this.$('button').attr('aria-haspopup'), 'true', 'target should have popup aria attr');
  assert.equal(this.$('button').attr('aria-expanded'), 'false', 'target should have aria expanded false by default');
  assert.equal(this.$('.dropdown-content').attr('aria-hidden'), 'true', 'content should have aria-hidden true by default');
});

test('property buttonStyles binds the appropriate classes', function(assert) {
  this.render(hbs`{{core-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`);
  assert.ok(this.$('.dropdown-target').hasClass('btn-link'), 'target should default to link styles');

  this.render(hbs`{{core-dropdown Target="Dropdown Target" Content="Dropdown Content" buttonStyle=true}}`);
  assert.notOk(this.$('.dropdown-target').hasClass('btn-link'), 'class btn-link is suppressed with buttonStyle prop');
});

test('content is shown on click', function(assert) {
  this.render(hbs`{{core-dropdown Target="Dropdown Target" Content="Dropdown Content"}}`);

  assert.equal(this.$('.dropdown-target').attr('aria-expanded'), 'false', 'target shows expanded false before click');
  assert.equal(this.$('.dropdown-content').attr('aria-hidden'), 'true', 'content should have aria-hidden true by default');
  assert.equal(this.$('.dropdown-content').css('display'), 'none', 'content is not displayed before click');

  this.$('button.dropdown-target').click();

  assert.equal(this.$('.dropdown-target').attr('aria-expanded'), 'true', 'target shows expanded true after click');
  assert.equal(this.$('.dropdown-content').attr('aria-hidden'), 'false', 'aria-hidden is false after click');
  assert.equal(this.$('.dropdown-content').css('display'), 'block', 'content is displayed after click');

  this.$('button.dropdown-target').click();

  assert.equal(this.$('.dropdown-target').attr('aria-expanded'), 'false', 'target shows expanded false after 2nd click');
  assert.equal(this.$('.dropdown-content').attr('aria-hidden'), 'true', 'content shows have aria-hidden true after 2nd click');
  assert.equal(this.$('.dropdown-content').css('display'), 'none', 'content is not displayed after 2nd click');
});
