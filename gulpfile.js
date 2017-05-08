var gulp = require('gulp')

// tasks:
require('./gulp')
var server = require('gulp-server-livereload')

// config:
var config = require('./gulp/config')
var dirs = config.dirs

var devTasks = [
  'dev:build-styles',
  'dev:build-js',
  'dev:build-lib',
  'dev:build-html',
  'dev:build-images'
]

// Dev Task
gulp.task('dev', devTasks, function() {
  gulp.src('./' + dirs.build).pipe(server({
    livereload: {
      enable: true,
      filter: function(filePath, cb) {
        if (filePath.indexOf('.css') !== -1) {
          cb(filePath)
        }
      }
    }
  }))

  gulp.watch('./' + dirs.src + '/js/**/*.js', [ 'dev:build-js' ])
  gulp.watch('./' + dirs.src + '/**/*.lodash', [ 'dev:build-html' ])
  gulp.watch('./' + dirs.src + '/styles/*.scss', [ 'dev:build-styles' ])
})
