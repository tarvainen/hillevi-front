module.exports = function (grunt) {

    grunt.config('env', grunt.option('env') || process.env.GRUNT_ENV || 'dev');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: grunt.config('env'),
        uglify: {
            options: {
                mangle: false
            },
            dev: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['app/**/*.js', 'env/<%= env %>.js']
                }
            },
            vendor: {
                files: {
                    'build/vendor.min.js': [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-route/angular-route.js',
                        'node_modules/angular-aria/angular-aria.js',
                        'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-material/angular-material.js'
                    ]
                }
            }
        },
        cssmin: {
            dev: {
                files: {
                    'build/<%= pkg.name %>.min.css': ['web/**/*.css']
                }
            },
            vendor: {
                files: {
                    'build/vendor.min.css': [
                        'node_modules/angular-material/angular-material.css'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/**/*.js', 'env/*.js'],
                tasks: ['uglify:dev']
            },
            css: {
                files: ['web/**/*.css'],
                tasks: ['cssmin:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify']);
};