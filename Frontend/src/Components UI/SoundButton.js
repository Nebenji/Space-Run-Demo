import {IMAGES, SCALE} from 'Config'
import {Align} from "Utils/align"

export class SoundButton extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, '')

        Align.topRight(this)
        this.updateTexture()
        
        this
          .setScale(SCALE / 2)
          .setInteractive()
          .on('pointerdown', this.onClick)

        scene.add.existing(this)
    }

    onClick() {
        this.scene.sound.setMute(!this.scene.sound.mute)
        this.updateTexture()
    }

    updateTexture() {
        const texture = this.scene.sound.mute ? IMAGES.SOUND_OFF.key : IMAGES.SOUND_ON.key
        this.setTexture(texture)
    }
}
