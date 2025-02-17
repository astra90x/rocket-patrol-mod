import Phaser from 'phaser'

import global from '../global.js'
import Rocket from '../prefabs/Rocket.js'
import Spaceship from '../prefabs/Spaceship.js'

const Play = class extends Phaser.Scene {
  constructor() {
    super('playScene')
  }

  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/rocket.png')
    this.load.image('spaceship', './assets/spaceship.png')
    this.load.image('fastship', './assets/fastship.png')
    this.load.image('starfield', './assets/starfield.png')
    // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 })
  }

  create() {
    // place tile sprite
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

    // green UI background
    this.add.rectangle(0, global.borderUISize + global.borderPadding, global.game.config.width, global.borderUISize * 2, 0x00FF00).setOrigin(0, 0)
    // white borders
    this.add.rectangle(0, 0, global.game.config.width, global.borderUISize, 0xFFFFFF).setOrigin(0, 0)
    this.add.rectangle(0, global.game.config.height - global.borderUISize, global.game.config.width, global.borderUISize, 0xFFFFFF).setOrigin(0 ,0)
    this.add.rectangle(0, 0, global.borderUISize, global.game.config.height, 0xFFFFFF).setOrigin(0, 0)
    this.add.rectangle(global.game.config.width - global.borderUISize, 0, global.borderUISize, global.game.config.height, 0xFFFFFF).setOrigin(0 ,0)

    // add Rocket (p1)
    if (global.game.settings.twoPlayer) {
      this.p1Rocket = new Rocket(this, global.game.config.width * 0.3, global.game.config.height - global.borderUISize - global.borderPadding, 'rocket').setOrigin(0.5, 0)
      this.p2Rocket = new Rocket(this, global.game.config.width * 0.7, global.game.config.height - global.borderUISize - global.borderPadding, 'rocket').setOrigin(0.5, 0)
      this.p2Rocket.active = false
    } else {
      this.p1Rocket = new Rocket(this, global.game.config.width / 2, global.game.config.height - global.borderUISize - global.borderPadding, 'rocket').setOrigin(0.5, 0)
      this.p2Rocket = null
    }

    // add Spaceships (x3)
    let fast = Math.floor(Math.random() * 4)
    this.ships = []
    for (let i = 0; i < 4; i++) {
      let isFast = i === fast
      let ship = new Spaceship(this, global.game.config.width + global.borderUISize * (6 - 3 * i), global.borderUISize * 4 + (global.borderUISize + global.borderPadding * 2) * i, isFast ? 'fastship' : 'spaceship', 0, isFast ? 50 : 20).setOrigin(0, 0)
      if (isFast) ship.moveSpeedScale *= 3
      this.ships.push(ship)
    }

    // define keys
    global.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    global.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    global.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    global.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    // animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 9,
        first: 0,
      }),
      frameRate: 30,
    })

    // initialize score
    this.p1Score = 0
    this.p2Score = 0

    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 70,
    }
    this.scoreText = this.add.text(global.borderUISize + global.borderPadding, global.borderUISize + global.borderPadding * 2, this.p1Score, scoreConfig)
    if (global.game.settings.twoPlayer)
      this.scoreTextP2 = this.add.text(global.borderUISize + global.borderPadding + 82, global.borderUISize + global.borderPadding * 2, this.p2Score, scoreConfig)
    this.fireText = this.add.text(global.game.config.width / 2 - global.borderUISize, -500, 'FIRE', scoreConfig)
    this.timeLeft = this.add.text(global.game.config.width - global.borderUISize + global.borderPadding - 92, global.borderUISize + global.borderPadding * 2, '', scoreConfig)

    this.emitter = this.add.particles(0, 0, 'explosion', {
      frame: ['8', '9'],
      lifespan: 4000,
      speed: { min: 100, max: 200 },
      scale: { start: 0.8, end: 0.4 },
      gravityY: 150,
      blendMode: 'ADD',
      emitting: false,
    })
    // GAME OVER flag
    this.gameOver = false

    // 60-second play clock
    this.endTime = Date.now() + global.game.settings.gameTimer
  }

  update() {
    if (Date.now() > this.endTime) {
      let scoreConfig = {
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
      if (!this.gameOver) {
        this.add.text(global.game.config.width / 2, global.game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        this.add.text(global.game.config.width / 2, global.game.config.height / 2 + 64, 'Press R to Restart or \u2190 to Menu', scoreConfig).setOrigin(0.5)
      }
      this.gameOver = true
    }
    if (this.endTime - Date.now() <= 30e3) {
      for (let ship of this.ships)
        if (ship.moveSpeedScale % 2 === 1)
          ship.moveSpeedScale *= 2
    }

    if (this.gameOver) {
      this.timeLeft.text = '0'
    } else {
      this.timeLeft.text = Math.floor((this.endTime - Date.now()) / 1000)
    }

    if (this.gameOver && Phaser.Input.Keyboard.JustDown(global.keyR)) {
      this.scene.restart()
    }

    if (this.gameOver && Phaser.Input.Keyboard.JustDown(global.keyLEFT)) {
      this.scene.start('menuScene')
    }

    this.starfield.tilePositionX -= 4

    if (!this.gameOver) {
      this.p1Rocket.update()
      this.p2Rocket?.update()
      for (let ship of this.ships)
        ship.update()
    }

    this.fireText.y = this.p1Rocket.isFiring || this.p2Rocket?.isFiring ? global.borderUISize + global.borderPadding * 2 : -500

    // check collisions
    for (let ship of this.ships) {
      if (Play.checkCollision(this.p1Rocket, ship)) {
        this.shipExplode(ship)
        this.p1Rocket.reset()
      }
      if (this.p2Rocket && Play.checkCollision(this.p2Rocket, ship)) {
        this.shipExplode(ship)
        this.p2Rocket.reset()
      }
    }
  }

  static checkCollision(rocket, ship) {
    // simple AABB checking
    return (
      rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y
    )
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
    boom.anims.play('explode')
    boom.on('animationcomplete', () => {
      ship.reset()
      ship.alpha = 1
      boom.destroy()
    })
    // score add and repaint
    if (this.p1Rocket.active) {
      this.p1Score += ship.points
      this.scoreText.text = this.p1Score
    } else {
      this.p2Score += ship.points
      this.scoreText.text = this.p2Score
    }
    this.endTime += 3000

    this.emitter.x = ship.x
    this.emitter.y = ship.y
    this.emitter.explode(32)

    this.sound.play('sfx-explosion')
  }
}

export default Play
