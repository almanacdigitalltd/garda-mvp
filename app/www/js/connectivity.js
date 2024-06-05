const storage = window.localStorage
let onlineUrl

const landingPage = 'index.html'
const site = 'https://thegrid.training'

const initialize = () => { 
    checkConnection()
    document.addEventListener("resume", checkConnection, false)
    document.addEventListener("visibilitychange", checkConnection, false)
    
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

const setOffline = () => {
    if ( onlineUrl ) {
        onlineUrl.close()
        window.location = landingPage
    }
}

const setOnline = () => {
    onlineUrl = window.open(site, '_blank', 'location=no,zoom=no')
}

export default initialize
