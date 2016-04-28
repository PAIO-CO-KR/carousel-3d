/*! carousel-3d - v0.2.2 - 2015-05-06
* Copyright (c) 2015 PAIO co.,Ltd.; Licensed MIT */
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
   * remove chlid
   * @param index|selector(string)|element|jQuery instance of element
   */
  Carousel3d.prototype.removeChild = function (index) {
    this._childrenWrapperObj.removeChild(index);
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
   * remove Child object
   * @param index|selector(string)|element|jQuery instance of element
   */
  ChildrenWrapper.prototype.removeChild = function (index) {
    function isInt(value) {
	  return !isNaN(value) && 
	  parseInt(Number(value)) == value && 
	  !isNaN(parseInt(value, 10));
	}
	  
	if(isInt(index)){
		if(index in this._childObjArray){
			var child = this._childObjArray[index];
			$(child.el).remove();
			this._childObjArray.splice(index,1);
			this._resize();
			return true;
		}else{
			return false;
		}
	}else{
		var ele = null;
		if(typeof index == "string"){
			ele = $(index).get();
		}
		if(typeof index == "object"){
			if(index instanceof jQuery) ele = index.get();
			else ele = index;
		}
		if(ele != null){
			$(this._childObjArray).each(function(i,e){
				if(e._content == ele){
					var child = this._childObjArray[i];
					$(child.el).remove();
					this._childObjArray.splice(i,1);
					this._resize();
					return true;
				}
			});
		}else return false;
	}
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
		  
		
		var i = index < 0 ? (index < (this._childObjArray.length)*(-1) ? this._childObjArray.length - (index*(-1) % this._childObjArray.length) : this._childObjArray.length + index) : index;
		childIndex == (i > this._childObjArray.length-1 ? i % this._childObjArray.length : i) ?
		  $(this._childObjArray[childIndex].el).attr("data-child-active",true) :
		  $(this._childObjArray[childIndex].el).removeAttr("data-child-active") ;
		
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
        }, function(){
		  var i = index < 0 ? (index < (this._childObjArray.length)*(-1) ? this._childObjArray.length - (index*(-1) % this._childObjArray.length) : this._childObjArray.length + index) : index;
		  childIndex == (i > this._childObjArray.length-1 ? i % this._childObjArray.length : i) ?
		    $(this._childObjArray[childIndex].el).attr("data-child-active",true) :
		    $(this._childObjArray[childIndex].el).removeAttr("data-child-active") ;
		});
      }
    }

  };

  module.exports = ChildrenWrapper;
})();

},{}]},{},[1]);

(function () {
  "use strict";
  var originalResize = $.fn.resize;
  //TODO IE call resize infinite. patch jquery.resize then replace
  $.fn.resize = function (callback) {
    var width = $(this).width();
    var height = $(this).height();
    originalResize.call(this, function () {
      if ($(this).width() !== width || $(this).height() !== height) {
        width = $(this).width();
        height = $(this).height();
        callback(this);
      }
    }.bind(this));
  };
})();
