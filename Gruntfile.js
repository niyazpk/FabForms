/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {

      js: {
        files: ['src/*.js', 'tests/spec/*.js'],
        tasks: ['test']
      },

      sass: {
        files: ['html/sass/*.scss'],
        tasks: ['sass']
      },

      htmlmin: {
        files: ['html/includes/templates/*.hbs'],
        tasks: ['htmlmin']
      },

      handlebars: {
        files: ['html/includes/templates/compressed/*.min.hbs'],
        tasks: ['handlebars']
      },

      uglify: {
        files: ['html/js/templates/templates.js', 'html/js/lib/*.js'],
        tasks: ['uglify']
      }

    },

    jshint: {
      all: ['src/fabforms.js'],
      options: {
        multistr: true,
        browser: true,
        globals: {
          $: true,
          _: true
        }
      }
    },

    yuidoc: {
      compile: {
        name:        "B3C",
        description: "yen macha",
        version:     "0.1.2",
        url:         "http://zovi.com",
        options: {
          "paths": ["html/js/lib/", "html/js/"],
          "outdir": "docs/"
        }
      }
    },

    mocha: {
      index: {
        src: ['tests/index.html'],
        reporter: 'spec'
      },
    },

    sass: {
      dev: {
        files: {
          'html/css/style.css': 'html/sass/style.scss'
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: {
          'html/img/compressed/cart.png': 'html/img/cart.png',
          'html/img/compressed/fb-big-button.png': 'html/img/fb-big-button.png'
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'zovi.templates',
          wrapped: true,
          processName: function(filepath) {
            var pieces = filepath.split('/');
            var filename = pieces[pieces.length - 1];
            filename = filename.replace(/-/g, '_');
            return filename.slice(0,-8);
          }
        },
        files: {
          'html/js/templates/templates.js': ['html/includes/templates/compressed/*.min.hbs']
        }
      }
    },

    uglify: {
      dev: {
        options: {
          // sourceMap: 'html/source-map.js',
          // sourceMapRoot: 'html/js' // the location to find your original source
        },
        files: {
          'dist/fabforms.min.js': ['src/fabforms.js', 'src/vd.js']
        }
      },

      // dist: {
      //   options: {
      //     // sourceMap: 'dist/sm/sm.js',
      //     // sourceMappingURL: 'dist/',
      //     // sourceMapRoot: 'dist/js' // the location to find your original source
      //   },
      //   files: grunt.file.expandMapping(['*.js'], 'dist/js', {
      //     cwd: 'dist/js'
      //   })

      //   // files: grunt.file.expandMapping(['**/*.js'], 'dist/js', { cwd: 'dist/js' })
      // }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: grunt.file.expandMapping(['html/includes/templates/*.hbs'], 'html/includes/templates/compressed/', {
          flatten: true,
          rename: function(destBase, destPath, options) {
              return destBase + destPath.replace('.hbs', '.min.hbs');
            }
        })
      }
    },

    copy: {
      dist: {
        files: [{
          cwd: 'html',
          src: ['**'],
          dest: "dist/"
        }]
      }
    },

    clean: {
      options: {
        force: true
      },
      dist: ['dist']
    },

    useminPrepare: {
      html: 'dist/scripts.html'
    },

    usemin: {
      html: 'dist/scripts.html'
      // js: 'dist/js/**/*.js'
    },

    hashres: {
      dist: {
        files: {
          js: ['dist/js/*.js', 'dist/js/lib/*.js', 'dist/js/zovi-lib/*.js', 'dist/js/templates/*.js', 'dist/css/*.css']
        },
        out: [ 'dist/js/product-detail*.js', 'dist/js/ui*.js', 'dist/*.html', 'dist/static-html/*.html', 'dist/includes/*.html', 'dist/includes/templates/*.html'],
        fileNameFormat: '${name}.${hash}.${ext}',  // Default value: '${hash}.${name}.cache.${ext}'
        // renameFiles: true  // dont touch this line - https://github.com/Luismahou/grunt-hashres/issues/6
      }
    },

    plato: {
      dist: {
        options : {
          complexity : {
            logicalor : false,
            switchcase : false,
            forin : true,
            trycatch : true
          }
        },
        files: {
          'reports': ['html/js/*.js'],
        },
      }
    }

  });

  // grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-plato');


  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('build', ['jshint', 'mocha', 'clean', 'uglify']);
  grunt.registerTask('default', ['jshint', 'mocha']);

};


