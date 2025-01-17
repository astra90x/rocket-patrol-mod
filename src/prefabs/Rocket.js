import Phaser from 'phaser'

import global from '../global.js'

const Rocket = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this) // add to existing, displayList, updateList
    this.isFiring = false // track rocket's firing status
    this.moveSpeed = 2 // pixels per frame
    this.sfxRocket = scene.sound.add('sfx-rocket') // add rocket sfx
    this.scene = scene
  }

  update() {
    // left/right movement
    if (!this.isFiring) {
      if (global.keyLEFT.isDown && this.x >= global.borderUISize + this.width) {
        this.x -= this.moveSpeed
      } else if (global.keyRIGHT.isDown && this.x <= global.game.config.width - global.borderUISize - this.width) {
        this.x += this.moveSpeed
      }
    }
    // fire button
    if (Phaser.Input.Keyboard.JustDown(global.keyF) && !this.isFiring) {
      this.isFiring = true
      this.sfxRocket.play()
    }
    // if fired, move up
    if (this.isFiring && this.y >= global.borderUISize * 3 + global.borderPadding) {
      this.y -= this.moveSpeed
    }
    // reset on miss
    if (this.y <= global.borderUISize * 3 + global.borderPadding) {
      this.scene.endTime -= 3000
      this.reset()
    }
  }

  reset() {
    this.isFiring = false
    this.y = global.game.config.height - global.borderUISize - global.borderPadding
  }
}

export default Rocket
