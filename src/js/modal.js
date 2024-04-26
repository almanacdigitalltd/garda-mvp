var isCordovaApp = !!window.cordova;

let type, link

const initialize = () => {
    const clickedItems = document.querySelectorAll('.js-modal')

    if ( clickedItems ) {
        clickedItems.forEach( clicked => {
            clicked.addEventListener( 'click', ev => {
                ev.preventDefault()
                type = clicked.dataset.modalType
                link = clicked.getAttribute('href')
    
                render( clicked )
            })
        })
    }

}

const render = clicked => {
    let header = 'Log out'
    let content = 'Your progress will NOT be saved. Are you sure you want to log out?'

    if ( type == 'exit' ) {
        header = 'Exit test?'
        content = 'Your progress will NOT be saved. Are you sure you want to exit this test?'
    }

    if ( type == 'app-logout' ) {
        content = 'Log out disabled when tablet is offline'
    }

    let headerText, modalButtonYes, buttonYesText, modalButtonNo, buttonNoText

    const modalContainer = document.createElement( 'div' )
    if ( type == 'score' ) {
        modalContainer.classList.add( 'o-modal', 'o-modal--score' )
    } else if ( type == 'notes' ) {
        modalContainer.classList.add( 'o-modal', 'o-modal--notes' )
    } else {
        modalContainer.classList.add( 'o-modal' )
    }

    const modalContent = document.createElement( 'div' )
    modalContent.classList.add( 'o-modal__content' )

    const modalHeader = document.createElement( 'h2' )
    if ( type == 'score' ) {
        if ( clicked.dataset.modalScore.length === 0 ) {
            modalHeader.classList.add( 'h1', 'o-modal__header', 'o-modal__header--boxed', 'o-modal__header--untaken' )
            headerText = document.createTextNode( 'Test Not Taken' )
        } else if ( clicked.dataset.modalPassed === '1' ) {
            modalHeader.classList.add( 'h1', 'o-modal__header', 'o-modal__header--boxed', 'o-modal__header--passed' )
            headerText = document.createTextNode( 'Test Passed' )
        } else {
            modalHeader.classList.add( 'h1', 'o-modal__header', 'o-modal__header--boxed', 'o-modal__header--failed' )
            headerText = document.createTextNode( 'Test Failed' )
        }
    } else if ( type == 'notes' ) {

    } else {
        modalHeader.classList.add( 'h1', 'o-modal__header' )
        headerText = document.createTextNode( header )
    }
    if ( headerText ) {
        modalHeader.appendChild( headerText )
    }
    if ( modalHeader ) {
        modalContent.appendChild( modalHeader )
    }

    if ( type == 'score' ) {

        const modalSubheader = document.createElement( 'h3' )
        modalSubheader.classList.add( 'h2', 'o-modal__subheader' )
        const subHeadText = clicked.dataset.modalName + ' test results'
        const contentSubheader = document.createTextNode( subHeadText )
        modalSubheader.appendChild( contentSubheader )
        modalContent.appendChild( modalSubheader )

        const modalScoreWrap = document.createElement( 'div' )
        modalScoreWrap.classList.add( 'o-modal__score-wrap' )

        const modalScoreWrapLeft = document.createElement( 'div' )
        modalScoreWrapLeft.classList.add( 'o-modal__score-wrap-left' )

        const modalScoreWrapRight = document.createElement( 'div' )
        modalScoreWrapRight.classList.add( 'o-modal__score-wrap-right' )

        const modalImage = document.createElement( 'img' )
        modalImage.classList.add( 'o-modal__image' )
        modalImage.src = '/assets/img/spot-image.png'
        modalScoreWrapLeft.appendChild( modalImage )

        const modalProduct = document.createElement( 'h4' )
        modalProduct.classList.add( 'h3', 'o-modal__product' )
        const productText = clicked.dataset.modalProduct + ' ' + clicked.dataset.modalBrand
        const contentProduct = document.createTextNode( productText )
        modalProduct.appendChild( contentProduct )
        modalScoreWrapRight.appendChild( modalProduct )
        
        const modalTotal = document.createElement( 'h5' )
        modalTotal.classList.add( 'h4', 'o-modal__total' )
        let totalText
        if ( clicked.dataset.modalScore.length === 0 ) {
            totalText = 'Total No score'
        } else {
            totalText = 'Total ' + clicked.dataset.modalScore + ' out of 10'
        }
        const contentTotal = document.createTextNode( totalText )
        modalTotal.appendChild( contentTotal )
        modalScoreWrapRight.appendChild( modalTotal )

        modalScoreWrap.appendChild( modalScoreWrapLeft )
        modalScoreWrap.appendChild( modalScoreWrapRight )
        modalContent.appendChild( modalScoreWrap )

    } else if ( type == 'notes' ) {

        const modalImage = document.createElement( 'img' )
        modalImage.classList.add( 'o-modal__image' )
        modalImage.src = '/assets/img/notes.jpg'
        modalContent.appendChild( modalImage )

    } else {

        const modalText = document.createElement( 'p' )
        modalText.classList.add( 'o-modal__text' )
        const contentText = document.createTextNode( content )
        modalText.appendChild( contentText )
        modalContent.appendChild( modalText )

    }

    if ( type == 'app-logout' ) {
        modalButtonYes = document.createElement( 'button' )
        modalButtonYes.classList.add( 'e-button', 'o-modal__button', 'o-modal__yes', 'o-modal__hide' )
        buttonYesText = document.createTextNode( 'Ok' )
        modalButtonYes.appendChild( buttonYesText )
        
        modalButtonNo = document.createElement( 'button' )
        modalButtonNo.classList.add( 'e-button', 'o-modal__button', 'o-modal__no' )
        buttonNoText = document.createTextNode( 'Ok' )
        modalButtonNo.appendChild( buttonNoText )
    } else if ( type == 'score' || type == 'notes' ) {
        modalButtonYes = document.createElement( 'button' )
        modalButtonYes.classList.add( 'e-button', 'o-modal__button', 'o-modal__yes', 'o-modal__hide' )
        buttonYesText = document.createTextNode( 'Close' )
        modalButtonYes.appendChild( buttonYesText )
        
        modalButtonNo = document.createElement( 'button' )
        modalButtonNo.classList.add( 'e-button', 'o-modal__button', 'o-modal__no' )
        buttonNoText = document.createTextNode( 'Close' )
        modalButtonNo.appendChild( buttonNoText )
    } else {
        modalButtonYes = document.createElement( 'button' )
        modalButtonYes.classList.add( 'e-button', 'o-modal__button', 'o-modal__yes' )
        buttonYesText = document.createTextNode( 'Yes' )
        modalButtonYes.appendChild( buttonYesText )
    
        modalButtonNo = document.createElement( 'button' )
        modalButtonNo.classList.add( 'e-button', 'o-modal__button', 'o-modal__no' )
        buttonNoText = document.createTextNode( 'No' )
        modalButtonNo.appendChild( buttonNoText )
    }
    
    modalContent.appendChild( modalButtonYes )
    modalContent.appendChild( modalButtonNo )

    modalContainer.appendChild( modalContent )
    modalContainer.classList.add( 'o-modal--show' )

    document.body.appendChild( modalContainer )

    events()
}

const events = () => {
    const modal = document.querySelector('.o-modal')
    const buttons = document.querySelectorAll('.o-modal__button')

    buttons.forEach( () => {
        control().then(() => {
            window.location.href = link
        }).catch(() => {
            modal.classList.remove( 'o-modal--show' )
        })
    })
}

const control = () => {
    let yesHandler
    let noHandler

    const modal = document.querySelector('.o-modal')

    const yes = modal.querySelector( '.o-modal__yes' )
    const no = modal.querySelector( '.o-modal__no')

    return new Promise( ( resolve, reject ) => {
        yesHandler = resolve
        noHandler = reject

        yes.addEventListener( 'click', yesHandler )
        no.addEventListener( 'click', noHandler )
    })
    .finally( () => {
        modal.classList.remove( 'o-modal--show' )

        yes.removeEventListener( 'click', yesHandler )
        no.removeEventListener( 'click', noHandler )

        cleanup()
    } )
}

const cleanup = () => {
    const modal = document.querySelector('.o-modal')
    modal.remove()
}

export default initialize;