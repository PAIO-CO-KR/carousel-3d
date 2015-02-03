/* global define, require, jQuery */


/**
 * Carousel3d
 */
(function(factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory($);
	}
}(function($) {
	'use strict';

	/**
	 * constructor
	 * @param panel
	 * @constructor
	 */
	var Carousel3d = function (panel) {
		this.init(panel);
	};


    Carousel3d.prototype.panel = null;
    
    Carousel3d.prototype.childrenWrapper = null;

	Carousel3d.prototype.items = null;

    Carousel3d.prototype.itemIndex = 0;

    Carousel3d.prototype.r = 0;


	/**
	 * initializer
	 * @param panel
	 */
	Carousel3d.prototype.init = function (panel) {
        var self = this;

        //init panel
        this.panel = panel;
		$(panel).css('position', 'relative');
		$(panel).css('margin', 'auto');
        $(panel).css('perspective', '1000px');
		$(panel).css('max-width', '100%');
		$(panel).css('max-height', '100%');
		$(panel).css('width', '100%');
		$(panel).css('height', '100%');

        //init arrows
        var $leftArrow = $('[data-carousel3d-left]');
        var $rightArrow = $('[data-carousel3d-right]');
        $leftArrow.css('position', 'absolute');
        $leftArrow.css('z-index', 100);
        $leftArrow.css('left', '0px');
        $leftArrow.css('top', '50%');
        $leftArrow.load(function () {
            $leftArrow.css('margin-top', ($leftArrow.height() / -2) + 'px');
        });
        $rightArrow.css('position', 'absolute');
        $rightArrow.css('z-index', 100);
        $rightArrow.css('right', '0px');
        $rightArrow.css('top', '50%');
        $rightArrow.load(function () {
            $rightArrow.css('margin-top', ($rightArrow.height() / -2) + 'px');
        });
        $leftArrow.click(function () {
            this.left();
        }.bind(this));
        $rightArrow.click(function () {
            this.right();
        }.bind(this));

        //init children
        var $childrenWrapper = $('<div data-carousel3d-wrapper />');
        $childrenWrapper.css('transform-style', 'preserve-3d');
        $childrenWrapper.css('transition', 'transform 1s');
        $childrenWrapper.css('position', 'absolute');
        $childrenWrapper.css('width', '100%');
        $childrenWrapper.css('height', '100%');
		$childrenWrapper.css('margin', 'auto');
        this.childrenWrapper = $childrenWrapper[0];
        $(panel).append($childrenWrapper);
		$.each($(panel).find('[data-carousel3d-child]'), function (itemIndex, item) {
            //wrap element with div.
            var $div = $('<div data-carousel3d-child />');
            $(item).removeAttr('data-carousel3d-child');
            $childrenWrapper.append($div);
            $div.append($(item));
            item = $div[0];

            $(item).css('position', 'absolute');
            $(item).css('backface-visibility', 'hidden');
		});
        this.items = $(panel).find('[data-carousel3d-child]');

        $(panel).resize(function () {
            self._onPanelResize(this);
        });
	};



    /**
     * on panel resize
     * @param panel
     * @private
     */
	Carousel3d.prototype._onPanelResize = function (panel) {
        var maxWidth = $(this.panel).width() / 2;
        var maxHeight = $(this.panel).height();
        var r = (maxWidth / 1.9) / Math.tan(Math.PI / this.items.length);
        this.r = r;
        for (var i = 0; i < this.items.length; i += 1) {
            $(this.items[i]).children().first().css('max-width', maxWidth);
            $(this.items[i]).children().first().css('max-height', maxHeight);
	        $(this.items[i]).css('left', ($(this.panel).width() - $(this.items[i]).width()) / 2 + 'px');

	        var transformStyle = 'rotateY(   ' + (360 / this.items.length * i) + 'deg )'
	            + ' translateZ(' + r + 'px )';
            $(this.items[i]).css('transform', transformStyle);
        }
		var transformStyle = 'rotateY(   ' + (360 / this.items.length * this.itemIndex * -1) + 'deg ) scale3d(0.7, 0.7, 0.7)';
        $(this.childrenWrapper).css('transform', transformStyle);
		$(this.childrenWrapper).css('-ms-transform', transformStyle);
		$(this.childrenWrapper).css('-moz-transform', transformStyle);
		$(this.childrenWrapper).css('-webkit-transform', transformStyle);
		$(this.childrenWrapper).css('-o-transform', transformStyle);
	};


	/**
	 * carousel spin left
	 */
	Carousel3d.prototype.left = function () {
        this.itemIndex += 1;
		var transformStyle = 'rotateY(   ' + (360 / this.items.length * this.itemIndex * -1) + 'deg ) scale3d(0.7, 0.7, 0.7)';
		$(this.childrenWrapper).css('transform', transformStyle);
		$(this.childrenWrapper).css('-ms-transform', transformStyle);
		$(this.childrenWrapper).css('-moz-transform', transformStyle);
		$(this.childrenWrapper).css('-webkit-transform', transformStyle);
		$(this.childrenWrapper).css('-o-transform', transformStyle);
	};


	/**
	 * carousel spin right
	 */
	Carousel3d.prototype.right = function () {
        this.itemIndex -= 1;
		var transformStyle = 'rotateY(   ' + (360 / this.items.length * this.itemIndex * -1) + 'deg ) scale3d(0.7, 0.7, 0.7)';
		$(this.childrenWrapper).css('transform', transformStyle);
		$(this.childrenWrapper).css('-ms-transform', transformStyle);
		$(this.childrenWrapper).css('-moz-transform', transformStyle);
		$(this.childrenWrapper).css('-webkit-transform', transformStyle);
		$(this.childrenWrapper).css('-o-transform', transformStyle);
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
	$(function() {
		$('[data-carousel3d]').carousel3d();
	});

}));