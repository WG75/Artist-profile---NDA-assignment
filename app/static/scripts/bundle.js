/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wavesurfer = __webpack_require__(1);

var _wavesurfer2 = _interopRequireDefault(_wavesurfer);

var _songs = __webpack_require__(3);

var _songs2 = _interopRequireDefault(_songs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var player = {};

player.playList = {
  songs: ["firework", "dawn", "pawinpaw"],
  currentIndex: 0
};

player.getCurrentLoadedSong = function () {
  return player.playList.songs[player.playList.currentIndex];
};

player.load = function () {

  var song = player.extractSongObj();
  var songUrl = song.url;

  _wavesurfer2.default.load(songUrl);
};

player.play = function () {
  player.load();

  _wavesurfer2.default.on('ready', function () {
    _wavesurfer2.default.play();
  });
};

player.next = function () {
  player.playList.currentIndex++;
  if (player.playList.currentIndex == player.playList.songs.length) {
    player.playList.currentIndex = 0;
  }

  player.play();
};

player.back = function () {
  player.playList.currentIndex--;
  if (player.playList.currentIndex < 0) {
    player.playList.currentIndex = player.playList.songs.length - 1;
  }

  player.play();
};

player.toggle = function () {
  _wavesurfer2.default.playPause();
};

player.extractSongObj = function () {
  var targetSong = player.getCurrentLoadedSong();
  var song = _songs2.default[targetSong];

  return song;
};

exports.default = player;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wavesurfer = WaveSurfer.create({
  container: '.wave',
  waveColor: 'white',
  progressColor: 'green',
  height: 70,
  barHeight: 0.5,
  barWidth: 1,
  cursorWidth: 2,
  cursorColor: '#464d50',
  hideScrollbar: true
});

wavesurfer.on('finish', function () {
  _player2.default.next();
});

exports.default = wavesurfer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _wavesurfer = __webpack_require__(1);

var _wavesurfer2 = _interopRequireDefault(_wavesurfer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playerButton = document.querySelector('#play');
var playerBackButton = document.querySelector('#previous');
var playerNextButton = document.querySelector('#next');
var trackName = document.querySelector('.track-name');
var trackAlbum = document.querySelector('.album-name');
var trackLength = document.querySelector('.track-length');
var trackImage = document.querySelector('.track-image');
var playlist = document.querySelector('.songs-container');
var trackTime = document.querySelector('.countdown');

var ui = {

  playerButtonIsPused: function playerButtonIsPused() {
    playerButton.classList.remove('fa-play');
    playerButton.classList.add('fa-pause');
  },

  playerButtonIsPlay: function playerButtonIsPlay() {
    playerButton.classList.remove('fa-pause');
    playerButton.classList.add('fa-play');
  },

  updatePlayList: function updatePlayList() {

    ui.clearPlayList();

    var song = _player2.default.extractSongObj();

    ui.updateTrackInfo(song);

    var elSong = document.querySelector("[data-song-key=" + song.key + "]").parentNode;

    elSong.id = 'is-playing';
  },

  songIsLoading: function songIsLoading() {

    var currentSong = _player2.default.getCurrentLoadedSong();
    var btn = document.querySelector("[data-song-key=" + currentSong + "]");

    btn.classList.add('fa-circle-o-notch', 'fa-spin');
  },

  songIsNotLoading: function songIsNotLoading() {
    var currentSong = _player2.default.getCurrentLoadedSong();
    var btn = document.querySelector("[data-song-key=" + currentSong + "]");

    btn.classList.remove('fa-circle-o-notch', 'fa-spin');
  },

  clearPlayList: function clearPlayList() {
    if (document.getElementById('is-playing')) {
      document.getElementById('is-playing').id = "";
    }
  },

  updateTrackInfo: function updateTrackInfo(song) {
    trackName.textContent = song.name;
    trackAlbum.textContent = song.album;
    trackLength.textContent = song.length;
    trackImage.setAttribute('src', song.picture);
  },

  updateTrackDuration: function updateTrackDuration() {
    var currentTrackTime = parseInt(_wavesurfer2.default.getCurrentTime());
    var trackDuration = parseInt(_wavesurfer2.default.getDuration());
    var seconds = currentTrackTime % 60;
    var minutes = parseInt(currentTrackTime / 60);

    seconds = seconds > 10 ? seconds : "0" + seconds;
    var time = minutes + ":" + seconds;

    trackTime.textContent = time;

    setTimeout(ui.updateTrackDuration, 1000);
  }
};

playerBackButton.addEventListener('click', function () {
  _player2.default.back();
});

playerNextButton.addEventListener('click', function () {
  _player2.default.next();
});

playerButton.addEventListener('click', function () {
  _player2.default.toggle();
});

playlist.addEventListener('click', function (e) {
  var target = e.target;

  if (target.nodeName == 'BUTTON') {
    var song = target.getAttribute('data-song-key');

    if (_player2.default.playList.currentIndex === _player2.default.playList.songs.indexOf(song) && _wavesurfer2.default.isPlaying()) {
      _wavesurfer2.default.pause();
    } else {

      _player2.default.playList.currentIndex = _player2.default.playList.songs.indexOf(song);

      _player2.default.play();
    }
  }
});

_wavesurfer2.default.on('play', function () {
  ui.playerButtonIsPused();
  ui.updatePlayList();
  ui.updateTrackDuration();
});

_wavesurfer2.default.on('pause', function () {
  ui.playerButtonIsPlay();
  ui.clearPlayList();
});

_wavesurfer2.default.on('loading', function () {
  ui.songIsLoading();
});

_wavesurfer2.default.on('ready', function () {
  ui.songIsNotLoading();
});

exports.default = ui;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
	"firework": {
		"name": "Firework",
		"album": "Anatomy of the bear",
		"length": "1:20",
		"url": "https://s3-us-west-1.amazonaws.com/music-noirdoor/Fireworks.mp3",
		"picture": "/images/firework.jpg",
		"key": "firework"
	},
	"dawn": {
		"name": "Dawn",
		"album": "Awakening",
		"length": "1:16",
		"url": "https://s3-us-west-1.amazonaws.com/music-noirdoor/+Dawn.mp3",
		"picture": "/images/dawn.jpg",
		"key": "dawn"
	},
	"pawinpaw": {
		"name": "Paw in Paw",
		"album": "Anatomy of the bear",
		"length": "1:36",
		"url": "https://s3-us-west-1.amazonaws.com/music-noirdoor/Paw+In+Paw.mp3",
		"picture": "/images/pawinpaw.jpg",
		"key": "pawinpaw"
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _ui = __webpack_require__(2);

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_player2.default.load();

/***/ })
/******/ ]);