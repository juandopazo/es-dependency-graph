module.exports = function (grunt) {
    grunt.initConfig({
        transpile: {
            main: {
                type: 'cjs',
                compatFix: true,
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.js'],
                    dest: 'dist/'
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
                    cwd: 'dist/',
                    src: ['*.js'],
                    dest: 'lib/'
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
            main: ['dist/', 'lib/']
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
