module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
    compress: {
      zip: {
        options: {
          archive: './<%= pkg.version %>.zip',
          mode: 'zip'
        },
        files: [
          { src: './plugin/**'}
        ]
      }
    },
    watch: {
      scripts: {
        files: ['plugin/manifest.json'],
        tasks: ['package-the-plugin']
      }
    }
  });

  // Load the plugins
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('package-the-plugin', function() {
    var manifestTemp = require('./plugin/manifest.json');
    var packageTemp = require('./package.json');
    packageTemp.version = manifestTemp.version;
    console.log('hi');
    console.log(packageTemp.version);
    var fs = require('fs');
    fs.writeFileSync('./package.json', JSON.stringify(packageTemp,null,2));

    grunt.config('compress.zip.options.archive',packageTemp.version+'.zip');
    grunt.task.run('compress');
  });

  grunt.registerTask('default', []);
};