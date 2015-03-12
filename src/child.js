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
  var Modernizr = window.Modernizr;

  var Child = function (childrenWrapperObj, content) {
    this._childrenWrapperObj = childrenWrapperObj;
    this._content = content;

    //manipulate dome
    this.el = $('<div data-child />')[0];
    this._frame = $('<div data-child-frame />')[0];
    this._contentWrapper = $('<div data-content-wrapper />')[0];
    $(this.el).append(this._frame);
    $(this._frame).append(this._contentWrapper);
    $(this._contentWrapper).append(content);

    this._hideUntilLoad();
  };


  Child.prototype._childrenWrapperObj = null;

  Child.prototype._content = null;

  Child.prototype.el = null;

  Child.prototype._contentWrapper = null;

  Child.prototype._hideUntilLoad = function () {
    $(this._content).css('visibility', 'hidden');
    $(this._contentWrapper).waitForImages(function () {
      setTimeout(function () {
        this._resize();
        $(this._content).resize(this._resize.bind(this));
        $(this.el).resize(this._resize.bind(this));
        $(this._content).css('visibility', 'visible');
      }.bind(this), 1);
    }.bind(this));
  };

  Child.prototype._resize = function () {
    $(this._contentWrapper).width($(this._content).outerWidth());
    $(this._contentWrapper).height($(this._content).outerHeight());

    var horizontalFrameDiff = $(this._frame).outerWidth() - $(this._frame).innerWidth();
    var vertialFrameDiff = $(this._frame).outerHeight() - $(this._frame).innerHeight();
    var horizontalScale = ($(this.el).innerWidth() - horizontalFrameDiff) / $(this._content).outerWidth();
    var verticalScale = ($(this.el).innerHeight() - vertialFrameDiff) / $(this._content).outerHeight();
    var scale = Math.min(horizontalScale, verticalScale);
    var horizontalOffset = Math.floor(($(this.el).innerWidth() - horizontalFrameDiff - ($(this._content).outerWidth() * scale)) / 2);
    var verticalOffset = Math.floor(($(this.el).innerHeight() - vertialFrameDiff - ($(this._content).outerHeight() * scale)) / 2);

    $(this._frame).width($(this._content).outerWidth() * scale);
    $(this._frame).height($(this._content).outerHeight() * scale);
    $(this.el).css('padding-left', horizontalOffset + 'px');
    $(this.el).css('padding-top', verticalOffset + 'px');
    if (Modernizr.csstransforms) {
      $(this._contentWrapper).css('transform', 'scale(' + scale + ')');
      $(this._contentWrapper).css('-ms-transform', 'scale(' + scale + ')');
      $(this._contentWrapper).css('-moz-transform', 'scale(' + scale + ')');
      $(this._contentWrapper).css('-webkit-transform', 'scale(' + scale + ')');
    }
    else {
      $(this._contentWrapper).css('filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + scale + ', M12=0, M21=0, M22=' + scale + ', SizingMethod="auto expand")');
      $(this._contentWrapper).css('-ms-filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + scale + ', M12=0, M21=0, M22=' + scale + ', SizingMethod="auto expand")');
    }
  };




  module.exports = Child;
})();
