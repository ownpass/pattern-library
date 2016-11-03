module.exports = function (grunt) {
    var swig = require('swig');
    var path = require('path');
    var hljs = require('highlight.js');

    var highlightCallback = function (input, idx) {
        return '<div class="code-container"><pre><code lang="html">'
            + hljs.highlight('html', input).value
            + '</code></pre></div>';
    };
    highlightCallback.safe = true;

    swig.setFilter('highlight', highlightCallback);

    var loadPatterns = function (options) {
        var result = [],
            patternFiles = grunt.file.expand({
                "cwd": options.patternsDir
            }, [
                "**/pattern.json"
            ]);

        patternFiles.forEach(function (patternFile) {
            var json = grunt.file.readJSON(options.patternsDir + "/" + patternFile);

            json.summary = '../patterns/' + path.dirname(patternFile) + '/summary.html';
            json.example = '../patterns/' + path.dirname(patternFile) + '/example.html';
            json.syntax = grunt.file.read(options.patternsDir + "/" + path.dirname(patternFile) + '/example.html');

            json.htmlName = json.name.toLowerCase().replace(' ', '-');
            json.path = 'patterns/' + json.htmlName + '.html';

            result.push(json);
        });

        return result;
    };

    grunt.registerTask("build-docs", "Creates the documentation.", function () {
        var options = this.options(),
            patterns = loadPatterns(options),
            patternTemplate = swig.compileFile(options.templatesDir + '/pattern.html');

        patterns.forEach(function (pattern) {
            var destination, basePath = '..';

            destination = options.dest + 'docs/patterns/' + pattern.htmlName + '.html';

            grunt.log.ok("Building page " + destination);

            grunt.file.write(destination, patternTemplate({
                page: {
                    title: pattern.name
                },
                basePath: basePath,
                pattern: pattern,
                patterns: (function(patterns) {
                    var result = [];

                    patterns.forEach(function(pattern) {
                        var newPattern = JSON.parse(JSON.stringify(pattern));

                        newPattern.path = basePath + '/' + pattern.path;

                        result.push(newPattern);
                    });

                    return result;
                })(patterns)
            }));
        });

        grunt.file.recurse(options.pagesDir, function (abspath, rootdir, subdir, filename) {
            var basePath = '.',
                destination = options.dest + 'docs/' + filename,
                template = swig.compileFile(abspath);

            grunt.log.ok('Building page ' + destination);

            grunt.file.write(destination, template({
                page: {},
                basePath: '.',
                patterns: (function(patterns) {
                    var result = [];

                    patterns.forEach(function(pattern) {
                        var newPattern = JSON.parse(JSON.stringify(pattern));

                        newPattern.path = basePath + '/' + pattern.path;

                        result.push(newPattern);
                    });

                    return result;
                })(patterns)
            }));
        });
    });
};
