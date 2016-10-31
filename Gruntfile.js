module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [
                'build/'
            ]
        },
        jshint: {
            options: grunt.file.readJSON('jshint.json'),
            all: {
                src: [
                    'package.json',
                    'Gruntfile.js',
                    'jshint.json',
                    'js/**/*.js'
                ]
            }
        },
        sass: {
            src: {
                options: {
                    loadPath: [
                        'scss/'
                    ],
                    style: 'expanded',
                    sourcemap: 'none',
                    trace: true,
                    unixNewlines: true
                },
                files: {
                    'build/css/ownpass.css': 'scss/ownpass.scss'
                }
            },
            dist: {
                options: {
                    loadPath: [
                        'scss/'
                    ],
                    style: 'compressed',
                    sourcemap: 'inline',
                    trace: true,
                    unixNewlines: true
                },
                files: {
                    'build/css/ownpass.min.css': 'scss/ownpass.scss'
                }
            }
        },
        watch: {
            build: {
                files: [
                    'scss/**/*.scss'
                ],
                tasks: ['default'],
                options: {
                    spawn: false
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'clean',
        'sass'
    ]);
};
