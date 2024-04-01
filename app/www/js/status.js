const status = document.querySelector('.js-status')

const initialize = () => { 
    if ( status ) {
        setStatus()
    }
}

const setStatus = () => {
    if ( window.localStorage.getItem('passed') === '1' ) {
        status.classList.remove('c-product-list__status--failed')
        status.classList.add('c-product-list__status--passed')
    } else {
        status.classList.remove('c-product-list__status--passed')
        status.classList.add('c-product-list__status--failed')
    }
}

export default initialize