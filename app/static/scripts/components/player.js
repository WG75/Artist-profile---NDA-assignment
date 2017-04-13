import waveSurfer from "../utili/wavesurfer.js"
import songs from "../songs.json"


const player = {};

player.playList = {
  songs: ["firework", "dawn", "pawinpaw"],
  currentIndex: 0
}

player.getCurrentLoadedSong = () => player.playList.songs[player.playList.currentIndex]


player.load = () => {

  let song = player.extractSongObj();
  let songUrl = song.url;

  waveSurfer.load(songUrl);

}

player.play = () => {
  player.load();

  waveSurfer.on('ready', () => {
    waveSurfer.play()
  })
}

player.next = () => {
  player.playList.currentIndex++
  if(player.playList.currentIndex == player.playList.songs.length) {
    player.playList.currentIndex = 0;
  }

  player.play();

}

player.back = () => {
  player.playList.currentIndex--
  if(player.playList.currentIndex < 0) {
    player.playList.currentIndex = player.playList.songs.length - 1;
  }

  player.play();

}


player.toggle = () => {
  waveSurfer.playPause()
}


player.extractSongObj = () => {
    let targetSong = player.getCurrentLoadedSong();
    let {[targetSong] : song} = songs;
    return song;
}


export default player
