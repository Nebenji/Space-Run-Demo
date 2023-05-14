import {CENTER, COLORS, ENDPOINTS, FONT_FAMILY, GAME_HEIGHT, GAME_WIDTH, SCALE, TEXT_STYLE} from 'Config'
import {Button, Text} from 'UI'

export class SubmitScore extends Phaser.Scene {
    constructor() {
        super({
            key: 'SubmitScore',
        })
    }

    init(data) {
        this.score = data.score
    }

    create() {
        let isFetching = false

        let submitDialog = CreateSubmitDialog(this, {
            x: CENTER.X,
            y: CENTER.Y,
            usernameLabel: 'Enter your name',
            emailLabel: 'Enter your email',
            width: GAME_WIDTH * 0.8,
            height: GAME_HEIGHT * 0.8,
            score: this.score
        })
            .on('submit', (data) => {
                console.log(data)
                if (isFetching) {
                    return
                }

                const body = {
                    name: data.username,
                    score: this.score,
                    privateAttributes: {
                        email: data.email,
                        // optIn: this.state.optIn,
                    },
                }

                isFetching = true

                fetch(ENDPOINTS.SUBMIT, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then((response) => response.json())
                    .then((jsonResponse) => {
                        this.scene.stop('SubmitScore')
                        this.scene.launch('Leaderboard')
                    })
                    .catch((err) => {
                        isFetching = false
                    })
            })
            .popUp(1000)

        this.createBottomButton()
    }

    createBottomButton() {
        const gameScene = this.scene.get('Game')
        const isPlay = gameScene.scene.isActive()
        const buttonX = GAME_WIDTH / 2
        const buttonY = GAME_HEIGHT - (GAME_HEIGHT * 0.2) / 2
        const buttonLabel = isPlay ? 'RESTART' : 'BACK'
        const callback = isPlay ? this.restartPlayScene.bind(this) : this.back.bind(this)
        new Button(this, buttonX, buttonY, buttonLabel, callback)
    }

    restartPlayScene() {
        const gameScene = this.scene.get('Game')
        gameScene.preRestart()
        this.scene.stop()
    }

    back() {
        this.scene.stop()
    }
}

const GetValue = Phaser.Utils.Objects.GetValue
let CreateSubmitDialog = function (scene, config) {
    let title = GetValue(config, 'usernameLabel', 'Enter your name')
    let username = ''
    let emailLabelText = GetValue(config, 'emailLabel', 'Enter your email')
    let email = ''
    let x = GetValue(config, 'x', 0)
    let y = GetValue(config, 'y', 0)
    let width = GetValue(config, 'width', undefined)
    let height = GetValue(config, 'height', undefined)

    // Background object
    let background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLORS.BACKGROUND.color)

    // Title field object
    let titleField = new Text(scene, 0, 0, title, TEXT_STYLE.REGULAR)

    // User name field object
    let userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 10, 10).setStrokeStyle(2, COLORS.BUTTON.color),
        text: scene.rexUI.add.BBCodeText(0, 0, ' ', {
            valign: 'center',
            fontSize: 32,
            fontFamily: FONT_FAMILY
        }),
        space: {top: 5, bottom: 5, left: 5, right: 5, icon: 10},
        expandTextWidth: true,
    })
        .setInteractive()
        .on('pointerdown', function () {
            let config = {
                onTextChanged: function (textObject, text) {
                    username = text.trim()
                    textObject.text = text.trim()
                },
            }
            scene.rexUI.edit(userNameField.getElement('text'), config)
        })

    // Email label
    let emailLabel = new Text(scene, 0, 0, emailLabelText, TEXT_STYLE.REGULAR)

    // Email field
    let emailField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 10, 10).setStrokeStyle(2, COLORS.BUTTON.color),
        text: scene.rexUI.add.BBCodeText(0, 0, ' ', {
            valign: 'center',
            fontSize: 32,
            fontFamily: FONT_FAMILY
        }),
        space: {top: 5, bottom: 5, left: 5, right: 5, icon: 10},
        expandTextWidth: true,
    })
        .setInteractive()
        .on('pointerdown', function () {
            let config = {
                onTextChanged: function (textObject, text) {
                    email = text.trim()
                    textObject.text = text.trim()
                },
            }
            scene.rexUI.edit(emailField.getElement('text'), config)
        })

    // Score Label
    let scoreLabel = new Text(scene, 0, 0, 'Score: ' + config.score, TEXT_STYLE.REGULAR)

    // Submit button object
    let submitButton = new Button(scene, 0, 0, 'Submit', () => {submitDialog.emit('submit', {username: username, email: email})})

    // Dialog and its children
    let submitDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(titleField, 0, 'center', {top: 20 * SCALE, bottom: 20 * SCALE, left: 10, right: 10}, false)
        .add(userNameField, 0, 'left', {top: 20 * SCALE, bottom: 20 * SCALE, left: 10, right: 10}, true)
        .add(emailLabel, 0, 'center', {top: 20 * SCALE, bottom: 20 * SCALE, left: 10, right: 10}, false)
        .add(emailField, 0, 'left', {top: 20 * SCALE, bottom: 20 * SCALE, left: 10, right: 10}, true)
        .add(scoreLabel, 0, 'bottom', {top: 20 * SCALE, bottom: 10, left: 10, right: 10}, false)
        .add(submitButton, 0, 'bottom', {top: 20 * SCALE, bottom: 10, left: 10, right: 10}, false)
        .layout()

    return submitDialog
}
