function myDoubleClickHandler(event) {
    // `this` is the player in this context  
    this.pause();
};

var options = {
    controls: true,
    //autoplay: 'muted',
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    inactivityTimeout: 0, //Prevents auto-hide player controls
    // nativeControlsForTouch: true,    
    userActions: {
        doubleClick: myDoubleClickHandler
    },
    poster: 'https://video.acharyaprashant.org/sarvasar-upanishad/sarvasar-upanishad-video-2/playlist.m3u8.jpg',
    controlBar: {
            volumePanel: {
                inline: false
            }
    },
    html5: {
        hlsjsConfig: {                    
            debug: true
        }
    }
};



// setup beforeinitialize hook
videojs.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjsInstance) => {
    // here you can interact with hls.js instance and/or video.js playback is initialized
});

var player = videojs('ap-video', options);

// player.addClass('vjs-theme-city')
player.addClass('vjs-theme-ap')
player.addClass('vjs-big-play-centered')

//Prevent console error in Mozilla.
player.src({
    src: 'https://video.acharyaprashant.org/sarvasar-upanishad-part-one-video-5/playlist.m3u8',
    type: 'application/x-mpegURL'
});

player.hlsQualitySelector({
    displayCurrentQuality: true,
    placementIndex: 0    
});

player.seekButtons({
    forward: 10,
    back: 10,
    forwardIndex: 1,
    backIndex: 0
});