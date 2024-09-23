document.getElementById('playButton').addEventListener('click', function() {
    // Hide text and button
    document.getElementById('message').style.display = 'none';
    this.style.display = 'none'; // 'this' refers to the button that was clicked

    // Gradually increase opacity of the video background
    var video = document.getElementById('videoBackground');
    fadeIn(video, 2000); // Fade in over 2 seconds (2000 milliseconds)

    // Gradually increase opacity of the audio
    var audio = document.getElementById('myAudio');
    fadeIn(audio, 2000); // Fade in over 2 seconds (2000 milliseconds)

    // Start the audio playback
    audio.volume = 0; // Start with 0 volume
    audio.play();
    fadeVolume(audio, 0.3, 2000); // Gradually increase volume to 0.3 over 2 seconds

    // Array of lyrics with their corresponding timing
    var lyricsWithTiming = [
        { lyric: "I watch the moon", time: 0 },
        { lyric: "Let it run my mood", time: 5 },
        { lyric: "Can’t stop thinking of you", time: 8 },
        { lyric: "I watch you (Now I let it go)", time: 12 },
        { lyric: "(And I watch as things play out like)", time: 12 },
        { lyric: "So long, nice to know you, I'll be moving on", time: 18 },
        { lyric: "We started off in-", time: 23 }
    ];

    var lyricsContainer = document.getElementById('lyricsContainer');
    var currentLine = 0;

    // Update lyrics function
    function updateLyrics() {
        if (currentLine < lyricsWithTiming.length) {
            var currentLyric = lyricsWithTiming[currentLine].lyric;
            var nextLyric = currentLine + 1 < lyricsWithTiming.length ? lyricsWithTiming[currentLine + 1].lyric : ""; // Check if there is a next lyric
            
            // Check if the current line and the next line should be displayed together
            if (lyricsWithTiming[currentLine].time === lyricsWithTiming[currentLine + 1]?.time) {
                lyricsContainer.innerHTML = `<p>${currentLyric}</p><p>${nextLyric}</p>`;
                currentLine += 2; // Skip to the next pair of lines
            } else {
                lyricsContainer.innerHTML = `<p>${currentLyric}</p>`;
                currentLine++;
            }
        } else {
            // All lyrics displayed, clear the lyrics container
            lyricsContainer.textContent = "";
        }
    }

    // Play next line of lyrics when the audio is playing
    audio.addEventListener('timeupdate', function() {
        var currentTime = Math.floor(audio.currentTime);
        var nextLineTime = lyricsWithTiming[currentLine].time;

        if (currentTime >= nextLineTime) {
            updateLyrics();
        }
    });

    // Start updating lyrics
    updateLyrics();

    // Show the video after ? seconds (milliseconds)
    setTimeout(function() {
        video.style.display = 'block';
        video.play();
    }, 0);

    // Show the lyrics after ? seconds (milliseconds)
    setTimeout(function() {
        lyricsContainer.style.display = 'block';
    }, 0);
});

function fadeIn(element, duration) {
    var opacity = 0;
    var intervalTime = 20; // Interval time in milliseconds
    var increment = intervalTime / duration;

    var interval = setInterval(function() {
        opacity += increment;
        if (opacity >= 1) {
            opacity = 1;
            clearInterval(interval);
        }
        element.style.opacity = opacity;
    }, intervalTime);
}

function fadeVolume(audio, targetVolume, duration) {
    var currentVolume = audio.volume;
    var intervalTime = 20; // Interval time in milliseconds
    var volumeIncrement = (targetVolume - currentVolume) / (duration / intervalTime);

    var interval = setInterval(function() {
        currentVolume += volumeIncrement;
        if (currentVolume >= targetVolume) {
            currentVolume = targetVolume;
            clearInterval(interval);
        }
        audio.volume = currentVolume;
    }, intervalTime);
}
