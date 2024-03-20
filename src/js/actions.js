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

    fetch('/actions/users/save-user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-CSRF-Token': session.csrfTokenValue,
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: params,
    })
    .then( response => response.json() )
    .then( result => console.log( result ) );
}

export {
    getSessionInfo,
    pushScore
}