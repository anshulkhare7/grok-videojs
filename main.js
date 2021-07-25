var options = {
    controls: true,
    //autoplay: 'muted',
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
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

var player = videojs('example-video', options);

player.src({
    src: 'https://video.acharyaprashant.org/sarvasar-upanishad-part-one-video-5/playlist.m3u8',
    type: 'application/x-mpegURL'
});

player.hlsQualitySelector({
    displayCurrentQuality: true,
    placementIndex: 4
});

player.seekButtons({
    forward: 10,
    back: 10,
    forwardIndex: 2,
    backIndex: 0
});