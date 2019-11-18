exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof ble === 'undefined') {
      return cb(false)
    }

    // pass through the ble object
    Vue.cordova.ble = ble

    return cb(true)

  }, false)
}
