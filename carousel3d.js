/* global define, require, jQuery */


/**
 * define Math.sign.
 */
if (!Math.sign) {
	Math.sign = Math.sign || function(n) {
		return (n = +n) ? n < 0 ? -1 : 1 : n;
	};
}


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
		factory(jQuery);
	}
}(function($) {
	'use strict';

	/**
	 * @param el
	 * @constructor
	 */
	var Carousel3d = function (el) {
		this.init(el);
	};


	Carousel3d.prototype.items = null;


	/**
	 * default easing function.
	 * @param x
	 * @param t
	 * @param b
	 * @param c
	 * @param d
	 * @param s
	 * @returns {*}
	 */
	Carousel3d.prototype.easing = function (x, t, b, c, d, s) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	};


	/**
	 *
	 * @param el
	 */
	Carousel3d.prototype.init = function (el) {
		$(el).css('position', 'relative');
		$(el).css('max-width', '100%');
		$(el).css('max-height', '100%');
		$(el).css('width', '100%');
		$(el).css('height', '100%');

		this.items = $(el).find('[data-carousel3d-child]');

		$('[data-carousel3d-left]').css('position', 'absolute');
		$('[data-carousel3d-left]').css('z-index', 100);
		$('[data-carousel3d-left]').css('left', '0px');
		$('[data-carousel3d-left]').css('top', '50%');
		$('[data-carousel3d-left]').css('transform', 'translateY(-50%)');
		$('[data-carousel3d-left]').css('filter', 'progid:DXImageTransform.Microsoft.Matrix(Dy=-12)');
		$('[data-carousel3d-right]').css('position', 'absolute');
		$('[data-carousel3d-right]').css('z-index', 100);
		$('[data-carousel3d-right]').css('right', '0px');
		$('[data-carousel3d-right]').css('top', '50%');
		$('[data-carousel3d-right]').css('transform', 'translateY(-50%)');
		$.each(this.items, function (itemIndex, item) {
			$(item).css('position', 'absolute');
		});

		$(el).resize(this._onResize.bind(this));


		console.log(this.items);

	};


	Carousel3d.prototype._onResize = function () {
		var width = $(el).width();
		var height = $(el).height();

		$.each(this.items, function (itemIndex, item) {
			console.log(item);
		});
	};


	/**
	 *
	 */
	Carousel3d.prototype.left = function () {

	};


	/**
	 *
	 */
	Carousel3d.prototype.right = function () {

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



	/**
	 *
	 * @param degree
	 * @returns {number}
	 */
	var degree2Radian = function (degree) {
		var r = degree * Math.PI / 180.0;
		r = Math.floor(degree) % 2 === 1 ? -r : r;
		return Math.abs(Math.sin(r));
	};

}));