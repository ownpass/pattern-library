module.exports = function(grunt) {
    'use strict';

    var project = {
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            get config() {
                return this.grunt + 'config/';
            },
            build: 'build/',
            docs: 'docs/',
            fonts: 'fonts/',
            grunt: 'grunt/',
            js: 'js/',
            scss: 'scss/'
        },
        files: {
            get config() {
                return project.paths.config + '*.js';
            },
            grunt: 'Gruntfile.js'
        }
    };

    require('load-grunt-config')(grunt, {
        configPath: require('path').join(process.cwd(), project.paths.config),
        data: project
    });

    grunt.loadTasks('grunt/tasks/');
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'sass',
        'concat',
        'uglify',
        'copy:fonts',
        'build-docs',
        'copy:build-docs'
    ]);
};
