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

  var Child = function (el) {
    this.el = el;
    console.log($);
  };

  /**
   * Child element
   * @type {element}
   */
  Child.prototype.el = null;

  module.exports = Child;
})();
