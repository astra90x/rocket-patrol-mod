import Phaser from 'phaser'

import Menu from './scenes/Menu.js'
import Play from './scenes/Play.js'

window.game = new Phaser.Game({
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [Menu, Play],
})

// set UI sizes
window.borderUISize = game.config.height / 15
window.borderPadding = borderUISize / 3

// reserve keyboard variables
window.keyF = null
window.keyR = null
window.keyLEFT = null
window.keyRIGHT = null
