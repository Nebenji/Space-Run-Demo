import {CENTER, IMAGES} from 'Config'

export class Background extends Phaser.GameObjects.Image {
    constructor(scene) {
        const camera = scene.cameras.main

        super(scene, CENTER.X, camera.height, IMAGES.BACKGROUND.key)
        this.setOrigin(0.5, 1)
        this.setDepth(-1)

        const size = new Phaser.Structs.Size(this.width, this.height, Phaser.Structs.Size.ENVELOP)
        size.envelop(camera.width, camera.height)
        this.setDisplaySize(size.width, size.height)

        scene.add.existing(this)
    }
}
