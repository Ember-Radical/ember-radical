import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-tabs', 'Integration | Component | rad tabs', {
  integration: true
});

// TODO: test dynamically adding a tab

test('it renders', function(assert) {
  this.render(hbs`
    {{#rad-tabs as |components|}}
      {{#components.content label='Tab A' tabDataTest='tab-a'}}
        <p>Tab A Panel</p>
      {{/components.content}}
      {{#components.content label='Tab B' tabDataTest='tab-b'}}
        <p>Tab B Panel</p>
      {{/components.content}}
    {{/rad-tabs}}
  `);

  assert.ok(this.$('.rad-tabs').length, 'component binds addon component class');
  assert.ok(this.$('.button-style').length, 'component renders button style tabs by default');
  assert.notOk(this.$('.active').length, 'component renders no active tabs by default');
  assert.equal(this.$('[role="tab"]').length, 2, 'component tabs have aria role tab bound');

  // Test data-test existence and passage of name
  assert.ok(this.$('[data-test="tab-a"]').text().indexOf('Tab A') !== -1, 'component renders passed tab name');
  assert.ok(this.$('[data-test="tab-b"]').text().indexOf('Tab B') !== -1, 'component renders passed tab name');

  // Test aria-controls bound to id
  const tabAControls = this.$('[data-test="tab-a"]').attr('aria-controls');
  const tabBControls = this.$('[data-test="tab-b"]').attr('aria-controls');
  assert.ok(tabAControls, 'component tabs have aria-controls value');
  assert.ok(tabBControls, 'component tabs have aria-controls value');
  assert.equal(this.$(`#${tabAControls}`).length, 1, 'component aria-controls matches one id in DOM');
  assert.equal(this.$(`#${tabBControls}`).length, 1, 'component aria-controls matches one id in DOM');
});

test('it yields content subcomponents', function(assert) {
  this.render(hbs`
    {{#rad-tabs as |components|}}
      {{#components.content label='Tab C' tabDataTest='tab-c'}}
        <p>Tab C Content</p>
      {{/components.content}}
      {{#components.content label='Tab D' tabDataTest='tab-d'}}
        <p>Tab D Content</p>
      {{/components.content}}
    {{/rad-tabs}}
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
    {{#rad-tabs defaultTab='tab-e' as |components|}}
      {{#components.content label='Tab E' elementId='tab-e' data-test='tab-e-panel' tabDataTest='tab-e'}}
        <p>Tab E Content</p>
      {{/components.content}}
      {{#components.content label='Tab F' data-test='tab-f-panel' tabDataTest='tab-f'}}
        <p>Tab F Content</p>
      {{/components.content}}
    {{/rad-tabs}}
  `);

  assert.equal(this.$('[data-test="tab-e-panel"]').attr('aria-hidden'), 'false',
    'defaultTab tab panel is shown on render');
  assert.equal(this.$('[data-test="tab-f-panel"]').attr('aria-hidden'), 'true',
    'ONLY defaulTab tab panel is shown on render');
});

test('it hides tab label when hidden is specified', function(assert) {
  this.set('tabHidden', true);

  this.render(hbs`
    {{#rad-tabs defaultTab='tab-g' as |components|}}
      {{#components.content label='Tab G' id='tab-g' data-test='tab-g-panel' tabDataTest='tab-g'}}
        <p>Tab G Content</p>
      {{/components.content}}
      {{#components.content label='Tab H' hidden=tabHidden data-test='tab-h-panel' tabDataTest='tab-h'}}
        <p>Tab H Content</p>
      {{/components.content}}
    {{/rad-tabs}}
  `);

  // Tab H tab button should be hidden
  assert.equal(this.$(this.$('[data-test="tab-g"]').parent()[0]).attr('aria-hidden'), 'false',
    'show default tab button');
  assert.equal(this.$(this.$('[data-test="tab-h"]').parent()[0]).attr('aria-hidden'), 'true',
    'pizza tab is hidden');
  // Tab H panel should be hidden
  assert.equal(this.$('[data-test="tab-g-panel"]').attr('aria-hidden'), 'false',
    'defaultTab tab panel is shown on render');
  assert.equal(this.$('[data-test="tab-h-panel"]').attr('aria-hidden'), 'true',
    'ONLY defaulTab tab panel is shown on render');

  // Update hidden prop and retest that tab button is now showing
  // ---------------------------------------------------------------------------
  this.set('tabHidden', false);

  // Both tab buttons should be shown
  assert.equal(this.$(this.$('[data-test="tab-g"]').parent()[0]).attr('aria-hidden'), 'false',
    'show default tab button');
  assert.equal(this.$(this.$('[data-test="tab-h"]').parent()[0]).attr('aria-hidden'), 'false',
    'show tab h tab button');
  // Tab H panel should still be hidden
  assert.equal(this.$('[data-test="tab-g-panel"]').attr('aria-hidden'), 'false',
    'defaultTab tab panel is shown on render');
  assert.equal(this.$('[data-test="tab-h-panel"]').attr('aria-hidden'), 'true',
    'ONLY defaulTab tab panel is shown on render');
});

