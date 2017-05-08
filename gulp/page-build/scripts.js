var gulp = require('gulp')

// gulp plugins
var clean = require('gulp-clean')
var webpack = require('gulp-webpack')
var rename = require('gulp-rename')

// config
var config = require('../config')
var dirs = config.dirs

// files
var jsSrc = './' + dirs.src + '/js/**/*.js'
var libSrc = './' + dirs.src + '/lib/**/*.js'
var jsBuild = './' + dirs.build + '/js'

// gulp tasks
gulp.task('dev:build-js', [ 'dev:clean-js', 'dev:build-js-lib' ], function() {
  return gulp.src(jsSrc)
    .pipe(webpack())
    .pipe(rename('main.js'))
    .pipe(gulp.dest(jsBuild))
})

gulp.task('dev:build-js-lib', [ 'dev:clean-js' ], function() {
  return gulp.src(libSrc)
    .pipe(gulp.dest(jsBuild + '/lib'))
})

gulp.task('dev:clean-js', function() {
  return gulp.src(jsBuild, { read: false})
    .pipe(clean({ force: true }))
})