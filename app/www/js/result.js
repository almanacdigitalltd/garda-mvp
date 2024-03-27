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
    console.log( 'PASSED: ', passed )
    console.log( 'SCORE: ', score )
    console.log( 'SCORE CONTENT: ', scoreContent )
}

export default initialize