import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-drawer', 'Integration | Component | core drawer', {
  integration: true
});

// #1 Simple Invocation Render
// ---------------------------------------------------------------------------
test('it renders (simple invocation)', function(assert) {

  this.setProperties({
    contentText: 'Imagine five paragraphs about puppies instead of this one sentence.',
    targetText: 'Click to read more about puppies'
  });

  this.render(hbs`
    {{core-drawer
      Target=targetText
      Content=contentText
      data-test='basic-render-test'}}
  `);

  // Validate basic output
  assert.ok(this.$('.drawer-target').length, 'component renders target div via simple invocation');
  assert.ok(this.$('.drawer-content').length, 'component renders content div via simple invocation');

  // Test data-test existence and passage of text content
  assert.ok(this.$('[data-test="basic-render-test-target"]').length, 'target subcomponent renders data-test attr');
  assert.ok(this.$('[data-test="basic-render-test-content"]').length, 'content subcomponent renders data-test attr');
  assert.equal(this.$('[data-test="basic-render-test-target-yield"]').text().trim(), this.get('targetText'), 'component renders the target text supplied via Target attr into the target subcomponent');
  assert.equal(this.$('[data-test="basic-render-test-content"]').text().trim(), this.get('contentText'), 'component renders the target text supplied via Content attr into the content subcomponent');

  // Test aria-controls bound to id
  const targetControls = this.$('[data-test="basic-render-test-target"]').attr('aria-controls');
  assert.ok(targetControls, 'target subcomponent has aria-controls value');
  assert.equal(this.$(`#${targetControls}`).length, 1, 'target subcomponent aria-controls matches one id in DOM');
});

// #2 Subcomponent Invocation Render
// ---------------------------------------------------------------------------
test('it yields target and content contextual subcomponents', function(assert) {

  this.setProperties({
    testContent: 'Jackdaws love my brown sphinx of quartz.'
  });

  this.render(hbs`
    {{#core-drawer data-test='subcomponent-test' as |components|}}
      {{#components.target}}Test Target{{/components.target}}
      {{#components.content}}{{testContent}}{{/components.content}}
    {{/core-drawer}}
  `);

  // Validate subcomponents exist
  assert.ok(this.$('[data-test="subcomponent-test-target"]').length, 'the component renders a target contextual subcomponent');
  assert.ok(this.$('[data-test="subcomponent-test-content"]').length, 'the component renders a content contextual subcomponent');

  // Validate subcomponents content
  assert.equal(this.$('[data-test="subcomponent-test-target-yield"]').text().trim(), 'Test Target', 'the target subcomponent renders its content correctly');
  assert.equal(this.$('[data-test="subcomponent-test-content"]').text().trim(), this.get('testContent'), 'the content subcomponent renders its content correctly');

  // Validate aria-expanded on target subcomponent
  assert.equal(this.$('[data-test="subcomponent-test-target"]').attr('aria-expanded'), 'false', 'target subcomponent is not exapnded by default');

  // Validate aria-hidden on content subcomponent
  assert.equal(this.$('[data-test="subcomponent-test-content"]').attr('aria-hidden'), 'true', 'content subcomponent is hidden by default');
});

// #3 Correct button styling for `target`
// ---------------------------------------------------------------------------
test('it uses the correct style for the target subcomponent', function(assert) {

  this.setProperties({
    testContent: 'Jackdaws love my brown sphinx of quartz.'
  });

  this.render(hbs`
    {{#core-drawer
      buttonStyle=false
      data-test='buttonStyle-test' as |components|}}
      {{#components.target}}Test Target{{/components.target}}
      {{#components.content}}{{testContent}}{{/components.content}}
    {{/core-drawer}}
  `);

  assert.ok(this.$('[data-test="buttonStyle-test-target"]').hasClass('btn-link'), 'target renders as a link by default');

  this.render(hbs`
    {{#core-drawer
      buttonStyle=true
      data-test='buttonStyle-test' as |components|}}
      {{#components.target}}Test Target{{/components.target}}
      {{#components.content}}{{testContent}}{{/components.content}}
    {{/core-drawer}}
  `);

  assert.notOk(this.$('[data-test="buttonStyle-test-target"]').hasClass('btn-link'), 'target renders as a button when buttonStyle is set to true');
});

