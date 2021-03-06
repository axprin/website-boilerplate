var gulp = require('gulp')

// gulp plugins
var clean = require('gulp-clean')
var webpack = require('gulp-webpack')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

// config
var config = require('../config')
var dirs = config.dirs

// files
var jsSrc = './' + dirs.src + '/js/**/*.js'
var jsBuild = './' + dirs.build + '/js'

// gulp tasks
gulp.task('dev:build-js', [ 'dev:clean-js' ], function() {
  return gulp.src(jsSrc)
    .pipe(webpack())
    .pipe(rename('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsBuild))
})

gulp.task('dev:clean-js', function() {
  return gulp.src(jsBuild, { read: false})
    .pipe(clean({ force: true }))
})