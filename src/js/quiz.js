import Swiper from "@modules/swiper"
import { Navigation, Pagination } from "@modules/swiper/modules"

import { getSessionInfo, pushScore } from './actions'

const storage = window.localStorage
let score = JSON.parse( storage.getItem('score') )

const fraction = document.querySelector( '.c-quiz__fraction span' )
const slides = document.querySelectorAll( '.c-quiz__swiper .swiper-slide' )
let slideCount
if ( fraction && slides ) {
    slideCount = slides.length;
    fraction.textContent = `1 of ${slideCount}`;
}

const nextButton = document.querySelector( '.c-quiz__next' )
const submitButton = document.querySelector( '.c-quiz__submit' )

const initialize = () => {
    if ( fraction && slides ) {
        setupSwiper()

        answerTrigger( document.querySelector('.c-quiz__swiper .swiper-slide-1') )

        submitAnswers()
    }
}

const setupSwiper = () => {
    const swiper = new Swiper('.c-quiz__swiper', {
        modules: [ Navigation, Pagination ],
        navigation: {
            nextEl: '.c-quiz__next',
        },
        pagination: {
            el: '.c-quiz__bar',
            type: 'bullets'
        },
        slidesPerView: 1,
        allowTouchMove: false,
        on: {
            slideChange: () => {
                onSlideChange( swiper )
            }
        }
    })
}

const onSlideChange = swiper => {
    let index = swiper.realIndex + 1

    fraction.textContent = `${index} of ${slideCount}`
    nextButton.classList.add( 'e-button--disabled' )
    submitButton.classList.add( 'e-button--disabled' )

    answerTrigger( document.querySelector( '.c-quiz__swiper .swiper-slide-' + index ) )

    swapNextSubmit( index, slideCount )
}

const answerTrigger = activeSlide => {
    const answers = activeSlide.querySelectorAll( 'input' )
    
    answers.forEach( answer => {
        answer.addEventListener( 'change', () => {
            nextButton.classList.remove( 'e-button--disabled' )
            submitButton.classList.remove( 'e-button--disabled' )
        } )
    });
}

const swapNextSubmit = ( index, slideCount ) => {
    if ( index == slideCount ) {
        nextButton.classList.add( 'e-button--hide' )
        submitButton.classList.remove( 'e-button--hide' )
    }
}

const submitAnswers = () => {
    submitButton.addEventListener('click', ( ev ) => {
        getScore( ev.currentTarget.dataset.results )
    })
}

const getScore = resultsPath => {
    const questions = document.querySelectorAll('.c-quiz__item').length
    const answers = document.querySelectorAll('.c-quiz__swiper input:checked')
    const passRate = 70
    let score = 0
    let passed = 0
    
    answers.forEach( answer => {
        score = score + Number( answer.value )
    })

    if ( ( (100 * score) / questions ) > passRate ) {
        passed = 1
    }

    saveScore( score, passed )
    .then(
        response => {
            console.log('score saved', response)
            window.location.href = resultsPath
        },
        response => {
            console.log('score NOT saved', response)
            window.location.href = resultsPath
        }
    )
}

const saveScore = ( score, passed ) => {
    storage.setItem('score', score);
    storage.setItem('passed', passed);

    if ( this === undefined ) {
        return sendToCms( score, passed )
        .then(
            response => {
                return Promise.resolve( response )
            },
            result => {
                return Promise.reject( result )
            }
        )
    } else {
        return Promise.resolve()
    }
}

const sendToCms = ( score, passed ) => {
    return getSessionInfo()
    .then(
        session => {
            return pushScore( session, score, passed )
            .then(
                response => {
                    return Promise.resolve( response )
                },
                result => {
                    return Promise.reject( result )
                }
            )
        },
        () => {
            return Promise.reject()
        }
    )
}

export default initialize;
