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
    module.exports = factory(require('jquery'), require('modernizr'), require('waitForImages'));
  } else {
    factory(jQuery, Modernizr);
  }
}(function($) {
  'use strict';

  /**
   * constructor
   * @param panel
   * @constructor
   */
  var Carousel3d = function (childrenWrapper) {
    //console.log(childrenWrapper);
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
