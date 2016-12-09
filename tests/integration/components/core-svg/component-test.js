import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core-svg', 'Integration | Component | core svg', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{core-svg svgId='heart'}}`);

  assert.equal(this.$('svg').length, 1, 'component is a nsvg element');
  assert.ok(this.$('svg').hasClass('core-svg'), 'component always bind class core-svg');
  assert.ok(this.$('svg').hasClass('heart'), 'component binds svg id to class');
});
