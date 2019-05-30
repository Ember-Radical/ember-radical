import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, find, click, findAll } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | rad tabs', function(hooks) {
  setupRenderingTest(hooks)

  // TODO: test dynamically adding a tab

  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-tabs as |components|}}
        {{#components.content label='Tab A' tabDataTest='tab-a'}}
          <p>Tab A Panel</p>
        {{/components.content}}
        {{#components.content label='Tab B' tabDataTest='tab-b'}}
          <p>Tab B Panel</p>
        {{/components.content}}
      {{/rad-tabs}}
    `)

    assert.ok(findAll('.rad-tabs').length, 'component binds addon component class')
    assert.ok(
      findAll('.button-style').length,
      'component renders button style tabs by default',
    )
    assert.notOk(
      findAll('.active').length,
      'component renders no active tabs by default',
    )
    assert.equal(
      findAll('[role="tab"]').length,
      2,
      'component tabs have aria role tab bound',
    )

    // Test data-test existence and passage of name
    assert.ok(
      find('[data-test="tab-a"]').textContent.indexOf('Tab A') !== -1,
      'component renders passed tab name',
    )
    assert.ok(
      find('[data-test="tab-b"]').textContent.indexOf('Tab B') !== -1,
      'component renders passed tab name',
    )

    // Test aria-controls bound to id
    const tabAControls = find('[data-test="tab-a"]').getAttribute('aria-controls')
    const tabBControls = find('[data-test="tab-b"]').getAttribute('aria-controls')
    assert.ok(tabAControls, 'component tabs have aria-controls value')
    assert.ok(tabBControls, 'component tabs have aria-controls value')
    assert.equal(
      findAll(`#${tabAControls}`).length,
      1,
      'component aria-controls matches one id in DOM',
    )
    assert.equal(
      findAll(`#${tabBControls}`).length,
      1,
      'component aria-controls matches one id in DOM',
    )
  })

  test('it yields content subcomponents', async function(assert) {
    await render(hbs`
      {{#rad-tabs as |components|}}
        {{#components.content label='Tab C' tabDataTest='tab-c'}}
          <p>Tab C Content</p>
        {{/components.content}}
        {{#components.content label='Tab D' tabDataTest='tab-d'}}
          <p>Tab D Content</p>
        {{/components.content}}
      {{/rad-tabs}}
    `)

    // Validate content subcomponents
    const tabConent = findAll('[role="tabpanel"]')
    assert.equal(
      tabConent.length,
      2,
      'component yields each subcomponent with role tabpanel',
    )
    tabConent.forEach(tab => {
      assert.equal(
        tab.getAttribute('aria-hidden'),
        'true',
        'subcomponent content is hidden by default',
      )
      assert.equal(
        tab.getAttribute('role'),
        'tabpanel',
        'subcomponent aria role tabpanel is bound by default',
      )
    })
  })

  test('it uses property defaultTab to show a tab by default', async function(assert) {
    await render(hbs`
      {{#rad-tabs defaultTab='tab-e' as |components|}}
        {{#components.content label='Tab E' elementId='tab-e' data-test='tab-e-panel' tabDataTest='tab-e'}}
          <p>Tab E Content</p>
        {{/components.content}}
        {{#components.content label='Tab F' data-test='tab-f-panel' tabDataTest='tab-f'}}
          <p>Tab F Content</p>
        {{/components.content}}
      {{/rad-tabs}}
    `)

    assert.equal(
      find('[data-test="tab-e-panel"]').getAttribute('aria-hidden'),
      'false',
      'defaultTab tab panel is shown on render',
    )
    assert.equal(
      find('[data-test="tab-f-panel"]').getAttribute('aria-hidden'),
      'true',
      'ONLY defaulTab tab panel is shown on render',
    )
  })

  test('it hides tab label when hidden is specified', async function(assert) {
    this.set('tabHidden', true)

    await render(hbs`
      {{#rad-tabs defaultTab='tab-g' as |components|}}
        {{#components.content label='Tab G' id='tab-g' data-test='tab-g-panel' tabDataTest='tab-g'}}
          <p>Tab G Content</p>
        {{/components.content}}
        {{#components.content label='Tab H' hidden=tabHidden data-test='tab-h-panel' tabDataTest='tab-h'}}
          <p>Tab H Content</p>
        {{/components.content}}
      {{/rad-tabs}}
    `)

    // Tab H tab button should be hidden
    assert.equal(
      find('[data-test="tab-g"]').parentNode.getAttribute('aria-hidden'),
      'false',
      'show default tab button',
    )
    assert.equal(
      find('[data-test="tab-h"]').parentNode.getAttribute('aria-hidden'),
      'true',
      'pizza tab is hidden',
    )
    // Tab H panel should be hidden
    assert.equal(
      find('[data-test="tab-g-panel"]').getAttribute('aria-hidden'),
      'false',
      'defaultTab tab panel is shown on render',
    )
    assert.equal(
      find('[data-test="tab-h-panel"]').getAttribute('aria-hidden'),
      'true',
      'ONLY defaulTab tab panel is shown on render',
    )

    // Update hidden prop and retest that tab button is now showing
    // ---------------------------------------------------------------------------
    this.set('tabHidden', false)

    // Both tab buttons should be shown
    assert.equal(
      find('[data-test="tab-g"]').parentNode.getAttribute('aria-hidden'),
      'false',
      'show default tab button',
    )
    assert.equal(
      find('[data-test="tab-h"]').parentNode.getAttribute('aria-hidden'),
      'false',
      'show tab h tab button',
    )
    // Tab H panel should still be hidden
    assert.equal(
      find('[data-test="tab-g-panel"]').getAttribute('aria-hidden'),
      'false',
      'defaultTab tab panel is shown on render',
    )
    assert.equal(
      find('[data-test="tab-h-panel"]').getAttribute('aria-hidden'),
      'true',
      'ONLY defaulTab tab panel is shown on render',
    )
  })

  test('it shows tabpanels when a tab label is clicked', async function(assert) {
    this.set('tabHidden', true)

    await render(hbs`
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
    `)

    const tabPanels = findAll('[role="tabpanel"]')
    const tabs = findAll('[role="tab"]')
    // No panels should be shown by default
    tabPanels.forEach(tabPanel => {
      assert.equal(
        tabPanel.getAttribute('aria-hidden'),
        'true',
        'tab panels hidden on render',
      )
    })
    tabs.forEach(tab => {
      assert.notOk(tab.classList.contains('active'), 'no tab should be active')
    })

    // Click Tab A
    // ---------------------------------------------------------------------------
    await click('[data-test="tab-a"]')
    // Tab A should now have class active
    tabs.forEach(tab => {
      if (tab.getAttribute('data-test') === 'tab-a') {
        assert.ok(
          tab.classList.contains('active'),
          'tab a should have class active after being clicked',
        )
      } else {
        assert.notOk(
          tab.classList.contains('active'),
          'other tabs should not have class active',
        )
      }
    })
    // Panel for Tab A only should show
    assert.equal(
      find('[data-test="panel-a"]').getAttribute('aria-hidden'),
      'false',
      'tabpanel A shows after clicking tab',
    )
    assert.equal(
      find('[data-test="panel-b"]').getAttribute('aria-hidden'),
      'true',
      'tabpanel B still hidden',
    )
    assert.equal(
      find('[data-test="panel-c"]').getAttribute('aria-hidden'),
      'true',
      'tabpanel C still hidden',
    )

    // Click Tab C
    // ---------------------------------------------------------------------------
    await click('[data-test="tab-c"]')
    // Tab C should now have active class
    tabs.forEach(tab => {
      if (tab.dataset.test === 'tab-c') {
        assert.ok(
          tab.classList.contains('active'),
          'tab c should have class active after being clicked',
        )
      } else {
        assert.notOk(
          tab.classList.contains('active'),
          'other tabs should not have class active',
        )
      }
    })
    // Panel for Tab C only should show
    assert.equal(
      find('[data-test="panel-a"]').getAttribute('aria-hidden'),
      'true',
      'tabpanel A hidden',
    )
    assert.equal(
      find('[data-test="panel-b"]').getAttribute('aria-hidden'),
      'true',
      'tabpanel B hidden',
    )
    assert.equal(
      find('[data-test="panel-c"]').getAttribute('aria-hidden'),
      'false',
      'tabpanel C shown',
    )
  })

  // Update label property on content and test it was updated in component
  //----------------------------------------------------------------------------
  test('it properly updates the tab label when label changes', async function(assert) {
    // assigning dummyLabel to component context so we can update it w/o forcing a re-render
    this.set('dummyLabel', 'Yay Tab A')
    await render(hbs`
      {{#rad-tabs as |components|}}
        {{#components.content label=dummyLabel tabDataTest='tab-a' data-test='panel-a'}}
          <p>Tab A Content</p>
        {{/components.content}}
      {{/rad-tabs}}
    `)
    assert.equal(
      find('[data-test="tab-a"]').textContent.trim(),
      'Yay Tab A',
      'default label was joyous',
    )

    this.set('dummyLabel', 'Definitely Not Tab A')
    assert.equal(
      find('[data-test="tab-a"]').textContent.trim(),
      'Definitely Not Tab A',
      'updated label: also joyous',
    )
  })

  test('it works as a controlled tabs instance by passing activeId and onChange closures', async function(assert) {
    function onChangeClosure({ elementId }) {
      this.set('controlledId', elementId)
    }

    this.set('controlledId', 'tabA')
    this.set('actions', {
      onChange: onChangeClosure,
    })

    await render(hbs`
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
    `)

    assert.ok(
      find('[data-test="tab-a"]').classList.contains('active'),
      'tab is active by default',
    )
    assert.equal(
      find('[data-test="panel-a"]').getAttribute('aria-hidden'),
      'false',
      'panel is shown by default',
    )

    // Simulate user click
    // ---------------------------------------------------------------------------
    await click('[data-test="tab-c"]')

    assert.ok(
      find('[data-test="tab-c"]').classList.contains('active'),
      'user click activates tab',
    )
    assert.equal(
      find('[data-test="panel-c"]').getAttribute('aria-hidden'),
      'false',
      'user click shows panel',
    )

    // Simulate controlled change
    // ---------------------------------------------------------------------------
    this.set('controlledId', 'tabB')

    assert.ok(
      find('[data-test="tab-b"]').classList.contains('active'),
      'user click activates tab',
    )
    assert.equal(
      find('[data-test="panel-b"]').getAttribute('aria-hidden'),
      'false',
      'user click shows panel',
    )
  })

  // Test Custom classNames application
  // ---------------------------------------------------------------------------
  test('it applies custom classNames from passed props to the component template elements', async function(assert) {
    await render(hbs`{{#rad-tabs
      buttonStyleClassNames='totally-rad-buttons'
      tabButtonClassNames='tab-button'
      tabClassNames='custom-tab-class'
      tabListClassNames='totally-effing-rad-tab-list'
      defaultTab='tab-1'
      data-test='custom-classes-test' as |components|}}
      {{#components.content
        elementId='tab-1'
        tabDataTest='custom-classes-test-first-button'}}Hi there.{{/components.content}}
    {{/rad-tabs}}`)

    assert.ok(
      find('[data-test="custom-classes-test"] ul').classList.contains(
        'totally-rad-buttons',
      ),
      'The custom buttonStyleClassNames should be applied to the ul',
    )

    assert.ok(
      find('[data-test="custom-classes-test"] ul').classList.contains(
        'totally-effing-rad-tab-list',
      ),
      'The custom tabListClassNames should be applied to the ul',
    )

    assert.ok(
      find('[data-test="custom-classes-test"] li:first-child').classList.contains(
        'custom-tab-class',
      ),
      'The custom tabClassNames should be applied to the tab item li elements',
    )

    assert.ok(
      find('[data-test="custom-classes-test-first-button"]').classList.contains(
        'tab-button',
      ),
      'The custom tabButtonClassNames should be applied to the tab item button elements',
    )
  })
})
