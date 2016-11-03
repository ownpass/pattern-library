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

    var loadDeviceExamples = function (options) {
        var result = [];

        grunt.file.recurse(options.deviceDir, function (abspath, rootdir, subdir, filename) {
            var splitted = path.basename(filename, '.html').split('-');

            for (var i = 0; i < splitted.length; ++i) {
                splitted[i] = splitted[i][0].toUpperCase() + splitted[i].slice(1);
            }

            result.push({
                name: splitted.join(' '),
                path: '../../' + abspath,
                abspath: '../../' + abspath,
                rootdir: rootdir,
                subdir: subdir,
                filename: filename
            });
        });

        return result;
    };

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
            deviceExamples = loadDeviceExamples(options),
            deviceTemplate = swig.compileFile(options.templatesDir + '/device.html');
            patternTemplate = swig.compileFile(options.templatesDir + '/pattern.html');

        deviceExamples.forEach(function (example) {
            var destination, basePath = '..';

            destination = options.dest + 'docs/device/' + example.filename;

            grunt.log.ok("Building page " + destination);

            grunt.file.write(destination, deviceTemplate({
                page: {
                    title: ''
                },
                basePath: basePath,
                example: example,
                sidebarItems: deviceExamples
            }));
        });

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
                sidebarItems: (function (patterns) {
                    var result = [];

                    patterns.forEach(function (pattern) {
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
                sidebarItems: (function (patterns) {
                    var result = [];

                    patterns.forEach(function (pattern) {
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
