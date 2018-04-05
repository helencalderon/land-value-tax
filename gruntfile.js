module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },



        clean: {
            images: ['img'],
            scripts: ['scripts/compiled.js', 'scripts/dev-compiled.js']
        },



        concat: {

            options: {
                //banner: "---\n---\n", uncomment if Liquid ever needed
                separator: '\n',
                stripBanners: true,
            },
            dist: {
                src: ['dev/js/*.js'],
                dest: 'dev/js/main.js',
            },

        },



        uglify: {
            my_target: {
                files: {
                    'js/main.js': ['dev/js/main.js']
                }
            }
        },


        copy: {
            main: {
                files: [{
                        expand: true,
                        cwd: 'node_modules/d3/dist/',
                        src: 'd3.min.js',
                        dest: 'js/vendor/',
                        flatten: true,
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist/',
                        src: 'jquery.min.js',
                        dest: 'js/vendor/',
                        flatten: true
                    }

                ]


            }
        },

 /*https://github.com/nDmitry/grunt-postcss */
        postcss: {
            options: {
               // map: true,
                processors: [
                    require('autoprefixer')({ browsers: '> 2% in GB' }, {grid: true}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: '_site/css/main.css'
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('images', ['clean:images', 'imagemin']);
    grunt.registerTask('javascript', ['clean:scripts', 'concat', 'uglify']);
    grunt.registerTask('jsdev', ['clean:scripts', 'concat', 'jshint']);
    grunt.registerTask('vendorjs', 'copy');
    grunt.registerTask('prefixcss', 'postcss');
};