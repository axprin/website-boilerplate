var through = require('through2')
var _ = require('lodash')
var gulp = require('gulp')
var buildImportObj = require('../utils/buildImport')

// gulp plugins
var frontmatter = require('gulp-gray-matter')
var rename = require('gulp-rename')
var clean = require('gulp-clean')

var template = require('../utils/gulp-template')


// config
var config = require('../config')
var dirs = config.dirs


// files
var pages = './' + dirs.src + '/pages/**/*.lodash'
var pageOutfile = './' + dirs.build
var buildPages = './' + dirs.build + '/*.html'
var partials = './' + dirs.src + '/partials/**/*.lodash'
var partialsDirname = 'partials'
var partialsNamespace = 'templates'


// tasks
gulp.task('dev:build-html', [ 'dev:clean-html', 'load-templates' ], function() {
  return gulp.src(pages)
    .pipe(frontmatter())
    .pipe(template())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(pageOutfile))
})

gulp.task('dev:clean-html', function() {
  return gulp.src(buildPages, { read: false })
    .pipe(clean({ force: true }))
})

gulp.task('load-templates', [ 'load-global-template-utils' ], function() {
  _.templateSettings.imports[partialsNamespace] = {};

  return gulp.src(partials)
    .pipe(frontmatter())
    .pipe(loadTemplates({
      base: partialsDirname,
      imports: _.templateSettings.imports[partialsNamespace]
    }))
})

function loadTemplates(opts) {
  return through.obj(function(file, enc, cb) {
    buildImportObj(_.extend(opts, {
      cb: cb,
      file: file,
      importDefinition: function(data) {
        return _.template(file.contents.toString(), {
          variable: 'data'
        })(_.extend(data, file.data))
      }
    }))
  })
}