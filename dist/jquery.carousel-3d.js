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
  var ChildrenWrapper = require('./childrenWrapper');

  /**
   * constructor
   * @param panel
   * @constructor
   */
  var Carousel3d = function (panel) {
    //manipulate DOM.
    this._panel = panel;

    var childrenWrapper = $('<div data-children-wrapper />')[0];
    $(panel).append(childrenWrapper);
    $(this._panel).children().each(function (index, child) {
      $(childrenWrapper).append(child);
    });
    this._childrenWrapper = new ChildrenWrapper(childrenWrapper);

    //create prev/next buttons
    this._prevButton = $('<div data-prev-button></div>')[0];
    $(this._panel).append(this._prevButton);
    this._nextButton = $('<div data-next-button></div>')[0];
    $(this._panel).append(this._nextButton);
    this._children = [];

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

},{"./childrenWrapper":2}],2:[function(require,module,exports){
/*
 *
 *
 *
 * Copyright (c) 2015 PAIO
 * Licensed under the MIT license.
 */
(function () {
  "use strict";

  var ChildrenWrapper = function (el) {
    console.log(el);
  };

  module.exports = ChildrenWrapper;
})();

},{}]},{},[1]);
