import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-tabs', 'Integration | Component | core tabs', {
  integration: true
});

// TODO:
// - test dynamically adding a tab

test('it renders', function(assert) {
  this.render(hbs`
    {{#core-tabs as |components|}}
      {{#components.content name='Jet Skri' id='jetSki' tabDataTest='jet-ski'}}
        <p>I was gonna invent a jet skri but then I realized I already own like twenty of them so why bother.</p>
      {{/components.content}}
      {{#components.content name='Prizza Oven' id='pizzaOven' tabDataTest='pizza-oven'}}
        <p>I have my own prizza oven! I can make my own pizzas all the time, and I can put on as many toppings as I want.</p>
      {{/components.content}}
    {{/core-tabs}}
  `);

  assert.ok(this.$('.core-tabs').length, 'component binds addon component class');
  assert.ok(this.$('.button-style').length, 'component renders button style tabs by default');
  assert.notOk(this.$('.active').length, 'component does not render active tab without passed defaultTab');
  assert.equal(this.$('[role="tab"]').length, 2, 'component tabs have aria role tab bound');

  // Test data-test existence and passage of name
  assert.ok(this.$('[data-test="jet-ski"]').text().includes('Jet Skri'), 'component renders passed tab name');
  assert.ok(this.$('[data-test="pizza-oven"]').text().includes('Prizza Oven'), 'component renders passed tab name');

  // Test aria-controls bound to id
  const jetSkiControls = this.$('[data-test="jet-ski"]').attr('aria-controls');
  const pizzaOvenControls = this.$('[data-test="pizza-oven"]').attr('aria-controls');
  assert.ok(jetSkiControls, 'component tabs have aria-controls value');
  assert.ok(pizzaOvenControls, 'component tabs have aria-controls value');
  assert.equal(this.$(`#${jetSkiControls}`).length, 1, 'component aria-controls matches one id in DOM');
  assert.equal(this.$(`#${pizzaOvenControls}`).length, 1, 'component aria-controls matches one id in DOM');
});

test('it yields content subcomponents', function(assert) {
  this.render(hbs`
    {{#core-tabs as |components|}}
      {{#components.content name='Jet Skri' id='jetSki' tabDataTest='jet-ski'}}
        <p>I was gonna invent a jet skri but then I realized I already own like twenty of them so why bother.</p>
      {{/components.content}}
      {{#components.content name='Prizza Oven' id='pizzaOven' tabDataTest='pizza-oven'}}
        <p>I have my own prizza oven! I can make my own pizzas all the time, and I can put on as many toppings as I want.</p>
      {{/components.content}}
    {{/core-tabs}}
  `);

  // Validate content subcomponents
  const tabConent = this.$('[role="tabpanel"]').toArray();
  assert.equal(tabConent.length, 2, 'component yields each subcomponent with role tabpanel');
  tabConent.forEach(tab => {
    let $tab = this.$(tab);
    assert.equal($tab.attr('aria-hidden'), 'true', 'subcomponent content is hidden by default');
    assert.equal($tab.attr('role'), 'tabpanel', 'subcomponent aria role tabpanel is bound by default');
  });
});

test('it uses property defaultTab to show a tab by default', function(assert) {
  this.render(hbs`
    {{#core-tabs defaultTab='jetSki' as |components|}}
      {{#components.content name='Jet Skri' id='jetSki' tabDataTest='jet-ski'}}
        <p>I was gonna invent a jet skri but then I realized I already own like twenty of them so why bother.</p>
      {{/components.content}}
      {{#components.content name='Prizza Oven' id='pizzaOven' tabDataTest='pizza-oven'}}
        <p>I have my own prizza oven! I can make my own pizzas all the time, and I can put on as many toppings as I want.</p>
      {{/components.content}}
    {{/core-tabs}}
  `);

  assert.equal(this.$('#jetSki').attr('aria-hidden'), 'false', 'default tab is shown on render');
  assert.equal(this.$('#pizzaOven').attr('aria-hidden'), 'true', 'ONLY default tab is shown on render');
});

