import connectivity from "./connectivity.js"
import user from "./user.js"

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    connectivity()
    user()
}
