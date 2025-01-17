import Phaser from 'phaser'

import global from '../global.js'

const Menu = class extends Phaser.Scene {
  constructor() {
    super('menuScene')
  }

  preload() {
    // load audio
    this.load.audio('sfx-select', './assets/sfx-select.wav')
    this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
    this.load.audio('sfx-rocket', './assets/sfx-shot.wav')
  }

  create() {
    // menu text configuration
    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0,
    }

    // show menu text
    this.add.text(global.game.config.width / 2, global.game.config.height / 2 - global.borderUISize - global.borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
    this.add.text(global.game.config.width / 2, global.game.config.height / 2, 'Use \u2190\u2192 arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
    menuConfig.backgroundColor = '#00FF00'
    menuConfig.color = '#000'
    this.add.text(global.game.config.width / 2, global.game.config.height / 2 + global.borderUISize + global.borderPadding, 'Press \u2190 for Novice or \u2192 for Expert', menuConfig).setOrigin(0.5)

    // define keys
    global.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    global.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(global.keyLEFT)) {
      // novice mode
      global.game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000,
      }
      this.sound.play('sfx-select')
      this.scene.start('playScene')
    }
    if (Phaser.Input.Keyboard.JustDown(global.keyRIGHT)) {
      // expert mode
      global.game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000,
      }
      this.sound.play('sfx-select')
      this.scene.start('playScene')
    }
  }
}

export default Menu
