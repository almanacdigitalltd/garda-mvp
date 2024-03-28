const storage = window.localStorage

const saveScore = ( score, passed ) => {
    storage.setItem('score', score);
    storage.setItem('passed', passed);

    if ( this === undefined ) {
        return sendToCms( score, passed )
        .then(
            response => {
                return Promise.resolve( response )
            },
            result => {
                return Promise.reject( result )
            }
        )
    } else {
        return Promise.resolve()
    }
}

const sendToCms = ( score, passed ) => {
    return getSessionInfo()
    .then(
        session => {
            return pushScore( session, score, passed )
            .then(
                response => {
                    return Promise.resolve( response )
                },
                result => {
                    return Promise.reject( result )
                }
            )
        },
        () => {
            return Promise.reject()
        }
    )
}

const getSessionInfo = () => {
    return fetch('/actions/users/session-info', {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json());
}

const pushScore = ( session, score, passed ) => {
    const params = new FormData();

    params.append( 'userId', session.id );
    params.append( 'fields[score]', score )
    params.append( 'fields[testPass]', passed )

    return fetch('/actions/users/save-user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-CSRF-Token': session.csrfTokenValue,
        },
        body: params,
    })
    .then( response => response.json() )
    .then( result => result )
}

export default saveScore