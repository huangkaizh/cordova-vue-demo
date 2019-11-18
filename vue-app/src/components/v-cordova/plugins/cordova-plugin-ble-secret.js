exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof ble_secret === 'undefined') {
      return cb(false)
    }

    // pass through the ble_secret object
    Vue.cordova.ble_secret = ble_secret

    return cb(true)

  }, false)
}
