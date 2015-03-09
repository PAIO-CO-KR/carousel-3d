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

  var ChildrenWrapper = function (carousel3dObj) {
    this._carousel3dObj = carousel3dObj;

    this.el = $('<div data-children-wrapper></div>')[0];
    //this.carouselResize();
    //$(carousel3dObj.el).resize(this.carouselResize.bind(this));
  };

  ChildrenWrapper.prototype._carousel3dObj = null;

  /**
   * ChildrenWrapper element
   * @type {element}
   */
  ChildrenWrapper.prototype.el = null;

  ChildrenWrapper.prototype._childObjArray = [];

  ChildrenWrapper.prototype.carouselResize = function () {
    //$(this.el).outerWidth($(this._carousel3dObj.el).width());
    //$(this.el).outerHeight($(this._carousel3dObj.el).height());
  };

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
