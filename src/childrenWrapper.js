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
    this._childObjArray = [];
    this._carousel3dObj = carousel3dObj;
    this.el = $('<div data-children-wrapper></div>')[0];
    $(carousel3dObj.el).resize(this._resize.bind(this));
  };

  /**
   * ChildrenWrapper element
   * @type {element}
   */
  ChildrenWrapper.prototype.el = null;

  ChildrenWrapper.prototype._carousel3dObj = null;

  ChildrenWrapper.prototype._childObjArray = [];

  ChildrenWrapper.prototype._currentIndex = 0;

  ChildrenWrapper.prototype._tz = 0;

  ChildrenWrapper.prototype._spacing = 0.05;


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
   * return number of children
   * @returns {Number}
   */
  ChildrenWrapper.prototype.numChildren = function () {
    return this._childObjArray.length;
  };


  /**
   *
   * @param index
   */
  ChildrenWrapper.prototype.rotate = function (index) {
    this.currentIndex(index);
    var dDegree = 360 / this._childObjArray.length;
    var childIndex = 0;
    var childDegree = 0;
    if (Modernizr.csstransforms3d) {
      for (childIndex = 0; childIndex < this._childObjArray.length; childIndex += 1) {
        childDegree = dDegree * (childIndex - index);
        var transformText = '';
        transformText += ' translateZ(' + -this._tz * (1 + this._spacing) + 'px)';
        transformText += ' rotateY(' + childDegree + 'deg)';
        transformText += ' translateZ(' + this._tz * (1 + this._spacing) + 'px)';

        $(this._childObjArray[childIndex].el).css('transform', transformText);
        $(this._childObjArray[childIndex].el).css('-ms-transform', transformText);
        $(this._childObjArray[childIndex].el).css('-moz-transform', transformText);
        $(this._childObjArray[childIndex].el).css('-webkit-transform', transformText);

        $(this._childObjArray[childIndex].el).css('opacity', Math.cos(Math.PI / 180 * childDegree));
        $(this._childObjArray[childIndex].el).css('z-index', Math.floor((Math.cos(Math.PI / 180 * childDegree) + 1) * 100));
      }
    }
    else {
      var width = $(this.el).width();
      var height = $(this.el).height();

      var stepFunc = function (now, tween) {

        if (tween.prop === '_degree') {
          var sin = Math.sin(Math.PI / 180 * now);
          var cos = Math.cos(Math.PI / 180 * now);
          var halfDegreeRange = dDegree / 2;
          var perspectiveScale = Math.abs(Math.sin(Math.PI / 180 * (now + halfDegreeRange)) - Math.sin(Math.PI / 180 * (now - halfDegreeRange))) / (Math.sin(Math.PI / 180 * halfDegreeRange) * 2) * cos;
          var heightScale = (cos + 1) / 2;
          var widthScale = (perspectiveScale + 1) / 2;
          var dx = (sin * width / 2 + (width * widthScale / 2 * sin)) / 2;

          $(tween.elem).css('z-index', Math.floor((cos + 1) * 100));
          if (Modernizr.csstransforms) {
            $(tween.elem).css('left', dx + 'px');
            $(tween.elem).css('opacity', cos);
            $(tween.elem).css('transform', 'scale(' + widthScale + ', ' + heightScale + ')');
            $(tween.elem).css('-ms-transform', 'scale(' + widthScale + ', ' + heightScale + ')');
            $(tween.elem).css('-moz-transform', 'scale(' + widthScale + ', ' + heightScale + ')');
            $(tween.elem).css('-webkit-transform', 'scale(' + widthScale + ', ' + heightScale + ')');
          }
          else {
            $(tween.elem).css('top', Math.floor((height - height * heightScale) / 2) + 'px');
            $(tween.elem).css('left', ((width - width * widthScale) / 2 + dx) + 'px');
            $(tween.elem).css('filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + widthScale + ', M12=0, M21=0, M22=' + heightScale + '), progid:DXImageTransform.Microsoft.Alpha(Opacity=' + cos * 100 + ')');
            $(tween.elem).css('-ms-filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + widthScale + ', M12=0, M21=0, M22=' + heightScale + '), progid:DXImageTransform.Microsoft.Alpha(Opacity=' + cos * 100 + ')');
          }
        }
      };

      for (childIndex = 0; childIndex < this._childObjArray.length; childIndex += 1) {
        childDegree = dDegree * (childIndex - index);

        $(this._childObjArray[childIndex].el).animate({
          '_degree': childDegree
        }, {
          duration: this._carousel3dObj.option.animationDuration,
          step: stepFunc.bind(this)
        });
      }
    }

  };

  module.exports = ChildrenWrapper;
})();
