const storage = window.localStorage
let onlineUrl

const landingPage = 'index.html'
const noAccessPage = 'blank.html'
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

    if ( ! storage.getItem('user') ) {
        window.location = noAccessPage
    }
}

const setOnline = () => {
    onlineUrl = window.open(site, '_blank', 'location=no,zoom=no')

    pollingBrowserWindow( onlineUrl )
}

const pollingBrowserWindow = onlineUrl => {
    onlineUrl.addEventListener( "loadstop", () => {
        var loop = setInterval( () => {
            onlineUrl.executeScript({
                code: "window.localStorage.getItem( 'user' )"
            },
            values => {
                const user = values[ 0 ];
                console.log( user )
    
                if ( user ) {
                    clearInterval( loop )
                    storage.setItem('user', user)
                }
            })
        })
    })
}

export default initialize
