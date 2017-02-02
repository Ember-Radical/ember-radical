import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rad-modal/footer', 'Integration | Component | rad modal/footer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#rad-modal/footer}}
      Modal Footer
    {{/rad-modal/footer}}
  `);

  assert.ok(this.$().text().includes('Modal Footer'),
    'Component renders block form correctly');
});
