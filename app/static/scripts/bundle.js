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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playlist = __webpack_require__(3);

var _playlist2 = _interopRequireDefault(_playlist);

var _wavesurfer = __webpack_require__(4);

var _wavesurfer2 = _interopRequireDefault(_wavesurfer);

var _songs = __webpack_require__(1);

var _songs2 = _interopRequireDefault(_songs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var player = {};

player.getCurrentLoadedSong = function () {
  return _playlist2.default.songs[_playlist2.default.currentIndex];
};

player.play = function () {

  var song = player.extractSongObj();
  var songUrl = song.url;

  _wavesurfer2.default.load(songUrl);
};

player.next = function () {
  _playlist2.default.currentIndex++;
  if (_playlist2.default.currentIndex == _playlist2.default.songs.length) {
    _playlist2.default.currentIndex = 0;
  }

  player.play();
};

player.back = function () {
  _playlist2.default.currentIndex--;
  if (_playlist2.default.currentIndex < 0) {
    _playlist2.default.currentIndex = _playlist2.default.length - 1;
  }

  player.play();
};

player.stop = function () {
  _wavesurfer2.default.pause();
};

player.extractSongObj = function () {
  var targetSong = player.getCurrentLoadedSong();
  var song = _songs2.default[targetSong];

  return song;
};

player.updateTrackInfo = function () {};

exports.default = player;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	"firework": {
		"name": "Firework",
		"album": "Anatomy of the bear",
		"lenght": "1:20",
		"url": "https://s3-us-west-1.amazonaws.com/music-noirdoor/Fireworks.mp3",
		"picture": "/images/firework.jpg"
	},
	"dawn": {
		"name": "Dawn",
		"album": "Awakening",
		"lenght": "1:20",
		"url": "https://s3-us-west-1.amazonaws.com/music-noirdoor/+Dawn.mp3",
		"picture": "/images/dawn.jpg"
	},
	"pawinpaw": {
		"name": "Paw in Paw",
		"album": "Anatomy of the bear",
		"lenght": "1:20",
		"url": "https://s3-us-west-1.amazonaws.com/music-noirdoor/Paw+In+Paw.mp3",
		"picture": "/images/pawinpaw.jpg"
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_player2.default.play();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var playList = {};

playList.songs = ["firework", "dawn", "pawinpaw"];

playList.currentIndex = 0;

exports.default = playList;

/***/ }),
/* 4 */
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

wavesurfer.on('ready', function () {
  // wavesurfer.play();
});

wavesurfer.on('finish', function () {
  _player2.default.next();
});

exports.default = wavesurfer;

/***/ })
/******/ ]);