import {Text} from "UI"
import {CENTER, TEXT_STYLE} from 'Config'

export class Loader extends Phaser.GameObjects.Container {
    dotsCount = 3
    loadText
    loadIndicator

    constructor(scene) {
        super(scene, CENTER.X, CENTER.Y)

        this.loadText = new Text(scene, 0, 0, 'Loading', TEXT_STYLE.DEFAULT, true)
        this.add(this.loadText)

        const indicatorX = this.loadText.width / 2
        const indicatorY = this.loadText.y
        this.loadIndicator = new Text(scene, indicatorX, indicatorY, '...')
        this.add(this.loadIndicator)

        scene.add.existing(this)

        this.run()
    }

    run() {
        this.scene.time.addEvent({
            delay: 750,
            callback: this.updateIndicator,
            callbackScope: this,
            loop: true
        })
    }

    updateIndicator() {
        let text = ''
        this.dotsCount = (this.dotsCount % 3) + 1

        for (let i = 0; i < this.dotsCount; i++) {
            text += '.'
        }

        this.loadIndicator.setText(text)
    }
}
