var isCordovaApp = !!window.cordova;

let type, link

const initialize = () => {
    const clicked = document.querySelector('.js-modal')

    if ( clicked ) {
        clicked.addEventListener( 'click', ev => {
            ev.preventDefault()
            type = clicked.dataset.modalType
            link = clicked.getAttribute('href')

            render()
        })
    }

}

const render = () => {
    let header = 'Log out'
    let content = 'Your progress will NOT be saved. Are you sure you want to log out?'

    if ( type == 'exit' ) {
        header = 'Exit test?'
        content = 'Your progress will NOT be saved. Are you sure you want to exit this test?'
    }

    if ( type == 'app-logout' ) {
        content = 'Log out disabled when tablet is offline'
    }

    const modalContainer = document.createElement( 'div' )
    modalContainer.classList.add( 'o-modal' )

    const modalContent = document.createElement( 'div' )
    modalContent.classList.add( 'o-modal__content' )

    const modalHeader = document.createElement( 'h2' )
    modalHeader.classList.add( 'h1', 'o-modal__header' )
    const headerText = document.createTextNode( header )
    modalHeader.appendChild( headerText )
    
    const modalText = document.createElement( 'p' )
    modalText.classList.add( 'o-modal__text' )
    const contentText = document.createTextNode( content )
    modalText.appendChild( contentText )
    
    modalContent.appendChild( modalHeader )
    modalContent.appendChild( modalText )

    if ( type == 'app-logout' ) {
        const modalButtonYes = document.createElement( 'button' )
        modalButtonYes.classList.add( 'e-button', 'o-modal__button', 'o-modal__yes', 'o-modal__hide' )
        const buttonYesText = document.createTextNode( 'Ok' )
        modalButtonYes.appendChild( buttonYesText )
        
        const modalButtonNo = document.createElement( 'button' )
        modalButtonNo.classList.add( 'e-button', 'o-modal__button', 'o-modal__no' )
        const buttonNoText = document.createTextNode( 'Ok' )
        modalButtonNo.appendChild( buttonNoText )

        modalContent.appendChild( modalButtonYes )
        modalContent.appendChild( modalButtonNo )
    } else {
        const modalButtonYes = document.createElement( 'button' )
        modalButtonYes.classList.add( 'e-button', 'o-modal__button', 'o-modal__yes' )
        const buttonYesText = document.createTextNode( 'Yes' )
        modalButtonYes.appendChild( buttonYesText )
    
        const modalButtonNo = document.createElement( 'button' )
        modalButtonNo.classList.add( 'e-button', 'o-modal__button', 'o-modal__no' )
        const buttonNoText = document.createTextNode( 'No' )
        modalButtonNo.appendChild( buttonNoText )
        
        modalContent.appendChild( modalButtonYes )
        modalContent.appendChild( modalButtonNo )
    }

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