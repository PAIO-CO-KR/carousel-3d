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
  var Child = require('./child');

  var ChildrenWrapper = function (panel, children) {
    this._panel = panel;
    this._el = $('<div data-children-wrapper></div>')[0];
    $(panel).append(this._el);
    $(children).each(function (index, child) {
      $(this._el).append(child);
      this._children.push(new Child(child));
    }.bind(this));
  };

  ChildrenWrapper.prototype._panel = null;

  ChildrenWrapper.prototype._el = null;

  ChildrenWrapper.prototype._children = [];

  module.exports = ChildrenWrapper;
})();
