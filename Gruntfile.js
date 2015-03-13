'use strict';
module.exports = function (grunt) {
  var cfg = {
    src: {
      js: './src',
      css: './styles/theme'
    },
    dist: {
      base: './dist',
      css: './dist/styles'
    },
    test: './test',
    example: './example',
    tmp: './.tmp'
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

    cfg: cfg,

    // Task configuration.
    clean: {
      files: ['<%= cfg.dist.base %>']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
        //sourceMap: true
      },
      dist: {
        src: ['<%= cfg.tmp %>/jquery.<%= pkg.name %>.js', '<%= cfg.src.js %>/jquery.resize.ex.js'],
        dest: '<%= cfg.dist.base %>/jquery.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= cfg.dist.base %>/jquery.<%= pkg.name %>.min.js'
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
          jshintrc: '<%= cfg.src.js %>/.jshintrc'
        },
        src: ['<%= cfg.src.js %>/**/*.js']
      },
      test: {
        options: {
          jshintrc: '<%= cfg.test %>/.jshintrc'
        },
        src: ['<%= cfg.test %>/**/*.js']
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
        dest: '<%= cfg.tmp %>/jquery.<%= pkg.name %>.js',
        options: {
          browserifyOptions: {
            //debug: true
          }
        }
      },
      dist: {
        src: ['<%= cfg.src.js %>/Carousel3d.js'],
        dest: '<%= cfg.tmp %>/jquery.<%= pkg.name %>.js'
      }
    },
    compass: {
      options: {
        sassDir: '<%= cfg.src.css %>',
        cssDir: '<%= cfg.dist.css %>',
        imagesDir: '<%= cfg.src.css %>/images',
        generatedImagesDir: '<%= cfg.dist.css %>/images',
        javascriptsDir: '<%= cfg.src.js %>',
        fontsDir: '<%= cfg.src.css %>/fonts',
        sourcemap: true
      },
      dev: {},
      dist: {}
    },
    copy: {
      cssimage: {
        files: [
          {expand: true, cwd: '<%= cfg.src.css %>', src: ['images/**'], dest: '<%= cfg.dist.css %>/'}
        ]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= cfg.src.js %>/**/*.js',
        tasks: ['browserify:dev', 'concat']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      html: {
        files: ['<%= cfg.example %>/*.html', '<%= cfg.example %>/*.js', '<%= cfg.dist.base %>/*.js', '<%= cfg.dist.css %>/*.css'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['<%= cfg.src.css %>/*.scss', '<%= cfg.src.css %>/../common/*.scss'],
        tasks: ['compass:dev', 'copy:cssimage']
      },
      cssimage: {
        files: ['<%= cfg.src.css %>/images/**'],
        tasks: ['copy:cssimage']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'browserify:dev', 'concat', 'compass:dev', 'copy:cssimage', 'test']);
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
  grunt.registerTask('build', ['clean', 'browserify:dist', 'compass:dist', 'copy:cssimage', 'concat', 'uglify', 'test']);
};
