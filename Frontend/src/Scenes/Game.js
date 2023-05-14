import {IMAGES} from 'Config'
import {Game_Background} from 'UI'

export class Game extends Phaser.Scene {
    hud
    score
    startTime

    constructor() {
        super({key: 'Game'})
    }

    preload() {
        this.load.spritesheet('player', IMAGES.PLAYER_CHARACTER.path, { frameWidth: 68, frameHeight: 80 })
        this.load.spritesheet('collect', IMAGES.COIN.path, { frameWidth: 32, frameHeight: 32 })
    }

    create() {
        new Game_Background(this)
        this.startTime = this.time.now
        this.sound.setVolume(1)
        this.scene.run('HUD')
        this.hud = this.scene.get('HUD')

        this.createObjects()
        this.initInput()
        this.handleCollisions()
        const player = this.add.sprite(500, 800, 'player')
        const collectible = this.add.sprite(100, 450, 'collect')
        // Animation set
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('collect', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        player.setScale(3)
        player.anims.play('run')
        collectible.setScale(4)
        collectible.anims.play('spin')

    }

    update() {

    }

    createObjects() {

    }


    initInput() {
        this.input.mouse.disableContextMenu()

        const restartButton = this.input.keyboard.addKey('R')
        restartButton.once('down', this.preRestart, this)
    }

    handleCollisions() {

    }

    gameOver() {

    }

    preRestart() {

        this.scene.restart()
    }
}
