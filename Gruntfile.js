module.exports = function(grunt) {

  // testing plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  //utility plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-notify');


  // grunt setup
  grunt.initConfig({

    jshint: {
      files: ['public/**/*.js', 'server/**/*']
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    watch: {
      jshint: {
        files: ['public/**/*.js', 'server/**/*'],
        tasks: ['jshint', 'mochaTest']
      }
    }
  });

  //'grunt watch' runs the watch function

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('serve', ['jshint', 'mochaTest', 'nodemon']);

};
