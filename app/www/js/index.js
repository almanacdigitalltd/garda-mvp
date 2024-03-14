// import connectivity from "./connectivity.js"
// import user from "./user.js"

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;

    window.open('https://grid.ddev.site', '_self', 'location=no,clearsessioncache=yes,zoom=no')

    // connectivity()
    // user()
}
