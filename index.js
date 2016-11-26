'use strict';

module.exports = {
  name: 'ember-radical',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // Find the parent app by crawling addon tree
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
  }
};
