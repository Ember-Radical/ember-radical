import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rad svg', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{rad-svg svgId='heart'}}`);

    assert.equal(findAll('svg').length, 1, 'component is a nsvg element');
    assert.ok(find('svg').classList.contains('rad-svg'), 'component always bind class rad-svg');
    assert.ok(find('svg').classList.contains('heart'), 'component binds svg id to class');
  });
});
