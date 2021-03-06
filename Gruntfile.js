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
                    'build/<%= pkg.name %>.min.js': ['app/prototype.js', 'app/**/*.js', 'env/<%= env %>.js']
                }
            },
            vendor: {
                files: {
                    'build/vendor.min.js': [
                        'node_modules/countdown/countdown.js',
                        'node_modules/chart.js/dist/Chart.js',
                        'node_modules/angular/angular.js',
                        'node_modules/angular-route/angular-route.js',
                        'node_modules/angular-aria/angular-aria.js',
                        'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-material/angular-material.js',
                        'node_modules/angular-translate/dist/angular-translate.js',
                        'node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                        'node_modules/angular-md5/angular-md5.js',
                        'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.js',
                        'node_modules/angular-chart.js/dist/angular-chart.js',
                        'node_modules/angular-material-data-table/dist/md-data-table.js',
                        'node_modules/angular-websocket/dist/angular-websocket.js'
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
                        'node_modules/angular-material/angular-material.css',
                        'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.css',
                        'node_modules/angular-material-data-table/dist/md-data-table.css'
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
            },
            translations: {
                files: ['translations/*.json'],
                tasks: ['stripJsonComments']
            }
        },
        stripJsonComments: {
            dist: {
                options: {
                    whitespace: false
                },
                files: {
                    'build/translated/en.json': 'translations/en.json',
                    'build/translated/fi.json': 'translations/fi.json'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules/material-design-icons/iconfont/',
                        src: '**',
                        dest: 'build/material-icons/'
                    }
                ]
            },
            img: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'web/img/',
                        src: '**',
                        dest: 'build/img/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-strip-json-comments');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'cssmin', 'stripJsonComments', 'copy']);
};