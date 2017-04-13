import player from "../components/player.js"

const wavesurfer = WaveSurfer.create({
  container: '.wave',
  waveColor: 'white',
  progressColor: 'green',
  height: 70,
  barHeight: 0.5,
  barWidth: 1,
  cursorWidth: 2,
  cursorColor: '#464d50',
  hideScrollbar: true
})


wavesurfer.on('finish', () => {
  player.next();
})

wavesurfer.on('loading', () => {
  console.log('loading');
})


export default wavesurfer
