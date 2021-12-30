var options = {
    width: 500, 
    height: 640, 
    controls: true,        
    poster: 'https://vz-4df53096-bb3.b-cdn.net/d67eb94c-8ca5-45ec-8947-172a46bc5274/thumbnail.jpg',    
};

var player = videojs('ap-video', options);

player.src({   
    src: 'https://anshultest.b-cdn.net/shorts/12-mb-video.mp4',
    type: 'video/mp4'
});