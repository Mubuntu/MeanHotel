module.exports = function (grunt) {

    grunt.registerTask('speak', () => {
        console.log("I'm speaking");
    });
    grunt.registerTask('yell', () => {
        console.log("I'm yelling");
    });

    grunt.registerTask('both', ['speak', 'yell'])
    ;// Project configuration.
    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            controllers: {
                src: ['api/controllers/hotels.controllers.js', 'api/controllers/reviews.controllers.js'],
                dest: 'build/backend/controllers.js',
            }, data: {
                src: ['api/data/db.js', 'api/data/hotels.model.js'],
                dest: 'build/backend/data.js',
            }

        }, uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'build/alles.map'
                },
                files: {
                    'build/alles.min.js': ['api/controllers/hotels.controllers.js', 'api/controllers/hotels.controllers.js']
                }
            }
        },
        jshint: {
            all: ['api/**/*.js']
        },
        watch: {
            js: {
                files: ['api/**/*.js'],
                tasks: ['concat', 'jshint', 'notify_hooks'], //:controllers zal alleen de controllers package concatoneren
            },
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "mean-app", // defaults to the name in package.json, or will use project directory's name
                success: false, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },
        htmlhint: {
            html1: {
                options: {
                    'tag-pair': true
                },
                src: ['public/**/*.html']
            },
            html2: {
                options: {
                    'tag-pair': true
                },
                src: ['public/*.html']
            }
        },

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    // Default task(s).
    grunt.registerTask('default', ['watch', 'uglify', 'htmlhint']);

    grunt.task.run('notify_hooks');


};