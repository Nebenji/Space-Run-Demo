import {CENTER, GAME_HEIGHT, SCALE, TEXT, TEXT_STYLE, SOUNDS} from 'Config'
import {Background, Text, Button, SoundButton} from 'UI'
import {justifyElements} from "Utils/justifyElements"

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }

    create() {
        new Background(this)
        this.createElements()
        // this.initSound()
    }

    createElements() {
        const title = new Text(this, CENTER.X, 0, TEXT.TITLE, TEXT_STYLE.TITLE, true)
        const description1 = new Text(this, CENTER.X, 0, TEXT.DESCRIPTION_1, TEXT_STYLE.REGULAR, true)
        const description2 = new Text(this, CENTER.X, 300, TEXT.DESCRIPTION_2, TEXT_STYLE.REGULAR, true)
        const buttonStart = new Button(this, CENTER.X, 0, 'START', this.gameStart.bind(this))
        const buttonLeaderboard = new Button(this, CENTER.X, 0, 'LEADERBOARD', this.showLeaderboard.bind(this))

        justifyElements([title, description1, description2, buttonStart, buttonLeaderboard], this.cameras.main)
        new SoundButton(this)
    }

    gameStart() {
        this.scene.start('Game')
    }

    showLeaderboard() {
        this.scene.launch('Leaderboard')
        // this.scene.launch('SubmitScore', {score: 10})
    }

    initSound() {
        this.sound.play(SOUNDS.MUSIC.key, {loop: true})
    }
}
