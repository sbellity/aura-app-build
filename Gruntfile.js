/*global module:false*/
module.exports = function(grunt) {

  // Underscore
  // ==========
  var _ = grunt.util._;

  // Package
  // =======
  var pkg = grunt.file.readJSON('./package.json');

  // Widgets
  // =======´
  var widgets = require('fs').readdirSync('public/js/widgets');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: pkg,
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9002,
          base: 'public'
        }
      },
      build: {
        options: {
          port: 9003,
          base: 'build'
        }
      }

    },
    watch: {

    },
    requirejs: {
      options: {
        baseUrl: 'public/js',
        optimize: 'none',
        preserveLicenseComments: true,

        paths: {
          aura: 'components/aura/lib/',
          underscore: 'components/underscore/underscore',
          eventemitter: 'components/eventemitter2/lib/eventemitter2',
          backbone: 'components/backbone/backbone',
          handlebars: 'components/handlebars/handlebars',
          text: 'components/requirejs-text/text',
          jquery: 'components/jquery/jquery'
        },
        shim: {
          backbone: {
            exports: 'Backbone',
            deps: ['underscore', 'jquery']
          },
          underscore: {
            exports: '_'
          },
          handlebars: {
            exports: 'Handlebars'
          }
        },
        onBuildWrite: function(moduleName, path, contents) {
          _.each(widgets, function(widgetDir) {
            if(moduleName === 'widgets/' + widgetDir + '/main') {
              contents = contents.replace('widgets/' + widgetDir + '/main', '__widget__$' + widgetDir + '@default');
            }
          });
          return contents;
        }
      },
      perFile: {
        options: {
          dir: 'build/js',
          modules: (function() {
            // Get auraExtensions
            var output = [];

            // Include Aura
            output.push({
              name: 'app',
              include: ['aura/ext/mediator', 'aura/ext/widgets', 'app', 'text']
            });

            // Include Widget
            _.each(widgets, function(widgetDir) {
              output.push({
                name: 'widgets/' + widgetDir + '/main',
                exclude: ['app']
              });
            });

            return output;
          })()
        }
      },
      oneFile: {
        options: {
          almond: true,
          wrap: true,
          insertRequire: ['app'],
          out: "build/app.js",
          baseUrl: 'public/js',
          include: (function() {
            // Include Aura
            var output = ['app', 'aura/ext/mediator', 'aura/ext/widgets', 'text'];
            // Include Widget
            _.each(widgets, function(widgetDir) {
              output.push('widgets/' + widgetDir + '/main');
            });
            return output;
          })(),
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect:server', 'watch']);

};