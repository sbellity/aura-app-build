module.exports = function (grunt) {

  'use strict';
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  var mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
  };


  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: 4000,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'dist')
            ];
          }
        }
      },
    },
    watch: {
      widgets: {
        files: ['app/**/*.js'],
        tasks: ['build']
      },
      livereload: {
        files: [
          'dist/index.html',
          'dist/app.js'
        ],
        tasks: ['livereload']
      }
    },

    copy: {
      dist: {
        files: [
          { dest: 'dist/index.html', src: 'app/index.html' }
        ]
      }
    },

    clean: {
      dist: ['dist/*']
    },

    requirejs: {
      dist: {
        options: {
          dir: 'dist/js',
          appDir: 'app/js',
          mainConfigFile: 'app/js/config.js',
          baseUrl: '.',
          findNestedDependencies: true,
          modules: [
             { name: 'app', include: ['app'] }
          ],
          optimize: 'none',
          removeCombined: false
        }
      }
    }
  });

  grunt.registerTask('server', [
    'livereload-start',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', ['clean:dist', 'requirejs:dist', 'copy:dist']);
  grunt.registerTask('default', ['build', 'server']);
};
