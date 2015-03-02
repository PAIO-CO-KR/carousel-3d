/*
 *
 *
 *
 * Copyright (c) 2015 PAIO
 * Licensed under the MIT license.
 */
(function () {
  "use strict";

  var $ = window.jQuery;

  var Child = function (wrapper, el) {
    this._wrapper = wrapper;
    this._el = el;
    console.log($);
  };

  Child.prototype._wrapper = null;

  Child.prototype._el = null;

  module.exports = Child;
})();
