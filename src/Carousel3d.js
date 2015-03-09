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
  var Carousel3d = function (carousel) {
    this.el = carousel;

    //create chlidrenWrapper, children
    var $children = $(carousel).children();
    var childrenWrapperObj = new ChildrenWrapper(this);
    this.appendChildrenWrapper(childrenWrapperObj);
    $children.each(function (index, childContent) {
      this.appendChild(childContent);
    }.bind(this));

    //create prev/next buttons
    this._prevButton = $('<div data-prev-button></div>')[0];
    $(this.el).append(this._prevButton);
    this._nextButton = $('<div data-next-button></div>')[0];
    $(this.el).append(this._nextButton);

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

  Carousel3d.prototype.option = {
    aspectRatio: 1.5,
    spacing: 0.05,
    animateDuration: 1000
  };


  /**
   * append chlid
   * @param content
   */
  Carousel3d.prototype.appendChild = function (content) {
    this._childrenWrapperObj.appendChild(new Child(this._childrenWrapperObj, content));
  };


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
