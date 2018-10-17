import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rad modal/footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#rad-modal/footer}}
        Modal Footer
      {{/rad-modal/footer}}
    `);

    assert.ok(find('*').textContent.includes('Modal Footer'),
      'Component renders block form correctly');
  });
});
