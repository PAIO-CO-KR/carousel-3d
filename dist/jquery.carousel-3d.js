(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 *
 *
 *
 * Copyright (c) 2015 PAIO
 * Licensed under the MIT license.
 */

(function() {
  'use strict';

  var $ = window.jQuery;
  var Modernizr = window.Modernizr;
  var ChildrenWrapper = require('./ChildrenWrapper');
  var Child = require('./Child');

  /**
   * constructor
   * @param panel
   * @constructor
   */
  var Carousel3d = function (panel) {
    this.el = panel;
    var $children = $(panel).children();
    var childrenWrapperObj = new ChildrenWrapper(this);
    this.appendChildrenWrapper(childrenWrapperObj);
    $children.each(function (index, childContent) {
      childrenWrapperObj.appendChild(new Child(childrenWrapperObj, childContent));
    });

    //create prev/next buttons
    this._prevButton = $('<div data-prev-button></div>')[0];
    $(this.el).append(this._prevButton);
    this._nextButton = $('<div data-next-button></div>')[0];
    $(this.el).append(this._nextButton);
    this._childObjArray = [];

    //extend renderer
    if (Modernizr.csstransforms3d) {
      //$.extend(this, renderer3DTransform);
    }
    else if (Modernizr.csstransforms) {
      //$.extend(this, rendererTransform);
    }
    else {
      //$.extend(this, rendererTransform);
      this._ieTransform = true;
    }
  };


  /**
   * Carousel-3D panel element
   * @type {element}
   */
  Carousel3d.prototype.el = null;


  /**
   * append ChildrenWrapper object
   * @param childrenWrapperObj
   */
  Carousel3d.prototype.appendChildrenWrapper = function (childrenWrapperObj) {
    this._childrenWrapperObj = childrenWrapperObj;
    $(this.el).append(childrenWrapperObj.el);
  };



  /**
   * Exposed to jquery.
   * @returns {*}
   */
  $.fn.Carousel3d = function() {
    var self = this, opt = arguments[0], args = Array.prototype.slice.call(arguments,1), l = self.length, i = 0, ret;
    for(i; i < l; i += 1) {
      if (typeof opt === 'object' || typeof opt === 'undefined') {
        self[i].Carousel3d =  new Carousel3d(self[i], opt);
      }
      else {
        ret = self[i].Carousel3d[opt].apply(self[i].Carousel3d, args);
      }
      if (ret !== undefined) {
        return ret;
      }
    }
    return self;
  };


  /**
   * initialize on load
   */
  $(function () {
    $('[data-carousel-3d]').Carousel3d();
  });

})();

},{"./Child":2,"./ChildrenWrapper":3}],2:[function(require,module,exports){
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

    var wrapper = $('<div />')[0];
    this._childWrapper = this.el = wrapper;
    $(wrapper).append(childContent);
  };


  Child.prototype._childrenWrapperObj = null;

  Child.prototype._chlidContent = null;

  Child.prototype.el = null;

  Child.prototype._cihldWrapper = null;

  module.exports = Child;
})();

},{}],3:[function(require,module,exports){
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

},{}]},{},[1]);
