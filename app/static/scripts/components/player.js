import playList from "./playlist.js"
import waveSurfer from "../utili/wavesurfer.js"
import songs from "../songs.json"



const player = {};

player.getCurrentLoadedSong = () => playList.songs[playList.currentIndex]

player.play = () => {

  let song = player.extractSongObj();
  let songUrl = song.url;

  waveSurfer.load(songUrl);
}

player.next = () => {
  playList.currentIndex++
  if(playList.currentIndex == playList.songs.length) {
    playList.currentIndex = 0;
  }

  player.play();

}

player.back = () => {
  playList.currentIndex--
  if(playList.currentIndex < 0) {
    playList.currentIndex = playList.length - 1;
  }

  player.play();

}


player.stop = () => {
  waveSurfer.pause()
}


player.extractSongObj = () => {
    let targetSong = player.getCurrentLoadedSong();
    let {[targetSong] : song} = songs;
    return song;
}

player.updateTrackInfo = () => {

}


export default player
