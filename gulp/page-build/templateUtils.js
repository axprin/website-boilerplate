var through = require('through2')
var _ = require('lodash')
var gulp = require('gulp')

// gulp plugins
var newer = require('gulp-newer')

// config
var config = require('../config')
var dirs = config.dirs

// files
var templateUtils = './' + dirs.site + '/templateUtils.js'
var utilsNamespace = 'templateUtils'

// tasks
gulp.task('load-global-template-utils', function() {
  _.templateSettings.imports[utilsNamespace] = {}

  return gulp.src(templateUtils)
    .pipe(loadGlobalTemplateUtils())
})

function loadGlobalTemplateUtils() {
  return through.obj(function(file, enc, cb) {
    var utils = require('../../' + templateUtils)
    _.templateSettings.imports[utilsNamespace] = utils
    cb()
  })
}