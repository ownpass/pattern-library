// https://github.com/gruntjs/grunt-contrib-concat
module.exports = {
    options: {
        banner: "/*! OwnPass v<%= pkg.version %> | " +
        "(c) OwnPass | github.com/ownpass/pattern-library */\n",
    },
    build: {
        src: [
            '<%= paths.js %>/op.sidebar.js'
        ],
        dest: '<%= paths.build %>/js/ownpass.js',
    }
};
