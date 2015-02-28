/*
 * 
 * 
 *
 * Copyright (c) 2015 KyuWoo Choi
 * Licensed under the MIT license.
 */
(function ($) {
  // Collection method.
  $.fn. = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('' + i);
    });
  };

  // Static method.
  $. = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $..options, options);
    // Return the name of your plugin plus a punctuation character.
    return '' + options.punctuation;
  };

  // Static method default options.
  $..options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':']. = function (el) {
    return $(el).text() === 'awesome test markup';
  };
}(jQuery));
