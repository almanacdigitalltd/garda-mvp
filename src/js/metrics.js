const metrics = document.querySelector( '.js-metrics' )
const open = document.querySelector( '.js-metrics-open' )
const close = document.querySelector( '.js-metrics-close' )

const initialize = () => {
    if ( metrics ) {
        initToggle()
    }
}

const initToggle = () => {
    open.addEventListener( 'click', ( ev ) => {
        ev.preventDefault()
        metrics.classList.add('c-metrics--open')
    } )

    close.addEventListener( 'click', ( ev ) => {
        ev.preventDefault()
        metrics.classList.remove('c-metrics--open')
    } )
}

export default initialize;