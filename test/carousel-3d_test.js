(function ($) {
  module('Carousel-3d', {
    setup: function () {
      this.el = $('<div data-carousel-3d />');
      $('#qunit').append(this.el);
    }
  });

  test('is ', function () {
    expect(1);
    strictEqual(typeof this.el.Carousel3d, 'function', 'loaded');
  });
}(jQuery));
