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

  var ChildrenWrapper = function (panelObj) {
    this.el = $('<div data-children-wrapper></div>')[0];
    this._panelObj = panelObj;
    panelObj.appendChildrenWrapper(this);
    console.log(this._panelObj);
  };

  ChildrenWrapper.prototype._panelObj = null;

  /**
   * ChildrenWrapper element
   * @type {element}
   */
  ChildrenWrapper.prototype.el = null;

  ChildrenWrapper.prototype._childObjArray = [];

  /**
   * append Child object
   * @param childObj
   */
  ChildrenWrapper.prototype.appendChild = function (childObj) {
    this._childObjArray.push(childObj);
    $(this.el).append(childObj.el);
  };

  module.exports = ChildrenWrapper;
})();
