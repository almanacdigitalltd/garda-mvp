import connectivity from "./connectivity.js"

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    connectivity()
}
