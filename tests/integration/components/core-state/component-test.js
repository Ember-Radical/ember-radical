import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-state', 'Integration | Component | core state', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{#core-state as |state stateActions|}}{{/core-state}}`);

  assert.equal(this.$().text().trim(), '', 'Component renders block form correctly');
});

test('it can be used as a state tracker', function(assert) {
  this.render(hbs`
    {{#core-state as |state stateActions|}}
      {{#core-button click=(action stateActions.open) id="open"}}Open{{/core-button}}
      {{#core-button click=(action stateActions.close) id="close"}}Close{{/core-button}}

      <div aria-hidden={{if state 'false' 'true'}} id="secrets">SECRET CONTENT</div>
    {{/core-state}}
  `);

  assert.equal(this.$('#secrets').css('display'), 'none', 'active state is false by default, so things can start hidden');

  this.$('#open').click(); // Call the `open` action

  assert.equal(this.$('#secrets').css('display'), 'block', 'active state is true after open action is called');

  this.$('#close').click(); // Call the `close` action

  assert.equal(this.$('#secrets').css('display'), 'none', 'active state is false after close action is called');
});

test('it can be used as a state toggler', function(assert) {
  this.render(hbs`
    {{#core-state as |state stateActions|}}
      {{#core-button click=(action stateActions.toggleState) id="toggle"}}Toggle{{/core-button}}
      <div aria-hidden={{if state 'false' 'true'}} id="secrets">SECRET CONTENT</div>
    {{/core-state}}
  `);

  assert.equal(this.$('#secrets').css('display'), 'none', 'active state is false by default, so things can start hidden');

  this.$('#toggle').click(); // Call the `open` action

  assert.equal(this.$('#secrets').css('display'), 'block', 'active state is true after open action is called');

  this.$('#toggle').click(); // Call the `close` action

  assert.equal(this.$('#secrets').css('display'), 'none', 'active state is false after close action is called');
});
