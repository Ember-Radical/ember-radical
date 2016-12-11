import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

// Shim Phantom string.includes
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

setResolver(resolver);
