function pauseOnDoubleClick(event) {
    // `this` is the player in this context  
    this.pause();
};

var options = {
    width: 600, 
    height: 300, 
    controls: true,    
    fluid: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2],    
    userActions: {
        doubleClick: pauseOnDoubleClick
    },
    poster: 'https://video.acharyaprashant.org/sarvasar-upanishad/sarvasar-upanishad-video-2/playlist.m3u8.jpg',
    controlBar: {
            volumePanel: {
                inline: false
            }
    },
    //autoplay: 'muted',
    inactivityTimeout: 0, //Prevents auto-hide player controls (helpful while debugging css)    
    //nativeControlsForTouch: true,        
};

var player = videojs('ap-video', options);

// player.playsinline(true)
player.addClass('vjs-theme-ap')
player.addClass('vjs-big-play-centered')
player.addClass('vjs-show-big-play-button-on-pause')

//Prevent console error in Mozilla.
player.src({
    src: 'https://video.acharyaprashant.org/sarvasar-upanishad-part-one-video-5/playlist.m3u8',
    type: 'application/x-mpegURL'
});

player.hlsQualitySelector({
    displayCurrentQuality: true,
    placementIndex: 0    
});


/*
player.seekButtons({
    forward: 10,
    back: 10,
    forwardIndex: 1,
    backIndex: 0
});
*/

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

//Brightcover overlay cards - https://www.npmjs.com/package/videojs-overlay
player.overlay({
    // content: 'Default overlay content',
    // debug: true,
    overlays: [{
    content: '',
    start: 60,
    end: 120,
    align: 'top-left',
    showBackground: true,
    class: 'overlay'
    }]
});

player.on('fullscreenchange', function(){
    if(this.isFullscreen() && screen.width < 470)
    {
        console.log('Fullscreen On:'+screen.width)
        player.addClass('fullscreen')
    }else{
        console.log('Fullscreen Off: '+screen.width)
        player.removeClass('fullscreen')
    }
})