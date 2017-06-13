module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            debug: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*/examples/index.html',
                    dest: 'dist',
                    rename: function(dest, fileName) {
                        return dest + '/' + fileName;
                    }
                }, {
                    expand: true,
                    cwd: 'src',
                    src: '*/examples/main.js',
                    dest: 'dist',
                    rename: function(dest, fileName) {
                        return dest + '/' + fileName.split('/examples/main.js')[0] + '/README.mk';
                    }
                }]
            }
        },

        less: {
            debug: {
                options: {
                    cleancss: true 
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*/index.css',
                    dest: 'dist',
                    rename: function(dest, fileName) {
                        return dest + '/' + fileName;
                    }                    
                }]
            } 
        },

        cssmin: {
            debug: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*/index.css',
                    dest: 'dist',
                    rename: function(dest, fileName) {
                        return dest + '/' + fileName;
                    }                    
                }]
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']

            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/', 
                    src: '*/index.js', 
                    dest: 'dist',
                    rename: function(dest, fileName) {
                        return dest + '/' + fileName;
                    }
                }]
            }
        },

        watch: {
            start: {
                files: ['src/css/*/*.css', 'src/style/*.css', 'src/js/*.js', 'examples/*.*', 'examples/style/*.*'],
                tasks: ['less', 'copy']
            }
        },

        clean: {
            debug: ['./dist'],
            release: ['./test', './dist']
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['babel','less:debug','cssmin:debug', 'copy:debug']);    
};
