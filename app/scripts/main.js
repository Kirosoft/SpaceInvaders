/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
// Create the canvas
import $ from 'jquery';
window.$ = $;
import Game from './libs/game';
import Invader from './libs/invader';
import Input from './libs/input';
import Player from './libs/player';
import WallBrick from './libs/wallBlock';

/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  console.log('READY');

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // Fill with gradient

  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);

  var invaderImg = new Image();
  invaderImg.src = 'images/space.png';
  var playerImg = new Image();
  playerImg.src = 'images/player.png';
  var wallBrickImg = new Image();
  wallBrickImg.src = 'images/wallBrick.png';

  ctx.font = "48px serif";

  var input = new Input(canvas);
  input.bind('LEFT_ARROW', 'left');
  input.bind('RIGHT_ARROW', 'right');
  input.bind('SPACE', 'space');

  var game = new Game(canvas, ctx);
  window.game = game;

  // Build the invaders
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 10; x++) {
      var invader = new Invader(100 + (x*50), 30+(y*30), 'inv'+y+x, invaderImg);
      game.add(invader);
    }
  }

  // Build the base houses
  for (let house = 0; house < 4; house++) {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        let brick = new WallBrick( 50 + (house * 150) + (x * 16),
                    400 + (y * 16), 'brick'+house+'-'+y+'-'+x, wallBrickImg);
        game.add(brick);
      }
    }
  }

  var player = new Player(100, 460, 'player', playerImg, input);
  game.add(player);

  game.start();
})();
