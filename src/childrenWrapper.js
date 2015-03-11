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
    this.el = $('<div data-children-wrapper></div>')[0];
    $(carousel3dObj.el).resize(this._resize.bind(this));
  };

  /**
   * ChildrenWrapper element
   * @type {element}
   */
  ChildrenWrapper.prototype.el = null;

  ChildrenWrapper.prototype._childObjArray = [];

  ChildrenWrapper.prototype._currentIndex = 0;

  ChildrenWrapper.prototype._tz = 0;

  ChildrenWrapper.prototype._spacing = 0;


  ChildrenWrapper.prototype.currentIndex = function (index) {
    if (typeof index !== 'undefined' && typeof index !== 'object' && !isNaN(index)) {
      this._currentIndex = index;
    }
    return this._currentIndex;
  };


  ChildrenWrapper.prototype._resize = function () {
    this._tz = ($(this.el).outerWidth() / 2) / Math.tan(Math.PI / this._childObjArray.length);
    this.rotate(this._currentIndex);
  };

  /**
   * append Child object
   * @param childObj
   */
  ChildrenWrapper.prototype.appendChild = function (childObj) {
    this._childObjArray.push(childObj);
    $(this.el).append(childObj.el);

    this._resize();
  };


  /**
   *
   * @param index
   */
  ChildrenWrapper.prototype.rotate = function (index) {
    this.currentIndex(index);
    var dDegree = 360 / this._childObjArray.length;
    for (var childIndex = 0; childIndex < this._childObjArray.length; childIndex += 1) {
      var childDegree = dDegree * (childIndex - index);
      var transformText = '';
      transformText += ' translateZ(' + -this._tz * (1 + this._spacing) + 'px)';
      transformText += ' rotateY(' + childDegree + 'deg)';
      transformText += ' translateZ(' + this._tz * (1 + this._spacing) + 'px)';

      $(this._childObjArray[childIndex].el).css('transform', transformText);
      $(this._childObjArray[childIndex].el).css('-ms-transform', transformText);
      $(this._childObjArray[childIndex].el).css('-moz-transform', transformText);
      $(this._childObjArray[childIndex].el).css('-webkit-transform', transformText);

      $(this._childObjArray[childIndex].el).css('z-index', Math.floor((Math.cos(Math.PI / 180 * childDegree) + 1) * 100));
    }
  };

  module.exports = ChildrenWrapper;
})();
