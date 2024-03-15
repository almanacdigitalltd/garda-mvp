import connectivity from "./connectivity.js"

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;

    StatusBar.hide()

    connectivity()
}
