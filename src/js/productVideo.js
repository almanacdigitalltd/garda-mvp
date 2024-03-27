const productVideo = document.querySelector('.productVideo');
const productChapter = document.querySelectorAll('.productChapter');
const productProgress = document.querySelector('.productProgress');

const initialize = () => {

    events(productVideo);
}

const events = (video) => {
    video.addEventListener('click', playVideo);

    video.addEventListener('timeupdate', updateTime)

    productChapter.forEach((chapter) => {
        chapter.addEventListener('click', () => {
            playChapter(chapter);
        })
    });
}

const playVideo = () => {
    if ( productVideo.paused ) {
        productVideo.play();
    } else {
        productVideo.pause();
    }
}

const playChapter = (chapter) => {
    productVideo.currentTime = chapter.getAttribute('data-chapter-start');
}

const updateTime = () => {
    // console.log(productVideo.currentTime)
    // console.log(productVideo.duration)

    // console.log(productVideo.currentTime/productVideo.duration*100)

    chapterStatus();
    setProgress();
}

const chapterStatus = () => {
    productChapter.forEach((chapter) => {
        // console.log(chapter.getAttribute('data-chapter-start'))
        if ( productVideo.currentTime >= chapter.getAttribute('data-chapter-start') ) {
            chapter.style.color = 'red';
        } else {
            chapter.style.color = 'blue';
        }
    })
}

const setProgress = () => {
    // productVideo.currentTime/productVideo.duration*100
    productProgress.value = productVideo.currentTime/productVideo.duration*100
}

export default initialize;