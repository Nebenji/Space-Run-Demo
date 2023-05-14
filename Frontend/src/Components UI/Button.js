import {Text} from 'UI'
import {updateContainerSize} from 'Mixins'
import {TEXT_STYLE, COLORS, SCALE} from 'Config'

let textureId = 0

export class Button extends Phaser.GameObjects.Container {
    updateContainerSize = updateContainerSize
    text
    callback
    label
    background

    constructor(scene, x = 0, y = 0, text = '', callback = () => {}) {
        super(scene, x, y)
        this.text = text
        this.callback = callback

        this.createLabel()
        this.createBackground()

        this.add(this.background)
        this.add(this.label)

        this.updateContainerSize()
        // this.setPosition(x, y)
        scene.add.existing(this)

        this.handleInteraction()
    }

    createLabel() {
        this.label = new Text(this.scene, 0, 0, this.text, TEXT_STYLE.BUTTON, true)
    }

    createBackground() {
        if (!this.label)
            return

        const buttonWidth = this.label.displayWidth * 1.5
        const buttonHeight = this.label.displayHeight * 1.5
        const texture = 'button' + textureId++

        new Phaser.GameObjects.Graphics(this.scene)
            .fillStyle(COLORS.BUTTON.color)
            .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 20)
            .generateTexture(texture, buttonWidth, buttonHeight)
            .destroy(true)

        this.background = new Phaser.GameObjects.Image(this.scene, 0, 0, texture)
            .setDepth(1)
    }

    handleInteraction() {
        this.setInteractive()

        if (!this.scene.sys.game.device.input.touch) {
            this.on('pointerover', this.onHover)
            this.on('pointerout', this.onHoverEnd)
        }

        this.on('pointerdown', this.onClick)
    }

    onHover() {
        this.scene.tweens.killTweensOf(this)
        const tweenConfig = {
            targets: this,
            alpha: 0.9,
            scaleX: 1.04,
            scaleY: 1.04,
            ease: 'Linear',
            duration: 100,
        }
        this.scene.tweens.add(tweenConfig)
    }

    onHoverEnd() {
        this.scene.tweens.killTweensOf(this)
        const tweenConfig = {
            targets: this,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 100,
        }
        this.scene.tweens.add(tweenConfig)
    }

    onClick() {
        this.callback()

        this.scene.tweens.killTweensOf(this)
        const tweenConfig = {
            targets: this,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 100,
            yoyo: true
        }
        this.scene.tweens.add(tweenConfig)
    }
}
