import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rad drawer', function(hooks) {
  setupRenderingTest(hooks);

  // #1 Simple Invocation Render
  // ---------------------------------------------------------------------------
  test('it renders (simple invocation)', async function(assert) {

    this.setProperties({
      contentText: 'Imagine five paragraphs about puppies instead of this one sentence.',
      targetText: 'Click to read more about puppies'
    });

    await render(hbs`
      {{rad-drawer
        Target=targetText
        Content=contentText
        data-test='basic-render-test'}}
    `);

    // Validate basic output
    assert.ok(findAll('[data-test="basic-render-test-target"]').length, 'component renders target div via simple invocation');
    assert.ok(findAll('[data-test="basic-render-test-content"]').length, 'component renders content div via simple invocation');

    // Test data-test existence and passage of text content
    assert.equal(find('[data-test="basic-render-test-target-yield"]').textContent.trim(), this.get('targetText'), 'component renders the target text supplied via Target attr into the target subcomponent');
    assert.equal(find('[data-test="basic-render-test-content"]').textContent.trim(), this.get('contentText'), 'component renders the target text supplied via Content attr into the content subcomponent');

    // Test aria-controls bound to id
    const targetControls = find('[data-test="basic-render-test-target"]').getAttribute('aria-controls');
    assert.ok(targetControls, 'target subcomponent has aria-controls value');
    assert.equal(findAll(`#${targetControls}`).length, 1, 'target subcomponent aria-controls matches one id in DOM');
  });

  // #2 Subcomponent Invocation Render
  // ---------------------------------------------------------------------------
  test('it yields target and content contextual subcomponents', async function(assert) {

    this.setProperties({
      testContent: 'Jackdaws love my brown sphinx of quartz.'
    });

    await render(hbs`
      {{#rad-drawer data-test='subcomponent-test' as |components|}}
        {{#components.target
          data-test='subcomponent-test-target'}}
          Test Target
        {{/components.target}}
        {{#components.content
          data-test='subcomponent-test-content'}}
          {{testContent}}
        {{/components.content}}
      {{/rad-drawer}}
    `);

    // Validate subcomponents exist
    assert.ok(findAll('[data-test="subcomponent-test-target"]').length, 'the component renders a target contextual subcomponent');
    assert.ok(findAll('[data-test="subcomponent-test-content"]').length, 'the component renders a content contextual subcomponent');

    // Validate subcomponents content
    assert.equal(find('[data-test="subcomponent-test-target-yield"]').textContent.trim(), 'Test Target', 'the target subcomponent renders its content correctly');
    assert.equal(find('[data-test="subcomponent-test-content"]').textContent.trim(), this.get('testContent'), 'the content subcomponent renders its content correctly');

    // Validate aria-expanded on target subcomponent
    assert.equal(find('[data-test="subcomponent-test-target"]').getAttribute('aria-expanded'), 'false', 'target subcomponent is not expanded by default');

    // Validate aria-hidden on content subcomponent
    assert.equal(find('[data-test="subcomponent-test-content"]').getAttribute('aria-hidden'), 'true', 'content subcomponent is hidden by default');
  });

  // #3 Correct button styling for `target`
  // ---------------------------------------------------------------------------
  test('it uses the correct style for the target subcomponent', async function(assert) {

    this.setProperties({
      testContent: 'Jackdaws love my brown sphinx of quartz.'
    });

    await render(hbs`
      {{#rad-drawer
        buttonStyle=false
        data-test='buttonStyle-test' as |components|}}
        {{#components.target data-test='buttonStyle-test-target'}}
          Test Target
        {{/components.target}}
        {{#components.content data-test='buttonStyle-test-content'}}
          {{testContent}}
        {{/components.content}}
      {{/rad-drawer}}
    `);

    assert.ok(find('[data-test="buttonStyle-test-target"]').classList.contains('btn-link'), 'target renders as a link by default');

    await render(hbs`
      {{#rad-drawer
        buttonStyle=true
        data-test='buttonStyle-test' as |components|}}
        {{#components.target}}Test Target{{/components.target}}
        {{#components.content}}{{testContent}}{{/components.content}}
      {{/rad-drawer}}
    `);

    assert.notOk(find('[data-test="buttonStyle-test-target"]').classList.contains('btn-link'), 'target renders as a button when buttonStyle is set to true');
  });

  // #4 Test expand/collapse on click
  // ---------------------------------------------------------------------------
  test('it expands and collapses the drawer when the target is clicked', async function(assert) {

    await render(hbs`
      {{#rad-drawer data-test='open-test' as |components|}}
        {{#components.target data-test='open-test-target'}}
          Open Up
        {{/components.target}}
        {{#components.content data-test='open-test-content'}}
          Check me out
        {{/components.content}}
      {{/rad-drawer}}
    `);

    // Validate that the content container is collapsed
    assert.equal(find('[data-test="open-test-target"]').getAttribute('aria-expanded'), 'false', 'target subcomponent is not aria-expanded by default');
    assert.equal(find('[data-test="open-test-content"]').getAttribute('aria-hidden'), 'true', 'content subcomponent is hidden by default');

    await click('[data-test="open-test-target"]');

    // Validate that the content container has expanded
    assert.equal(find('[data-test="open-test-target"]').getAttribute('aria-expanded'), 'true', 'target subcomponent is aria-expanded after click');
    assert.equal(find('[data-test="open-test-content"]').getAttribute('aria-hidden'), 'false', 'content subcomponent is no longer aria-hidden after click');

    await click('[data-test="open-test-target"]');

    // Validate that the content container has collapsed again
    assert.equal(find('[data-test="open-test-target"]').getAttribute('aria-expanded'), 'false', 'target subcomponent is not aria-expanded after collapse');
    assert.equal(find('[data-test="open-test-content"]').getAttribute('aria-hidden'), 'true', 'content subcomponent is hidden after collapse');
  });

  // #5 Test expand when external state is manipulated
  // ---------------------------------------------------------------------------
  test('it expands when external state is manipulated', async function(assert) {

    this.setProperties({
      isHidden: true
    });

    await render(hbs`
      {{#rad-drawer
        hidden=isHidden
        data-test='external-state-test' as |components|}}
        {{#components.target data-test='external-state-test-target'}}
          Open Up
        {{/components.target}}
        {{#components.content data-test='external-state-test-content'}}
          Check me out
        {{/components.content}}
      {{/rad-drawer}}
    `);

    // Validate that the content container is collapsed
    assert.equal(find('[data-test="external-state-test-target"]').getAttribute('aria-expanded'), 'false', 'target subcomponent is not aria-expanded by default');
    assert.equal(find('[data-test="external-state-test-content"]').getAttribute('aria-hidden'), 'true', 'content subcomponent is hidden by default');

    this.set('isHidden', false);

    // Validate that the content container has expanded
    assert.equal(find('[data-test="external-state-test-target"]').getAttribute('aria-expanded'), 'true', 'target subcomponent is aria-expanded after external state changes');
    assert.equal(find('[data-test="external-state-test-content"]').getAttribute('aria-hidden'), 'false', 'content subcomponent is no longer aria-hidden after external state changes');

    this.set('isHidden', true);

    // Validate that the content container collapses again
    assert.equal(find('[data-test="external-state-test-target"]').getAttribute('aria-expanded'), 'false', 'target subcomponent is not aria-expanded after external state changes back to false');
    assert.equal(find('[data-test="external-state-test-content"]').getAttribute('aria-hidden'), 'true', 'content subcomponent is hidden after external state changes back to false');
  });

  // #6 Test icons are disabled when `icon=false`
  // ---------------------------------------------------------------------------
  test('the drawer icon is disabled when icon is set to false', async function(assert) {
    await render(hbs`
      {{rad-drawer
        Target='This drawer has no icon'
        Content='Isnt that amazing kids?'
        icon=false
        data-test='no-icon-test'}}
    `);

    assert.notOk(findAll('[data-test="no-icon-test-icon"]').length,
      'No icon should be rendered when `icon` has been set to `false`');
  });

  // #7 Custom icon names are correctly passed through and referenced
  // ---------------------------------------------------------------------------
  test('the custom drawer icon is correctly referenced', async function(assert) {
    await render(hbs`
      {{rad-drawer
        Target='This drawer has no icon'
        Content='Isnt that amazing kids?'
        icon='steve-brule'
        data-test='custom-icon-test'}}
    `);

    assert.ok(find('[data-test="custom-icon-test-target-icon"] use').getAttribute('href').includes('#steve-brule'),
      'The custom icon reference should be correctly rendered');
  });
});
