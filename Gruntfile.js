'use strict';
module.exports = function (grunt) {
  var config = {
    src: {
      js: './src',
      css: './styles'
    },
    dist: {
      base: './dist',
      css: './dist/styles'
    },
    example: './example'
  };


  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',

    cfg: config,

    // Task configuration.
    clean: {
      files: ['<%= cfg.dist.base %>']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['browserify:dev', 'jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      html: {
        files: ['example/*.html', 'example/*.js', '<%= cfg.dist.base %>/jquery.<%= pkg.name %>.js', './dist/*.css'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9000
        }
      }
    },
    browserify: {
      dev: {
        src: ['<%= cfg.src.js %>/Carousel3d.js'],
        dest: '<%= cfg.dist.base %>/jquery.<%= pkg.name %>.js',
        options: {
          debug: true
        }
      },
      dist: {
        src: ['<%= cfg.src.js %>/Carousel3d.js'],
        dest: '<%= cfg.dist.base %>/jquery.<%= pkg.name %>.js'
      }
    },
    compass: {
      options: {
        sassDir: '<%= cfg.src.css %>',
        cssDir: '<%= cfg.dist.css %>',
        generatedImagesDir: '<%= cfg.src.css %>/images',
        javascriptsDir: '<%= cfg.src.js %>',
        fontsDir: '<%= cfg.src.css %>/fonts'
      },
      dev: {},
      dist: {}
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'browserify:dev', 'compass:dev', 'test']);
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
  grunt.registerTask('build', ['clean', 'browserify:dist', 'compass:dist', 'uglify', 'test']);
};
