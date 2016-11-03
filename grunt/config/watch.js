// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
    build: {
        files: [
            'scss/**/*.scss'
        ],
        tasks: ['default'],
        options: {
            spawn: false
        }
    }
};
