const storage = window.localStorage
let user = storage.getItem('user')

const landingPage = 'quiz.html'

const initialize = () => { 
    if ( user ) {
        window.location = landingPage;
    } else {
        loginSubmit()
    }
}

const loginSubmit = () => {
    const loginForm = document.querySelector('.c-login')

    if ( ! loginForm ) {
        return
    }

    loginForm.addEventListener('submit', ( ev ) => {
        ev.preventDefault()

        saveUsername( document.querySelector('.c-form__username').value )
    })
}

const saveUsername = username => {
    storage.setItem('user', username);

    window.location = landingPage;
}

export default initialize