test('it shows tabpanels when a tab label is clicked', function(assert) {
  this.set('tabHidden', true);

  this.render(hbs`
    {{#rad-tabs as |components|}}
      {{#components.content label='Tab A' tabDataTest='tab-a' data-test='panel-a'}}
        <p>Tab A Content</p>
      {{/components.content}}
      {{#components.content label='Tab B' tabDataTest='tab-b' data-test='panel-b'}}
        <p>Tab B Content</p>
      {{/components.content}}
      {{#components.content label='Tab C' tabDataTest='tab-c' data-test='panel-c'}}
        <p>Tab C Content</p>
      {{/components.content}}
    {{/rad-tabs}}
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

test('it works as a controlled tabs instance by passing activeId and onChange closures', function(assert) {
  function onChangeClosure({ elementId }) {
    this.set('controlledId', elementId);
  }

  this.set('controlledId', 'tabA');
  this.set('actions.onChange', onChangeClosure);

  this.render(hbs`
    {{#rad-tabs
      activeId=controlledId
      defaultTab=controlledId
      onChange=(action 'onChange')
      as |components|}}
      {{#components.content label='Tab A' tabDataTest='tab-a' data-test='panel-a' elementId='tabA'}}
        <p>Tab A Content</p>
      {{/components.content}}
      {{#components.content label='Tab B' tabDataTest='tab-b' data-test='panel-b' elementId='tabB'}}
        <p>Tab B Content</p>
      {{/components.content}}
      {{#components.content label='Tab C' tabDataTest='tab-c' data-test='panel-c' elementId='tabC'}}
        <p>Tab C Content</p>
      {{/components.content}}
    {{/rad-tabs}}
  `);

  assert.ok(this.$('[data-test="tab-a"]').hasClass('active'), 'tab is active by default');
  assert.equal(this.$('[data-test="panel-a"]').attr('aria-hidden'), 'false', 'panel is shown by default');

  // Simulate user click
  // ---------------------------------------------------------------------------
  this.$('[data-test="tab-c"]').trigger('click');

  assert.ok(this.$('[data-test="tab-c"]').hasClass('active'), 'user click activates tab');
  assert.equal(this.$('[data-test="panel-c"]').attr('aria-hidden'), 'false', 'user click shows panel');

  // Simulate controlled change
  // ---------------------------------------------------------------------------
  this.set('controlledId', 'tabB');

  assert.ok(this.$('[data-test="tab-b"]').hasClass('active'), 'user click activates tab');
  assert.equal(this.$('[data-test="panel-b"]').attr('aria-hidden'), 'false', 'user click shows panel');
});

// Test Custom classNames application
// ---------------------------------------------------------------------------
test('it applies custom classNames from passed props to the component template elements', function(assert) {

  this.render(hbs`{{#rad-tabs
    buttonStyleClassNames='totally-rad-buttons'
    tabClassNames='custom-tab-class'
    tabListClassNames='totally-effing-rad-tab-list'
    defaultTab='tab-1'
    data-test='custom-classes-test' as |components|}}
    {{#components.content
      elementId='tab-1'
      data-test='custom-classes-test-first-tab'}}Hi there.{{/components.content}}
  {{/rad-tabs}}`);

  assert.ok(this.$('[data-test="custom-classes-test"]').find('ul').hasClass('totally-rad-buttons'), 'The custom buttonStyleClassNames should be applied to the ul');

  assert.ok(this.$('[data-test="custom-classes-test"]').find('ul').hasClass('totally-effing-rad-tab-list'), 'The custom tabListClassNames should be applied to the ul');

  assert.ok(this.$('[data-test="custom-classes-test"] li:first-child').hasClass('custom-tab-class'), 'The custom tabClassNames should be applied to the tab item li elements');
});
