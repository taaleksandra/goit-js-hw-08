'use strict';

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

//saving current time to local storage
const currentTime = data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);

  if (data.duration === data.seconds) {
    data.seconds = 0;
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }
};

player.on('timeupdate', throttle(currentTime, 1000));

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
