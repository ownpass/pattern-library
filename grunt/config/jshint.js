// https://github.com/gruntjs/grunt-contrib-jshint
module.exports = function (grunt) {
    return {
        options: grunt.file.read('jshint.json'),
        all: {
            src: [
                'package.json',
                'Gruntfile.js',
                'jshint.json',
                'js/**/*.js'
            ]
        }
    };
};
