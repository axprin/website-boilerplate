var through = require('through2')
var _ = require('lodash')

module.exports = function template(templateFile) {
  return through.obj(function(file, enc, cb) {
    var templateFn = _.template(file.contents.toString(), {
      variable: 'data'
    })
    var compiled = templateFn(file.data)
    var pageWrapper;

    if (file.data.pageType) {
      pageWrapper = _.templateSettings.imports.templates[file.data.pageType]
    } else {
      pageWrapper = _.templateSettings.imports.templates.pageWrapper
    }

    var final = pageWrapper(_.extend({
      content: compiled
    }, file.data))

    file.contents = new Buffer(final, 'utf-8')
    this.push(file);
    cb()
  })
}