import Phaser from 'phaser'

import global from '../global.js'

const Menu = class extends Phaser.Scene {
  constructor() {
    super('menuScene')
    this.modes = [
      {
        name: 'Easy',
        spaceshipSpeed: 3,
        gameTimer: 60000,
      },
      {
        name: 'Medium',
        spaceshipSpeed: 4,
        gameTimer: 45000,
      },
      {
        name: 'Hard',
        spaceshipSpeed: 6,
        gameTimer: 30000,
      },
    ]
    this.mode = 0
  }

  preload() {
    // load audio
    this.load.audio('sfx-select', './assets/sfx-select.wav')
    this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
    this.load.audio('sfx-rocket', './assets/sfx-shot.wav')
    this.load.image('starfield', './assets/starfield.png')
  }

  create() {
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
    // menu text configuration
    let menuConfig = {
      fontFamily: 'Trebuchet MS',
      fontSize: '24px',
      color: '#F3B141',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0,
    }

    // show menu text
    this.add.text(global.game.config.width / 2, global.game.config.height / 2 - global.borderUISize - global.borderPadding * 2, 'Rocket Patrol', { ...menuConfig, fontSize: '40px' }).setOrigin(0.5)
    menuConfig.color = '#0033FF'
    this.add.text(global.game.config.width / 2, global.game.config.height / 2 + (global.borderUISize + global.borderPadding) * 3, 'Game controls: \u2190 \u2192 to move / F to fire', { ...menuConfig, fontSize: '20px' }).setOrigin(0.5)
    menuConfig.color = '#00FF00'
    this.modeText = this.add.text(global.game.config.width / 2, global.game.config.height / 2 + (global.borderUISize + global.borderPadding) * 0.5, '', menuConfig).setOrigin(0.5)
    this.add.text(global.game.config.width / 2, global.game.config.height / 2 + (global.borderUISize + global.borderPadding) * 1.6, 'Press enter to start', menuConfig).setOrigin(0.5)

    // define keys
    global.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    global.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    global.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  }

  update() {
    this.starfield.tilePositionX -= 1
    if (Phaser.Input.Keyboard.JustDown(global.keyLEFT)) {
      this.mode--
    }
    if (Phaser.Input.Keyboard.JustDown(global.keyRIGHT)) {
      this.mode++
    }
    this.mode = (this.mode + this.modes.length) % this.modes.length
    this.modeText.text = `\u2190 ${this.modes[this.mode].name} \u2192`
    if (Phaser.Input.Keyboard.JustDown(global.keyENTER)) {
      global.game.settings = this.modes[this.mode]
      this.sound.play('sfx-select')
      this.scene.start('playScene')
    }
  }
}

export default Menu
