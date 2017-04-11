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

wavesurfer.load('https://s3-us-west-1.amazonaws.com/music-noirdoor/Fireworks.mp3')

wavesurfer.on('ready', function () {
    // wavesurfer.play();
});
