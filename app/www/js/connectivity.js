const storage = window.localStorage
let user = storage.getItem('user')
let onlineUrl

const landingPage = 'index.html'
const noAccessPage = 'blank.html'

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
    }

    if ( user ) {
        window.location = landingPage;
    } else {
        window.location = noAccessPage;
    }
}

const setOnline = () => {
    onlineUrl = window.open('https://phpstack-1230980-4394122.cloudwaysapps.com/', '_blank', 'location=no,zoom=no')

    pollingBrowserWindow( onlineUrl )
}

const pollingBrowserWindow = onlineUrl => {
    onlineUrl.addEventListener( "loadstop", () => {
        onlineUrl.executeScript({
            code: "localStorage.setItem( 'user', '' );"
        });

        var loop = setInterval( () => {
            onlineUrl.executeScript({
                code: "localStorage.getItem( 'user' )"
            },
            values => {
                const user = values[ 0 ];
    
                if ( user ) {
                    clearInterval( loop )
                    storage.setItem('user', user)
                }
            })
        })
    })
}

export default initialize
