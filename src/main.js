/**
 * Name: Astra Tsai
 * Title: Rocket Patrol
 * Time: 1 hour
 * Mods:
 * - Implement the speed increase that happens after 30 seconds in the original game (1)
 * - Randomize each spaceship's movement direction at the start of each play (1)
 * - Display the time remaining (in seconds) on the screen (3)
 * - Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
 * Citation:
 * - Nathan's code
 * - Phaser documentation
 */

import Phaser from 'phaser'

import global from './global.js'
import Menu from './scenes/Menu.js'
import Play from './scenes/Play.js'

global.game = new Phaser.Game({
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [Menu, Play],
})

// set UI sizes
global.borderUISize = global.game.config.height / 15
global.borderPadding = global.borderUISize / 3

// reserve keyboard variables
global.keyF = null
global.keyR = null
global.keyLEFT = null
global.keyRIGHT = null
