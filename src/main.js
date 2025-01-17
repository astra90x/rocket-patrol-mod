/**
 * Name: Astra Tsai
 * Title: Rocket Patrol
 * Time: 1 hour
 * Mods:
 * - Display the time remaining (in seconds) on the screen (3)
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
