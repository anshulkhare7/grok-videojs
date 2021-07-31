function myDoubleClickHandler(event) {
    // `this` is the player in this context  
    this.pause();
};

var options = {
    width: 600, 
    height: 300, 
    controls: true,    
    fluid: true,
    responsive: true,
    // fill: true,
    playbackRates: [0.5, 1, 1.5, 2],    
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
    },
    //autoplay: 'muted',
    inactivityTimeout: 0, //Prevents auto-hide player controls (helpful while debugging css)
    //nativeControlsForTouch: true,    
};



// setup beforeinitialize hook
videojs.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjsInstance) => {
    // here you can interact with hls.js instance and/or video.js playback is initialized
});

var player = videojs('ap-video', options);

// player.addClass('vjs-theme-city')
player.addClass('vjs-theme-ap')
player.addClass('vjs-big-play-centered')
// player.addClass('vjs-show-big-play-button-on-pause')

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

//Overlay buttons - https://www.npmjs.com/package/videojs-overlay-buttons
player.touchOverlay({
    seekLeft: {
      handleClick: () => {
        const time = Number(player.currentTime()) - 10;
  
        player.currentTime(time);
      },
      doubleTap: true,
    },
    play: {
      handleClick: () => {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      },
    },
    seekRight: {
      handleClick: () => {
        const time = Number(player.currentTime()) + 10;
  
        player.currentTime(time);
      },
      doubleTap: true,
    },
    lockButton: true
  });