module.exports = function(grunt) {

  // testing plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  //utility plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');


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

    watch: {
      jshint: {
        files: ['public/**/*.js', 'server/**/*'],
        tasks: ['jshint', 'mochaTest']
      }
    }
  });

  //'grunt watch' runs the watch function
  grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
