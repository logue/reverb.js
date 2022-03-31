# Reverb.js

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/@logue/reverb/badge)](https://www.jsdelivr.com/package/npm/@logue/reverb)
[![NPM Downloads](https://img.shields.io/npm/dm/vuetify-swatches.svg?style=flat)](https://www.npmjs.com/package/@logue/reverb)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@logue/reverb/file/README.md)
[![npm version](https://img.shields.io/npm/v/@logue/reverb.svg)](https://www.npmjs.com/package/@logue/reverb)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/Reverb.js)

Append reverb effect to audio source.

This script is originally a spin out of [sf2synth.js](https://github.com/logue/smfplayer.js)'s reverb effect.

## Sample

- <https://logue.dev/Reverb.js/>
- <https://logue.dev/Reverb.js/localaudio.html>

## Syntax

```js
const reverb = new Reverb(ctx, {
  noise: 0, // Inpulse Response Noise algorithm (0: White noise, 1: Pink noise, 2: Brown noise)
  decay: 5, // Amount of IR (Inpulse Response) decay. 0~100
  delay: 0, // Delay time o IR. (NOT delay effect) 0~100 [sec]
  filterFreq: 2200, // Filter frequency. 20~5000 [Hz]
  filterQ: 1, // Filter quality. 0~10
  filterType: 'lowpass', // Filter type. 'bandpass' etc. See https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type .
  mix: 0.5, // Dry (Original Sound) and Wet (Effected sound) raito. 0~1
  reverse: false, // Reverse IR.
  time: 3, // Time length of IR. 0~50 [sec]
});
```

## Usage

```js
// Setup Audio Context
const ctx = new (window.AudioContext || window.webkitAudioContext)();

// iOS fix.
document.addEventListener('touchstart', initAudioContext);
function initAudioContext() {
  document.removeEventListener('touchstart', initAudioContext);
  // wake up AudioContext
  const emptySource = ctx.createBufferSource();
  emptySource.start();
  emptySource.stop();
}

// Setup Reverb Class
const reverb = new Reverb(ctx, {});

// put Audio data to audio buffer source
const sourceNode = ctx.createBufferSource();
sourceNode.buffer = [AudioBuffer];

// Connect Reverb
reverb.connect(sourceNode);
sourceNode.connect(ctx.destination);

// fire
sourceNode.play();
```

## Reference

- [Web Audio API](https://www.w3.org/TR/webaudio/)
  - [Web Audio API 日本語訳](https://g200kg.github.io/web-audio-api-ja/)
- [コンボルバーの使い方](https://www.g200kg.com/jp/docs/webaudio/convolver.html)
- [WebAudio の闇](https://qiita.com/zprodev/items/7fcd8335d7e8e613a01f)

## License

[MIT](LICENSE)
