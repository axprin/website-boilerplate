var gulp = require('gulp')

// gulp plugins
var clean = require('gulp-clean')

// config
var config = require('../config')
var dirs = config.dirs

// files
var images = './' + dirs.src + '/images/**/*'
var buildImages = './' + dirs.build + '/images'

// tasks
gulp.task('dev:build-images', [ 'dev:clean-images' ], function() {
  return gulp.src(images)
    .pipe(gulp.dest(buildImages))
})

gulp.task('dev:clean-images', function() {
  return gulp.src(buildImages, { read: false})
    .pipe(clean({ force: true }))
})