(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 *
 *
 *
 * Copyright (c) 2015 PAIO
 * Licensed under the MIT license.
 */

/**
 * Carousel3d
 */
(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'modernizr', 'waitForImages'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(jQuery, Modernizr);
  } else {
    factory(jQuery, Modernizr);
  }
}(function($, Modernizr) {
  'use strict';
  console.log($);
  console.log(Modernizr);
  /**
   * constructor
   * @param panel
   * @constructor
   */
  var Carousel3d = function (panel) {
    console.log(panel);
  };




  /**
   * Exposed to jquery.
   * @returns {*}
   */
  $.fn.carousel3d = function() {
    var self = this, opt = arguments[0], args = Array.prototype.slice.call(arguments,1), l = self.length, i = 0, ret;
    for(i; i < l; i += 1) {
      if (typeof opt === 'object' || typeof opt === 'undefined') {
        self[i].carousel3d =  new Carousel3d(self[i], opt);
      }
      else {
        ret = self[i].carousel3d[opt].apply(self[i].carousel3d, args);
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
    $('[data-carousel-3d]').carousel3d();
  });

  return Carousel3d;
}));

},{}]},{},[1]);
