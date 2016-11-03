// https://github.com/gruntjs/grunt-contrib-uglify
module.exports = {
    dist: {
        files: {
            '<%= paths.build %>/js/ownpass.min.js': [
                '<%= paths.build %>/js/ownpass.js'
            ]
        },
        options: {
            preserveComments: false,
            sourceMap: true,
            sourceMapName: "<%= paths.build %>/js/ownpass.min.js.map",
            report: "min",
            beautify: {
                "ascii_only": true
            },
            banner: "/*! OwnPass v<%= pkg.version %> | " +
            "(c) OwnPass | github.com/ownpass/pattern-library */",
            compress: {
                "hoist_funs": false,
                loops: false,
                unused: false
            }
        }
    }
};
