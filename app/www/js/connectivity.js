let onlineUrl

const initialize = () => { 
    checkConnection()
    
    document.addEventListener("offline", setOffline, false)
    document.addEventListener("online", setOnline, false)
}

const checkConnection = () => {
    var networkState = navigator.connection.type

    if ( networkState === 'none' ) {
        setOffline()
    } else {
        setOnline()
    }
}

const setOffline = () =>{
    if ( ! onlineUrl ) return
    onlineUrl.close()
}

const setOnline = () =>{
    onlineUrl = cordova.InAppBrowser.open('https://grid.ddev.site', '_self', 'location=no,clearsessioncache=yes,zoom=no')
}

export default initialize
