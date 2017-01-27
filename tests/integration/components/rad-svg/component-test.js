import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-svg', 'Integration | Component | rad svg', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{rad-svg svgId='heart'}}`);

  assert.equal(this.$('svg').length, 1, 'component is a nsvg element');
  assert.ok(this.$('svg').hasClass('rad-svg'), 'component always bind class rad-svg');
  assert.ok(this.$('svg').hasClass('heart'), 'component binds svg id to class');
});
