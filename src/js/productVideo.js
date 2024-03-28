const productVideo = document.querySelector('.productVideo');
const productChapter = document.querySelectorAll('.productChapter');
const productProgress = document.querySelector('.productProgress');

const productView = document.querySelector('.c-product__video-view');

// Controls
const videoPlay = document.querySelector('.videoPlay')
const videoNext = document.querySelector('.videoNext')
const videoVolume = document.querySelector('.videoVolume')

const initialize = () => {
    setTimeout(()=> {
        setChapterEndtime()
        renderChapterSize()
    }, 200)

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
}

const playVideo = (e) => {
    if ( productVideo.paused ) {
        productVideo.play();
        productView.classList.add('videoActive')
        // videoPlay.textContent = 'Pause'
    } else {
        productVideo.pause();
        productView.classList.remove('videoActive')
        // videoPlay.textContent = 'Play'
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
    console.log(productProgress.offsetWidth)
    console.log((e.offsetX/e.srcElement.clientWidth)*productVideo.duration)
    console.log(e.offsetX)

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

export default initialize;