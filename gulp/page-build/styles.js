var gulp = require('gulp')

// gulp plugins
var sass = require('gulp-sass')
var clean = require('gulp-clean')

// config
var config = require('../config')
var dirs = config.dirs

// files
var scss = './' + dirs.src + '/styles/*.scss'
var scssOutfile = './' + dirs.build
var builtCss = './' + dirs.build + '/css/*.css'

// tasks
gulp.task('dev:build-styles', [ 'dev:clean-styles' ], function() {
  return gulp.src(scss)
    .pipe(sass({ outfile: scssOutfile }).on('error', sass.logError))
    .pipe(gulp.dest('./' + dirs.build + '/css/'))
})

gulp.task('dev:clean-styles', function() {
  return gulp.src(builtCss, { read: false })
    .pipe(clean({ force: true }))
})