const sass = require('sass')
const babel = require('grunt-babel')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
       sass: {
           options: {
                implementation: sass,
                sourceMap: true
           },
           main: {
               files: {
                   'dist/css/main.css': 'src/style/main.scss'
               }
           }
       },
       babel: {
           options: {
                presets: ['@babel/preset-env']
           },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/*.js'
                }
            }
       },
       watch: {
           js: {
               files: ['src/js/*.js'],
               tasks: ['babel']
           },
           css: {
               files: ['src/scss/*.scss'],
               tasks: ['sass']
           }
       }
    })

    loadGruntTasks(grunt)
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}