test('it hides tab label when hidden is specified', function(assert) {
  this.set('tabHidden', true);

  this.render(hbs`
    {{#core-tabs defaultTab='jetSki' as |components|}}
      {{#components.content name='Jet Skri' id='jetSki' tabDataTest='jet-ski'}}
        <p>I was gonna invent a jet skri but then I realized I already own like twenty of them so why bother.</p>
      {{/components.content}}
      {{#components.content name='Prizza Oven' id='pizzaOven' hidden=tabHidden tabDataTest='pizza-oven'}}
        <p>I have my own prizza oven! I can make my own pizzas all the time, and I can put on as many toppings as I want.</p>
      {{/components.content}}
    {{/core-tabs}}
  `);

  // Panels and buttons should only show jet-ski
  assert.equal(this.$('#jetSki').attr('aria-hidden'), 'false', 'default tab is shown on render');
  assert.equal(this.$('#pizzaOven').attr('aria-hidden'), 'true', 'ONLY default tab is shown on render');
  // Pizza Oven tab button should be hidden
  assert.equal(this.$(this.$('[data-test="jet-ski"]').parent()[0]).attr('aria-hidden'), 'false', 'show default tab button');
  assert.equal(this.$(this.$('[data-test="pizza-oven"]').parent()[0]).attr('aria-hidden'), 'true', 'pizza tab is hidden');

  // Update hidden prop and retest that tab button is now showing
  // ---------------------------------------------------------------------------
  this.set('tabHidden', false);

  // Panels should only show jet-ski
  assert.equal(this.$('#jetSki').attr('aria-hidden'), 'false', 'default tab is shown');
  assert.equal(this.$('#pizzaOven').attr('aria-hidden'), 'true', 'ONLY default tab is shown');
  // Pizza Oven tab button should be shown
  assert.equal(this.$(this.$('[data-test="jet-ski"]').parent()[0]).attr('aria-hidden'), 'false', 'show default tab button');
  assert.equal(this.$(this.$('[data-test="pizza-oven"]').parent()[0]).attr('aria-hidden'), 'false', 'show pizza tab button');
});

test('it shows tabpanels when a tab label is clicked', function(assert) {
  this.set('tabHidden', true);

  this.render(hbs`
    {{#core-tabs as |components|}}
      {{#components.content name='Tab A' tabDataTest='tab-a' data-test='panel-a'}}
        <p>Tab A Content</p>
      {{/components.content}}
      {{#components.content name='Tab B' tabDataTest='tab-b' data-test='panel-b'}}
        <p>Tab B Content</p>
      {{/components.content}}
      {{#components.content name='Tab C' tabDataTest='tab-c' data-test='panel-c'}}
        <p>Tab C Content</p>
      {{/components.content}}
    {{/core-tabs}}
  `);

  const tabPanels = this.$('[role="tabpanel"]').toArray();
  const tabs = this.$('[role="tab"]').toArray();
  // No panels should be shown by default
  tabPanels.forEach(tabPanel => {
    assert.equal(this.$(tabPanel).attr('aria-hidden'), 'true', 'tab panels hidden on render');
  });
  tabs.forEach(tab => {
    assert.notOk(this.$(tab).hasClass('active'), 'no tab should be active');
  });

  // Click Tab A
  // ---------------------------------------------------------------------------
  this.$('[data-test="tab-a"]').click();
  // Tab A should now have class active
  tabs.forEach(tab => {
    if (this.$(tab).attr('data-test') === 'tab-a') {
      assert.ok(this.$(tab).hasClass('active'), 'tab a should have class active after being clicked');
    } else {
      assert.notOk(this.$(tab).hasClass('active'), 'other tabs should not have class active');
    }
  });
  // Panel for Tab A only should show
  assert.equal(this.$('[data-test="panel-a"]').attr('aria-hidden'), 'false',
    'tabpanel A shows after clicking tab');
  assert.equal(this.$('[data-test="panel-b"]').attr('aria-hidden'), 'true', 'tabpanel B still hidden');
  assert.equal(this.$('[data-test="panel-c"]').attr('aria-hidden'), 'true', 'tabpanel C still hidden');

  // Click Tab C
  // ---------------------------------------------------------------------------
  this.$('[data-test="tab-c"]').click();
  // Tab C should now have active class
  tabs.forEach(tab => {
    if (this.$(tab).attr('data-test') === 'tab-c') {
      assert.ok(this.$(tab).hasClass('active'), 'tab c should have class active after being clicked');
    } else {
      assert.notOk(this.$(tab).hasClass('active'), 'other tabs should not have class active');
    }
  });
  // Panel for Tab C only should show
  assert.equal(this.$('[data-test="panel-a"]').attr('aria-hidden'), 'true', 'tabpanel A hidden');
  assert.equal(this.$('[data-test="panel-b"]').attr('aria-hidden'), 'true', 'tabpanel B hidden');
  assert.equal(this.$('[data-test="panel-c"]').attr('aria-hidden'), 'false', 'tabpanel C shown');
});
