// https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
    'build-docs': {
        files: [
            {
                expand: true,
                flatten: true,
                src: [
                    '<%= paths.build %>/css/ownpass.min.css',
                    '<%= paths.build %>/js/ownpass.min.js',
                    '<%= paths.docs %>/assets/*.svg',
                    'node_modules/jquery/dist/jquery.min.js'
                ],
                dest: '<%= paths.build %>/docs/'
            }
        ]
    }
};
