
document.addEventListener('deviceready', onDeviceReady, false)

let iab
let onlineUrl

function onDeviceReady() {
    iab = cordova.InAppBrowser;
    
    checkConnection()
    
    document.addEventListener("offline", setOffline, false);
    document.addEventListener("online", setOnline, false);
    
}

function checkConnection() {
    var networkState = navigator.connection.type

    if ( networkState === 'none' ) {
        setOffline()
    } else {
        setOnline()
    }
}

function setOffline () {
    onlineUrl.close()
}

function setOnline () {
    iab.open('https://almanac.digital', '_self', 'location=no,clearsessioncache=yes,zoom=no')
}

