import player from "./player.js"
import wavesurfer from "../utili/wavesurfer.js"

const playerButton = document.querySelector('#play');
const playerBackButton = document.querySelector('#previous');
const playerNextButton = document.querySelector('#next');
const trackName = document.querySelector('.track-name');
const trackAlbum = document.querySelector('.album-name');
const trackLength = document.querySelector('.track-length')
const trackImage = document.querySelector('.track-image')
const playlist = document.querySelector('.songs-container')
const trackTime = document.querySelector('.countdown');


const ui = {

  playerButtonIsPused: () => {
    playerButton.classList.remove('fa-play');
    playerButton.classList.add('fa-pause');
  },

  playerButtonIsPlay: () => {
    playerButton.classList.remove('fa-pause');
    playerButton.classList.add('fa-play');
  },

  updatePlayList: () => {

    ui.clearPlayList();

    let song = player.extractSongObj();

    ui.updateTrackInfo(song);

    const elSong = document.querySelector(`[data-song-key=${song.key}]`).parentNode;

    elSong.id = 'is-playing'
  },

  songIsLoading: () => {

    let currentSong = player.getCurrentLoadedSong();
    let btn = document.querySelector(`[data-song-key=${currentSong}]`)

    btn.classList.add('fa-circle-o-notch', 'fa-spin');
  },

  songIsNotLoading: () => {
    let currentSong = player.getCurrentLoadedSong();
    let btn = document.querySelector(`[data-song-key=${currentSong}]`)

    btn.classList.remove('fa-circle-o-notch', 'fa-spin');

  },

  clearPlayList: () => {
    if(document.getElementById('is-playing')) {
      document.getElementById('is-playing').id = "";
    }
  },

  updateTrackInfo: (song) => {
    trackName.textContent = song.name;
    trackAlbum.textContent = song.album;
    trackLength.textContent = song.length;
    trackImage.setAttribute('src', song.picture);
  },

  updateTrackDuration: () => {
    var currentTrackTime = parseInt(wavesurfer.getCurrentTime());
    var trackDuration = parseInt(wavesurfer.getDuration());
    var seconds = currentTrackTime % 60;
    var minutes = parseInt(currentTrackTime / 60);

    seconds = seconds > 10 ? seconds : "0" + seconds;
    var time = minutes + ":" + seconds;

    trackTime.textContent = time;

    setTimeout(ui.updateTrackDuration, 1000);
  }
};



playerBackButton.addEventListener('click', () => {
  player.back();
})

playerNextButton.addEventListener('click', () => {
  player.next();
})

playerButton.addEventListener('click', () => {
  player.toggle();
})

playlist.addEventListener('click', (e) => {
  let target = e.target;

  if(target.nodeName == 'BUTTON'){
    let song = target.getAttribute('data-song-key')

    if(player.playList.currentIndex === player.playList.songs.indexOf(song) && wavesurfer.isPlaying()){
      wavesurfer.pause()
    }else{

      player.playList.currentIndex = player.playList.songs.indexOf(song)

      player.play();
    }

  }
})


wavesurfer.on('play', () => {
  ui.playerButtonIsPused();
  ui.updatePlayList();
  ui.updateTrackDuration();
})

wavesurfer.on('pause', () => {
  ui.playerButtonIsPlay();
  ui.clearPlayList();
})

wavesurfer.on('loading', () => {
  ui.songIsLoading();
})

wavesurfer.on('ready', () => {
  ui.songIsNotLoading();
})

export default ui
