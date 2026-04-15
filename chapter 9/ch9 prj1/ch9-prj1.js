const symbolPlay = '⯈';
const symbolPause = '❚ ❚';
const files = ['Nature-8399', 'River-655', 'Waterfall-941', 'WAVE-2737'];

document.addEventListener("DOMCotentLoaded", function() {
    // references to elements
    const video = document.querySelector('#vidPlayer');
    const playBtn = document.querySelector('#play');
    const stopBtn = document.querySelector('#stop');
    const progressBar = document.querySelector('#progressFilled');
    const vol = document.querySelector('#volume');
    const skipBtns = document.querySelectorAll('[data-skips]');

    // adds images to video list
    createVideoList(files);

    // event handler set up
    for (let btn of skipBtns) {
        btn.addEventListener('click', skip);
    }

    stopBtn.addEventListener('click', stopPlaying);
    playBtn.addEventListener('click', playOrPause);
    video.addEventListener('click', playOrPause);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);
    vol.addEventListener('input', changeVolume);

    // creates the visual list of possible videos that show up
    function createVideoList(files) {
        const aside = document.querySelector('aside');
        for (let f of files) {
            const img = document.createElement('img');
            img.src = 'images/${f}.jpg';
            img.dataset.name = f;
            aside.appendChild(img);

            img.addEventListener('click', function(e) {
                stopPlaying();
                video.src='video/${f}.mp4';

            })
        }
    }

    // playing or pausing the video
    function playOrPause() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // for skipping video forward/backwards
    function skip(e) {
        video.currentTime += parseInt(e.target.dataset.skip);
    }

    // stop video from playing
    function stopPlaying() {
        video.pause();
        video.currentTime = 0;
        handleProgress();
        updateButton();
    }

    // updates state of play/pause visuals
    function updateButton() {
        const icon = video.paused ? symbolPlay : symbolPause;
        playBtn.textContent = icon;
    }

    // updates progress bar
    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.computedStyleMap.flexBasis = '${percent}%';
    }

    // changes volume of video playback
    function changeVolume() {
        video.volume = vol.value;
    }

});
    
