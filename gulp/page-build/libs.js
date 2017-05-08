var gulp = require('gulp')

// gulp plugins
var clean = require('gulp-clean')
var webpack = require('gulp-webpack')
var rename = require('gulp-rename')

// config
var config = require('../config')
var dirs = config.dirs

// files
var libSrc = './' + dirs.src + '/lib/**/*.*'
var libBuild = './' + dirs.build + '/lib'

// gulp tasks
gulp.task('dev:build-lib', [ 'dev:clean-lib' ], function() {
  return gulp.src(libSrc)
    .pipe(gulp.dest(libBuild))
})

gulp.task('dev:clean-lib', function() {
  return gulp.src(libBuild, { read: false})
    .pipe(clean({ force: true }))
})