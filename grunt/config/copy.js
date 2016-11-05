// https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
    'fonts': {
        files: [
            {
                expand: true,
                flatten: true,
                src: [
                    '<%= paths.fonts %>/Rokkitt/Rokkitt.woff2'
                ],
                dest: '<%= paths.build %>/fonts/'
            }
        ]
    },
    'build-docs': {
        files: [
            {
                expand: true,
                flatten: true,
                src: [
                    '<%= paths.build %>/css/ownpass.min.css'
                ],
                dest: '<%= paths.build %>/docs/css/',
                filter: 'isFile'
            },
            {
                expand: true,
                flatten: true,
                src: [
                    '<%= paths.build %>/js/ownpass.min.js',
                    'node_modules/jquery/dist/jquery.min.js'
                ],
                dest: '<%= paths.build %>/docs/js/',
                filter: 'isFile'
            },
            {
                expand: true,
                flatten: true,
                src: [
                    '<%= paths.fonts %>/Rokkitt/Rokkitt.woff2'
                ],
                dest: '<%= paths.build %>/docs/fonts/',
                filter: 'isFile'
            },
            {
                expand: true,
                flatten: true,
                src: [
                    '<%= paths.docs %>/assets/*.svg'
                ],
                dest: '<%= paths.build %>/docs/',
                filter: 'isFile'
            }
        ]
    }
};
