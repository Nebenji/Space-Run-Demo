import Koji from '@withkoji/vcc'
const config = Koji.config

export const IMAGES = {
    BACKGROUND: {
        key: 'background',
        path: config.images.background
    },
    GAME_BACKGROUND: {
        key: 'gameBackground',
        path: config.images.gameBackground
    },
    PLAYER_CHARACTER: {
        key: 'playerCharacter',
        path: config.images.playerCharacter
    },
    COIN: {
        key: 'coin',
        path: config.images.coin
    },
    SOUND_ON: {
        key: 'soundOn',
        path: config.images.soundOn
    },
    SOUND_OFF: {
        key: 'soundOff',
        path: config.images.soundOff
    }
}

export const SOUNDS = {
    MUSIC: {
        key: 'music',
        path: config.sounds.music
    }
}
