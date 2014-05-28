/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/module-graph/blob/master/LICENSE.md
*/

module.exports = function (grunt) {
    grunt.initConfig({
        transpile: {
            main: {
                type: 'cjs',
                compatFix: true,
                files: [{
                    expand: true,
                    cwd: 'lib/',
                    src: ['*.js'],
                    dest: 'build/'
                }]
            }
        },
        es6_module_wrap_default: {
            options: {
                type: 'cjs'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['*.js'],
                    dest: 'dist/'
                }]
            }
        },
        mochaTest: {
            main: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/*.js']
            }
        },
        clean: {
            main: ['build/', 'dist/']
        }
    });

    grunt.loadNpmTasks('grunt-es6-module-transpiler');
    grunt.loadNpmTasks('grunt-es6-module-wrap-default');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'transpile', 'es6_module_wrap_default']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['build']);
};
