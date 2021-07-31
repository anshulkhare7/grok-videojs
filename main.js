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
    //autoplay: 'muted',
    // inactivityTimeout: 0, //Prevents auto-hide player controls (helpful while debugging css)
    html5: {
      
    },    
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

player.seekButtons({
    forward: 10,
    back: 10,
    forwardIndex: 1,
    backIndex: 0
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

// else {
//     console.log('hello native!');
//     var video = document.getElementById('ap-video');
//     video.src = 'https://video.acharyaprashant.org/sarvasar-upanishad-part-one-video-5/playlist.m3u8';
//     video.addEventListener('loadedmetadata', function() {
//       video.play();
//     });
// }
// setup beforeinitialize hook
// videojs.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjsInstance) => {
//     // here you can interact with hls.js instance and/or video.js playback is initialized
// });

