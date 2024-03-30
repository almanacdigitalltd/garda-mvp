const productVideo = document.querySelector('.productVideo');
const productChapter = document.querySelectorAll('.productChapter');
const productProgress = document.querySelector('.productProgress');

const productView = document.querySelector('.c-product__video-view');
const productNav = document.querySelector('.c-product__video-nav');

// Controls
const videoPlay = document.querySelector('.videoPlay')
const videoNext = document.querySelector('.videoNext')
const videoVolume = document.querySelector('.videoVolume')

const initialize = () => {
    
    productVideo.onloadedmetadata = (event) => {
        setChapterEndtime()
        renderChapterSize()
        progressNavDisplay()
    }

    if(!productVideo) return
    events(productVideo);
}

const events = (video) => {
    
    video.addEventListener('click', playVideo);
    
    videoPlay.addEventListener('click', playVideo);
    videoNext.addEventListener('click', nextChapter);
    videoVolume.addEventListener('input', setVolume);

    productProgress.addEventListener('click', changeProgress);

    video.addEventListener('timeupdate', updateTime)

    productChapter.forEach((chapter) => {
        chapter.addEventListener('click', () => {
            playChapter(chapter);
        })
    });

    productView.addEventListener('mouseover', () => {
        if ( !productVideo.paused ) {
            productNav.classList.add('navActive');
        }
        
    }) 

    productView.addEventListener('mouseleave', () => {
        if ( !productVideo.paused ) {
            setTimeout(() => {
                productNav.classList.remove('navActive');
            },1000)
        }
    }) 
}

const playVideo = (e) => {
    if ( productVideo.paused ) {
        productVideo.play();
        productView.classList.add('videoActive')
        videoPlay.classList.add('playActive')
    } else {
        productVideo.pause();
        productView.classList.remove('videoActive')
        videoPlay.classList.remove('playActive')
    }
}

const playChapter = (chapter) => {
    productVideo.currentTime = chapter.getAttribute('data-chapter-start');
}

const setChapterEndtime = () => {
    
    for(let i=0; i < productChapter.length; i++) {
        let startTime;
        let endTime;
        
        if (i < productChapter.length-1) {
            startTime = productChapter[i].getAttribute('data-chapter-start');
            endTime = productChapter[i+1].getAttribute('data-chapter-start');
        } else {
            startTime = productChapter[i].getAttribute('data-chapter-start');
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
    Math.round(productProgress.value = productVideo.currentTime/productVideo.duration*100)
}

const changeProgress = (e) => {
    productVideo.currentTime = (e.offsetX/e.srcElement.clientWidth)*productVideo.duration
}

const nextChapter = () => {
    productChapter.forEach((chapter) => {
        if( chapter.classList.contains('active') ) {
            productVideo.currentTime = chapter.nextElementSibling.getAttribute('data-chapter-start')
        }
    })
}

const setVolume = (e) => {
    productVideo.volume = e.target.value
}

const progressNavDisplay = () => {
    if ( productVideo.paused ) {
        productNav.classList.add('navActive');
    } else {
        productNav.classList.remove('navActive');
    }
}

export default initialize;