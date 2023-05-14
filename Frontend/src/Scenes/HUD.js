import {SoundButton} from 'UI'

export class HUD extends Phaser.Scene {
    gameScene

    constructor() {
        super('HUD')
    }

    preload() {

    }

    create() {
        this.gameScene = this.scene.get('Game')
        new SoundButton(this)

        const spaceButton = this.input.keyboard.addKey('SPACE')
        spaceButton.off('down', this.pauseGame, this)
        spaceButton.on('down', this.pauseGame, this)
    }

    pauseGame() {
        if (this.gameScene.scene.isActive())
            this.gameScene.scene.pause()
        else
            this.gameScene.scene.resume()
    }

    updateScore() {

    }
}
