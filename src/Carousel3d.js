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
  var ChildrenWrapper = require('./ChildrenWrapper');
  var Child = require('./Child');

  /**
   * constructor
   * @param panel
   * @constructor
   */
  var Carousel3d = function (carousel) { 
    this.el = carousel;
    this._makeOption();

    //create chlidrenWrapper, children
    var $children = $(carousel).children();
    var childrenWrapperObj = new ChildrenWrapper(this);
    var currentIndex = 0;
    this.appendChildrenWrapper(childrenWrapperObj);
    $children.each(function (index, childContent) {
      if ($(childContent).attr('selected')) {
        currentIndex = index;
      }
      this.appendChild(childContent);
    }.bind(this));

    //create prev/next buttons
    this._prevButton = $('<div data-prev-button></div>')[0];
    $(this.el).append(this._prevButton);
    $(this._prevButton).click(this.prev.bind(this));
    this._nextButton = $('<div data-next-button></div>')[0];
    $(this.el).append(this._nextButton);
    $(this._nextButton).click(this.next.bind(this));

    this.rotate(currentIndex);
  };


  /**
   * Carousel-3D panel element
   * @type {element}
   */
  Carousel3d.prototype.el = null;


  /**
   *
   * @type {{animationDuration: number}}
   */
  Carousel3d.prototype.option = {
    animationDuration: 1000
  };


  /**
   * populate option
   * @private
   */
  Carousel3d.prototype._makeOption = function () {
    (function () {
      var $wrapper = $('<div data-children-wrapper></div>').hide().appendTo(this.el);
      var duration = $('<div data-child></div>').hide().appendTo($wrapper).css('transition-duration');
      $wrapper.remove();
      if (duration) {
        if (duration.indexOf('ms') > 0) {
          this.option.animationDuration = parseInt(duration);
        }
        else if (duration.indexOf('s') > 0) {
          this.option.animationDuration = parseInt(duration) * 1000;
        }
      }
    }.bind(this))();

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
   * rotate carousel
   * @param index
   */
  Carousel3d.prototype.rotate = function (index) {
    var numChildren = this._childrenWrapperObj.numChildren();
    var iFloor = Math.floor(this._childrenWrapperObj.currentIndex() - numChildren / 2);
    var iCeil = Math.ceil(this._childrenWrapperObj.currentIndex() + numChildren / 2);
    while (index < iFloor) {
      index += numChildren;
    }
    while (iCeil < index) {
      index -= numChildren;
    }

    this._childrenWrapperObj.rotate(index);
    window.setTimeout(function () {
      var i = index;
      while(i < 0) {
        i += this._childrenWrapperObj.numChildren();
      }
      $(this.el).trigger('select', i % this._childrenWrapperObj.numChildren());
    }.bind(this), this.option.animationDuration);
  };

  /**
   * make carousel spin prev
   */
  Carousel3d.prototype.prev = function () {
    this.rotate(this._childrenWrapperObj.currentIndex() - 1);
  };

  /**
   * make carousel spin next
   */
  Carousel3d.prototype.next = function () {
    this.rotate(this._childrenWrapperObj.currentIndex() + 1);
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
