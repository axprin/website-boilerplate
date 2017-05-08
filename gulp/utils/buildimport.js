var path = require('path')

module.exports = function buildImportObj(opts) {
  var file = opts.file

  var fileNameIndex = file.history[0].indexOf(opts.base) + opts.base.length
  var fileName = file.history[0].slice(fileNameIndex)

  if (fileName[0] === '/') fileName = fileName.slice(1)

  fileName = fileName.substr(0, fileName.indexOf(path.extname(fileName)))

  buildImport(fileName.split('/'), opts.imports)

  function buildImport(fileNameArray, imports) {
    var segment = fileNameArray[0]

    if (fileNameArray.length > 1) {
      if ( !imports[segment]) imports[segment] = {}
      buildImport(fileNameArray.slice(1), imports[segment])
    } else {
      imports[segment] = opts.importDefinition
      opts.cb()
    }
  }
}