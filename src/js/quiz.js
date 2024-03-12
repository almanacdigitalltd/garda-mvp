import Swiper from "@modules/swiper";
import { Navigation, Pagination } from "@modules/swiper/modules";

const fraction = document.querySelector( '.c-quiz__fraction span' );
const slides = document.querySelectorAll( '.c-quiz .swiper-slide' );
const slideCount = slides.length;
fraction.textContent = `1 of ${slideCount}`;

const nextButton = document.querySelector( '.c-quiz__next' )
const submitButton = document.querySelector( '.c-quiz__submit' )

const initialize = () => {
    setupSwiper()

    answerTrigger( document.querySelector('.c-quiz .swiper-slide-1') )

    submitAnswers()
}

const setupSwiper = () => {
    const swiper = new Swiper('.c-quiz', {
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

    answerTrigger( document.querySelector( '.c-quiz .swiper-slide-' + index ) )

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
    submitButton.addEventListener('click', () => {
        getScore()
    })
}

const getScore = () => {
    const answers = document.querySelectorAll('.c-quiz input:checked')
    let score = 0
    
    answers.forEach( answer => {
        score = score + Number( answer.value )
    })

    alert( 'Your score is ' + score )
}

export default initialize;