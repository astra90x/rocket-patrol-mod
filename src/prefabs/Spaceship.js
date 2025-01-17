import Phaser from 'phaser'

import global from '../global.js'

const Spaceship = class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this) // add to existing scene
    this.points = pointValue
    this.moveSpeed = global.game.settings.spaceshipSpeed // pixels per frame
  }

  update() {
    // move spaceship left
    this.x -= this.moveSpeed
    // wrap around from left edge to right edge
    if (this.x <= 0 - this.width) {
      this.reset()
    }
  }

  reset() {
    this.x = global.game.config.width
  }
}

export default Spaceship
