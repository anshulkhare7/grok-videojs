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
    // inactivityTimeout: 0, //Prevents auto-hide player controls (helpful while debugging css)    
    //nativeControlsForTouch: true,        
};

var player = videojs('ap-video', options);

// player.playsinline(true)
player.addClass('vjs-theme-ap')
player.addClass('vjs-big-play-centered')
player.addClass('vjs-show-big-play-button-on-pause')

//Prevent console error in Mozilla.
player.src({
    src: 'https://video.acharyaprashant.org/sarvasar-upanishad/sarvasar-upanishad-video-2/playlist.m3u8',
    // src: 'https://video.acharyaprashant.org/sarvasar-upanishad-part-one-video-5/playlist.m3u8',
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
        // console.log('Fullscreen On:'+screen.width)
        player.addClass('fullscreen')
    }else{
        // console.log('Fullscreen Off: '+screen.width)
        player.removeClass('fullscreen')
    }
})

var longLivedModel = getLongLivedModel(player)
var formSubmitted = false

player.on('timeupdate', function() {
    if (this.currentTime() >= 30 && !formSubmitted) {
        console.log('Long live modal opening...')
        longLivedModel.open();
        this.pause()
      }    
});
  
// player.on('play', function() {
//     console.log('Long live modal closing...')
//     longLivedModel.close();
// });

// player.on('pause', function() {
//     // Modals are temporary by default. They dispose themselves when they are
//     // closed; so, we can create a new one each time the player is paused and
//     // not worry about leaving extra nodes hanging around.
//     var tempModal = player.createModal('This is a temporary modal!');    
//     tempModal.on('modalclose', function() {
//       player.play();
//     });
//   });

function getLongLivedModel(player){
    var ModalDialog = videojs.getComponent('ModalDialog');
    var longLivedModelHtml = document.createElement('div');
    longLivedModelHtml.innerHTML = '<form action="#" onSubmit="submitEmail(); return false;"><label for="email">Email:</label><input type="text" id="email" name="email" value="your@email.xyz"><input type="submit" value="Submit"></form>';
    var modalOptions = {
        // We don't want this modal to go away when it closes.
        content: longLivedModelHtml,
        pauseOnOpen: true,
        temporary: false,
        uncloseable: true
    }
    var longLivedModel = new ModalDialog(player, modalOptions);

    player.addChild(longLivedModel);
    longLivedModel.addClass('vjs-persistent-modal');
    return longLivedModel;
}

function submitEmail()
{
    console.log('form submitted: '+player.currentTime)
    formSubmitted = true
    longLivedModel.close();    
}