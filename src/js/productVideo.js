const productVideo = document.querySelector('.productVideo');
const productChapter = document.querySelectorAll('.productChapter');
const productProgress = document.querySelector('.productProgress');
const productSeek = document.querySelector('.productSeek');

const productView = document.querySelector('.c-product__video-view');
const productNav = document.querySelector('.c-product__video-nav');

// Controls
const videoPlay = document.querySelector('.videoPlay')
const videoNext = document.querySelector('.videoNext')
const videoVolume = document.querySelector('.videoVolume')

let videoDuration

const initialize = () => {
    if(!productVideo) return
    
    productVideo.onloadedmetadata = () => {
        setTimeout( () => {
            videoDuration = Math.round( productVideo.duration )

            productSeek.setAttribute('max', videoDuration);
            productProgress.setAttribute('max', videoDuration);

            setChapterEndtime()
            renderChapterSize()
            
            events(productVideo);
        }, 100)
    }
}

const events = (video) => {
    
    video.addEventListener('click', () => {
        playVideo('initial')
    });
    
    videoPlay.addEventListener('click', () => {
        playVideo('control')
    });

    videoNext.addEventListener('click', nextChapter);

    videoVolume.addEventListener('input', setVolume);

    productSeek.addEventListener('input', skipAhead);

    video.addEventListener('timeupdate', updateTime);
}

const playVideo = (type = 'control') => {
    if ( productVideo.paused ) {
        productVideo.play();
        productView.classList.add('videoActive')
        videoPlay.classList.add('playActive')
        hideNav();
    } else {
        if ( type == 'initial' ) {
            showNav();
        } else {
            productVideo.pause();
        }

        videoPlay.classList.remove('playActive')

        setTimeout(() => {
            hideNav();
        }, 3000)
    }
}

const setChapterEndtime = () => {
    
    for(let i=0; i < productChapter.length; i++) {
        let endTime;
        
        if (i < productChapter.length-1) {
            endTime = productChapter[i+1].getAttribute('data-chapter-start');
        } else {
            endTime = Math.round(productVideo.duration);
        }

        productChapter[i].setAttribute('data-chapter-end', endTime)
    }
}

const renderChapterSize = () => {
    productChapter.forEach((chapter) => {
        let chapterLength = chapter.getAttribute('data-chapter-end')-chapter.getAttribute('data-chapter-start');
        chapter.style.width = (chapterLength/Math.round(productVideo.duration)*100)+'%';
    })
}

const updateTime = () => {
    chapterStatus();
    setProgress();
}

const chapterStatus = () => {
    productChapter.forEach((chapter) => {
        if ( productVideo.currentTime >= chapter.getAttribute('data-chapter-start') && productVideo.currentTime <= chapter.getAttribute('data-chapter-end')) {
            chapter.classList.add('active')
        } else {
            chapter.classList.remove('active')
        }
    })
}

const setProgress = () => {
    productSeek.value = Math.floor( productVideo.currentTime )
    productProgress.value = Math.floor( productVideo.currentTime )
}

const skipAhead = ev => {
    const skipTo = ev.target.dataset.seek ? ev.target.dataset.seek : ev.target.value;
    productVideo.currentTime = skipTo;
    productProgress.value = skipTo;
}

const nextChapter = () => {
    productChapter.forEach((chapter) => {
        if( chapter.classList.contains('active') ) {
            productVideo.currentTime = chapter.nextElementSibling.getAttribute('data-chapter-start')
        }
    })
    
    showNav();
    hideNav();
}

const setVolume = (e) => {
    productVideo.volume = e.target.value
}

const hideNav = () => {
    setTimeout(() => {
        if ( !productVideo.paused ) {
            productNav.classList.remove('navActive');
        } else {
            productNav.classList.add('navActive');
        }
    }, 3000)
}

const showNav = () => {
    productNav.classList.add('navActive');
}

export default initialize;