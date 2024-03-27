let failedContent, passedContent, scoreContent, passed, score

const initialize = () => { 
    const result = document.querySelector('.js-result')

    if ( result ) {
        failedContent = document.querySelector( '.js-failed' )
        passedContent = document.querySelector( '.js-passed' )
        scoreContent = document.querySelectorAll( '.js-score' )

        passed = window.localStorage.getItem( 'passed' )
        score = window.localStorage.getItem( 'score' )

        setContent()
    }
}

const setContent = () => {
    passedContent.classList.add('js-hide')
    failedContent.classList.add('js-hide')

    scoreContent.forEach( el => {
        el.textContent = score
    });

    if ( passed ) {
        passedContent.classList.remove('js-hide')
    } else {
        failedContent.classList.remove('js-hide')
    }
}

export default initialize