// #4 Test expand/collapse on click
// ---------------------------------------------------------------------------
test('it expands and collapses the drawer when the target is clicked', function(assert) {

  this.render(hbs`
    {{#core-drawer data-test='open-test' as |components|}}
      {{#components.target}}Open Up{{/components.target}}
      {{#components.content}}Check me out{{/components.content}}
    {{/core-drawer}}
  `);

  // Validate that the content container is collapsed
  assert.equal(this.$('[data-test="open-test-target"]').attr('aria-expanded'), 'false', 'target subcomponent is not aria-expanded by default');
  assert.equal(this.$('[data-test="open-test-content"]').attr('aria-hidden'), 'true', 'content subcomponent is hidden by default');

  this.$('[data-test="open-test-target"]').click();

  // Validate that the content container has expanded
  assert.equal(this.$('[data-test="open-test-target"]').attr('aria-expanded'), 'true', 'target subcomponent is aria-expanded after click');
  assert.equal(this.$('[data-test="open-test-content"]').attr('aria-hidden'), 'false', 'content subcomponent is no longer aria-hidden after click');

  this.$('[data-test="open-test-target"]').click();

  // Validate that the content container has collapsed again
  assert.equal(this.$('[data-test="open-test-target"]').attr('aria-expanded'), 'false', 'target subcomponent is not aria-expanded after collapse');
  assert.equal(this.$('[data-test="open-test-content"]').attr('aria-hidden'), 'true', 'content subcomponent is hidden after collapse');
});

// #5 Test expand when external state is manipulated
// ---------------------------------------------------------------------------
test('it expands when external state is manipulated', function(assert) {

  this.setProperties({
    isExpanded: false
  });

  this.render(hbs`
    {{#core-drawer
      externalToggle=isExpanded
      data-test='externalToggle-test' as |components|}}
      {{#components.target}}Open Up{{/components.target}}
      {{#components.content}}Check me out{{/components.content}}
    {{/core-drawer}}
  `);

  // Validate that the content container is collapsed
  assert.equal(this.$('[data-test="externalToggle-test-target"]').attr('aria-expanded'), 'false', 'target subcomponent is not aria-expanded by default');
  assert.equal(this.$('[data-test="externalToggle-test-content"]').attr('aria-hidden'), 'true', 'content subcomponent is hidden by default');

  this.set('isExpanded', true);

  // Validate that the content container has expanded
  assert.equal(this.$('[data-test="externalToggle-test-target"]').attr('aria-expanded'), 'true', 'target subcomponent is aria-expanded after external state changes');
  assert.equal(this.$('[data-test="externalToggle-test-content"]').attr('aria-hidden'), 'false', 'content subcomponent is no longer aria-hidden after external state changes');

  this.set('isExpanded', false);

  // Validate that the content container collapses again
  assert.equal(this.$('[data-test="externalToggle-test-target"]').attr('aria-expanded'), 'false', 'target subcomponent is not aria-expanded after external state changes back to false');
  assert.equal(this.$('[data-test="externalToggle-test-content"]').attr('aria-hidden'), 'true', 'content subcomponent is hidden after external state changes back to false');
});

// #6 Test icons are disabled when `icon=false`
// ---------------------------------------------------------------------------
test('the drawer icon is disabled when icon is set to false', function(assert) {
  this.render(hbs`
    {{core-drawer
      Target='This drawer has no icon'
      Content='Isnt that amazing kids?'
      icon=false
      data-test='no-icon-test'}}
  `);

  assert.notOk(this.$('[data-test="no-icon-test-icon"]').length,
    'No icon should be rendered when `icon` has been set to `false`');
});

// #7 Custom icon names are correctly passed through and referenced
// ---------------------------------------------------------------------------
test('the custom drawer icon is correctly referenced', function(assert) {
  this.render(hbs`
    {{core-drawer
      Target='This drawer has no icon'
      Content='Isnt that amazing kids?'
      icon='steve-brule'
      data-test='custom-icon-test'}}
  `);

  assert.ok(this.$('[data-test="custom-icon-test-target-icon"] use').attr('xlink:href').includes('#steve-brule'),
    'The custom icon reference should be correctly rendered');
});
