let title, failedContent, passedContent, scoreContent, passed, score

const initialize = () => { 
    const result = document.querySelector('.js-result')

    if ( result ) {
        title = document.querySelector('.js-title')
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

    if ( passed == 1 ) {
        title.classList.remove('c-quiz__title--fail')
        title.classList.add('c-quiz__title--pass')
        passedContent.classList.remove('js-hide')
    } else {
        title.classList.remove('c-quiz__title--pass')
        title.classList.add('c-quiz__title--fail')
        failedContent.classList.remove('js-hide')
    }
}

export default initialize