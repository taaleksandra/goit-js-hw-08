'use strict';

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// tutaj funkcja zapisująca czas odtswarzania
const currentTime = throttle(data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
  console.log(data.seconds);
}, 1000);

player.on('timeupdate', currentTime);
