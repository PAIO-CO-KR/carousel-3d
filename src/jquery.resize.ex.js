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
