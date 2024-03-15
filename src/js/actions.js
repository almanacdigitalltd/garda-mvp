const getSessionInfo = () => {
    return fetch('/actions/users/session-info', {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json());
}

const pushScore = ( session, score ) => {
    const params = new FormData();

    params.append( 'userId', session.id );
    params.append( 'fields[score]', score )

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