import {GAME_WIDTH, GAME_HEIGHT, PADDING} from 'Config'

export class Align {
    static topLeft(object) {
        const x = PADDING
        const y = PADDING
        object.setPosition(x, y)
        object.setOrigin(0, 0)
    }

    static topRight(object) {
        const x = GAME_WIDTH - PADDING
        const y = PADDING
        object.setPosition(x, y)
        object.setOrigin(1, 0)
    }

    static bottomLeft(object) {
        const x = PADDING
        const y = GAME_HEIGHT - PADDING
        object.setPosition(x, y)
        object.setOrigin(0, 1)
    }

    static bottomRight(object) {
        const x = GAME_WIDTH - PADDING
        const y = GAME_HEIGHT - PADDING
        object.setPosition(x, y)
        object.setOrigin(1, 1)
    }

    static center(object) {
        const x = GAME_WIDTH / 2
        const y = GAME_HEIGHT / 2
        object.setPosition(x, y)
        object.setOrigin(0.5, 0.5)
    }
}
