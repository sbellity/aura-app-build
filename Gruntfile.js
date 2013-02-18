/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
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
      compile: {
        options: {
          dir: 'build/js',
          appDir: 'public/js',
          mainConfigFile: 'public/js/config.js',
          baseUrl: '.',
          findNestedDependencies: true,
          modules: [
             //{ name: 'widgets/hello/main', include: ['widgets/hello/main']}
             { name: 'app', include: [ 'aura/lib/ext/mediator', 'aura/lib/ext/widgets', 'app', 'extensions/aura-backbone'] },

          ],
          optimize: 'none',
          removeCombined: false
        }
      }
    }
});

  // Load Local Tasks
  grunt.loadTasks('tasks');

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect:server', 'watch']);

};