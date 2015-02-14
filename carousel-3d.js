/* global define, require, jQuery */


/**
 * Carousel3d
 */
(function(factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'modernizr', 'jquery.resize'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'), require('modernizr'), require('jquery.resize'));
	} else {
		factory($, Modernizr);
	}
}(function($) {
	'use strict';

	/**
	 * constructor
	 * @param panel
	 * @constructor
	 */
	var Carousel3d = function (panel) {
        this._panel = panel;
        this._leftButton = $(panel).find('[data-carousel-3d-left]')[0];
        this._rightButton = $(panel).find('[data-carousel-3d-right]')[0];
        this._childrenWrapper = $(panel).find('[data-carousel-3d-children]')[0];
        if (this._childrenWrapper) {
            this._children = [];
            $(this._childrenWrapper).children().each(function (index, child) {
                this._children.push(child);
            }.bind(this));
        }

        if (Modernizr.csstransforms3d) {
            $.extend(this, renderer3DTransform);
        } else {
            $.extend(this, rendererPosition);
        }

        if (windowLoaded) {
            this._init();
        } else {
            $(this._panel).css('visibility', 'hidden');
            $(window).load(function () {
                this._init(function () {
                    $(this._panel).css('visibility', 'visible');
                }.bind(this));
            }.bind(this));
        }
	};


    /**
     *
     * @type {number}
     * @private
     */
    Carousel3d.prototype._aspectRatio = 2;


    /**
     *
     * @type {null}
     * @private
     */
    Carousel3d.prototype._panel = null;

    /**
     *
     * @type {null}
     * @private
     */
    Carousel3d.prototype._leftButton = null;

    /**
     *
     * @type {null}
     * @private
     */
    Carousel3d.prototype._rightButton = null;

    /**
     *
     * @type {null}
     * @private
     */
    Carousel3d.prototype._childrenWrapper = null;

    /**
     *
     * @type {null}
     * @private
     */
    Carousel3d.prototype._children = null;

    /**
     *
     * @type {number}
     * @private
     */
    Carousel3d.prototype._currentIndex = 0;



	/**
	 * initializer
	 * @param panel
	 */
	Carousel3d.prototype._init = function (done) {
        var self = this;

        //init panel
        $(this._panel).css('position', 'relative');
        $(this._panel).css('width', '100%');
        $(this._panel).css('height', '100%');

        $(this._leftButton).css('position', 'absolute');
        $(this._rightButton).css('position', 'absolute');

        $(this._childrenWrapper).css('position', 'absolute');
        $(this._childrenWrapper).css('perspective', '1000px');
        $(this._childrenWrapper).css('list-style-type', 'none');
        $(this._childrenWrapper).css('margin', '0px');
        $(this._childrenWrapper).css('padding', '0px');
        $(this._childrenWrapper).css('width', '100%');
        $(this._childrenWrapper).css('height', '100%');

        $(this._panel).resize(function () {
            var wrapper = this._childrenWrapper;
            var panelWidth = $(this._panel).width();
            var panelHeight = $(this._panel).height();
            var wrapperWidth = Math.min(panelHeight * this._aspectRatio, panelWidth);
            var wrapperHeight = Math.min(wrapperWidth / this._aspectRatio, panelHeight);
            $(wrapper).width(wrapperWidth);
            $(wrapper).height(wrapperHeight);
            $(wrapper).css('left', (panelWidth - wrapperWidth) / 2);
            $(wrapper).css('top', (panelHeight - wrapperHeight) / 2);
            this._initChildren(0);

            if (done) {
                done();
            }
        }.bind(this));

        if (this._children) {
            $(this._children).each(function (index, child) {
                $(child).css('position', 'absolute');
                $(child).css('transition', '1s');
            }.bind(this));
        }
	};

    /**
     * make carousel spin left
     */
    Carousel3d.prototype.left = function () {
        this._currentIndex += 1;
        this._initChildren(this._currentIndex * (360 / this._children.length));
        console.log('left');
    };

    /**
     * make carousel spin right
     */
    Carousel3d.prototype.right = function () {
        this._currentIndex -= 1;
        this._initChildren(this._currentIndex * (360 / this._children.length));
    };


    /**
     * Renderer for legacy browsers no css transform, transform3d supports
     * @type {{_initChildren: Function, _applyChildZIndex: Function, _rotateChild: Function}}
     */
    var rendererPosition = {
        _initChildren: function (degree) {
            if (this._children) {
                $(this._children).each(function (index, child) {
                    this._rotateChild(child, index, degree);
                }.bind(this));
            }
        },
        _rotateChild: function (child, index, degree) {
            $(child).css('overflow', 'hidden');
            var baseScale = 1;
            var width = $(child).width();
            var height = $(child).height();
            var wrapperWidth = $(this._childrenWrapper).width();
            var wrapperHeight = $(this._childrenWrapper).height();
            if ((width / height) > this._aspectRatio) {
                baseScale = wrapperWidth / width;
            } else {
                baseScale = wrapperHeight / height;
            }

            var childDegree = ((360 / this._children.length) * index) + degree;
            var z = Math.cos(Math.PI / 180 * childDegree);
            var dx = Math.sin(Math.PI / 180 * childDegree) * wrapperWidth / 5;
            $(child).animate({
                'z-index': (z + 1) * 10,
                'width': width * baseScale * (z + 2) / 3,
                'height': height * baseScale * (z + 2) / 3,
                'left': (wrapperWidth - width * baseScale * (z + 2) / 3) / 2 + dx,
                'top': (wrapperHeight - height * baseScale * (z + 2) / 3) / 2
            }, 1000);
        }
    };


    /**
     * Renderer for browsers supporting css transform3d
     * @type {{_tz: number, _initChildren: Function, _applyChildZIndex: Function, _rotateChild: Function}}
     */
    var renderer3DTransform = {
        _tz: 0,
        _initChildren: function (degree) {
            var wrapperWidth = $(this._childrenWrapper).width();
            this._tz =  (wrapperWidth / 2) / Math.tan(Math.PI / this._children.length);
            if (this._children) {
                $(this._children).each(function (index, child) {
                    this._rotateChild(child, index, degree);
                }.bind(this));
            }
        },
        _rotateChild: function (child, index, degree) {
            degree = degree ? degree : 0;

            //scale, margin
            var scale = 1;
            var width = $(child).width();
            var height = $(child).height();
            var wrapperWidth = $(this._childrenWrapper).width();
            var wrapperHeight = $(this._childrenWrapper).height();
            if ((width / height) > this._aspectRatio) {
                scale = wrapperWidth / width;
            } else {
                scale = wrapperHeight / height;
            }
            var scaledWidth = width * scale;
            var scaledHeight = height * scale;

            $(child).css('left', ((scaledWidth - width) / 2) + ((wrapperWidth - scaledWidth) / 2) + 'px');
            $(child).css('top', ((scaledHeight - height) / 2) + ((wrapperHeight - scaledHeight) / 2) + 'px');

            //rotation
            $(child).data('index', index);
            $(child).data('cssScale', scale);

            var childDegree = ((360 / this._children.length) * index) + degree;
            var transformText = 'scale(' + scale + ')';
            transformText += ' translateZ(' + -this._tz + 'px)';
            transformText += ' rotateY(' + childDegree + 'deg)';
            transformText += ' translateZ(' + this._tz + 'px)';
            $(child).css('transform', transformText);

            $(child).css('z-index', (Math.cos(Math.PI / 180 * childDegree) + 1) * 10);
        }
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
    var windowLoaded = false;
    $(window).load(function () {
        windowLoaded = true;
    });

}));