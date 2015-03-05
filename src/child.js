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
  //var Modernizr = window.Modernizr;

  var Child = function (childrenWrapperObj, childContent) {
    this._childrenWrapperObj = childrenWrapperObj;
    this._childContent = childContent;

    var wrapper = $('<div data-child-wrapper />')[0];
    this._childWrapper = this.el = wrapper;
    $(wrapper).append(childContent);
  };


  Child.prototype._childrenWrapperObj = null;

  Child.prototype._chlidContent = null;

  Child.prototype.el = null;

  Child.prototype._cihldWrapper = null;

  module.exports = Child;
})();
