const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector(".replay");
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Songs
    const songs = document.querySelectorAll('.song-selector button');

    // Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    
    // Duration
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Select different songs
    songs.forEach(sng => {
        sng.addEventListener('click', function() {
            sng.src = this.getAttribute('data-song');
            video.src = this.getAttribute("data-video");
            checkPlaying(sng);
        })
    });

    // Play songs
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Replay song
    replay.addEventListener("click", function() {
        restartSong(song);
    });

    const restartSong = song => {
        let currentTime = song.currentTime;
        song.currentTime = 0;
    };

    // Select duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // Function to start and stop the song
    const checkPlaying = sng => {
        if(sng.paused) {
            sng.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            sng.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // Animate the circle for time display
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the time text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
}

app();