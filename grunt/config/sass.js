// https://github.com/gruntjs/grunt-contrib-sass
module.exports = {
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
};
