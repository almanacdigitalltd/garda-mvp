import connectivity from "./connectivity.js"
import result from "./result.js"

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;

    StatusBar.hide()

    connectivity()

    result()
}
