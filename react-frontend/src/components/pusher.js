import Pusher from 'pusher-js';

export var pusher = new Pusher('key', {
    cluster: 'cluster'
  });