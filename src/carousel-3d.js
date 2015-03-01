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

  return Carousel3d;
}));
