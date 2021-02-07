const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Songs
    const songs = document.querySelectorAll('.song-selector button');

    // Time display
    const timeDisplay = document.querySelector('.time-display');

    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    
    // Duration
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Play songs
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Function to start and stop the song
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }
}

app();