import {IMAGES, SOUNDS, FONT_FAMILY} from 'Config'
import {Loader} from "UI"

const ARTIFICAL_DELAY = 0 // Set > 0 to check loader indicator

export class Preload extends Phaser.Scene {
    readyCount = 0

    constructor() {
        super('Preload')
    }

    preload() {
        this.startLoader()
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

        Object.keys(IMAGES).forEach((arrayKey) => {
            this.load.image(IMAGES[arrayKey].key, IMAGES[arrayKey].path)
        })

        Object.keys(SOUNDS).forEach((arrayKey) => {
            this.load.audio(SOUNDS[arrayKey].key, SOUNDS[arrayKey].path)
        })

        this.load.once('complete', this.ready, this)
        this.addDelay()
    }

    create() {
        WebFont.load({
            google: {
                families: [FONT_FAMILY]
            },
            active: () => {
                this.ready()
            }
        })
    }

    ready() {
        this.readyCount++

        if (this.readyCount >= 3) {
            this.scene.start('Menu')
        }
    }

    addDelay() {
        this.time.delayedCall(ARTIFICAL_DELAY, this.ready, [], this)
    }

    startLoader() {
        new Loader(this)
    }
}


