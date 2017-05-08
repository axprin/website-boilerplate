// import all the modules: 
var test = require('./modules/test')
var testTwo = require('./modules/testTwo')

// extremely basic error handling:
function catchErrors (arg, fn) {
  try {
    return fn(arg)
  } catch (e) {
    console.error('Error: ', e)
  }
}

// init functions
function initTest () {
  var testClass = '.test'
  var testInstances = Array.prototype.slice.apply(document.querySelectorAll(testClass))
  testInstances.forEach(function (testEl) {
    catchErrors(testEl, test)
  })
}

function initTestTwo () {
  var testTwoClass = '.testTwo'
  var testTwoInstances = Array.prototype.slice.apply(document.querySelectorAll(testTwoClass))
  testTwoInstances.forEach(function (testTwoEl) {
    catchErrors(testTwoEl, testTwo)
  })
}

// run the stuff on load: 
window.onload = function () {
  initTest()
  initTestTwo()
}

// run the stuff on resize: 
window.onresize = function () {
  initTest()
  initTestTwo()
}