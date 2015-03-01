/* global requirejs */
requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    app: '../src',
    jquery: 'jquery/jquery',
    modernizr: 'modernizr/modernizr',
    waitForImages: 'waitForImages/dist/jquery.waitforimages'
  },
  shim : {
    waitForImages: {deps : ['jquery']}
  }
});

requirejs(['app/carousel-3d'],
  function   (carousel) {
    "use strict";
    if (carousel) {
      console.log('carousel loaded ok');
    }
  }
);
