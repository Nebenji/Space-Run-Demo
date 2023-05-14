export const GAME_WIDTH = window.innerWidth * window.devicePixelRatio
export const GAME_HEIGHT = window.innerHeight * window.devicePixelRatio
const GAME_MIN_WIDTH = 375
const GAME_MIN_HEIGHT = 667

const SCALE_WIDTH = GAME_WIDTH / GAME_MIN_WIDTH
const SCALE_HEIGHT = GAME_HEIGHT / GAME_MIN_HEIGHT
export const SCALE = (SCALE_WIDTH >= SCALE_HEIGHT) ? SCALE_HEIGHT : SCALE_WIDTH
// const SCALE = (GAME_MIN_WIDTH > GAME_WIDTH || SCALE_WIDTH < SCALE_HEIGHT) ? SCALE_WIDTH : SCALE_HEIGHT

export const PADDING = 20 * SCALE

export const CENTER = {
    X: GAME_WIDTH / 2,
    Y: GAME_HEIGHT / 2
}

// export default {
//   GAME: {
//     WIDTH: GAME_WIDTH,
//     HEIGHT: GAME_HEIGHT,
//     SCALE: SCALE
//   },
//   CENTER: {
//     X: GAME_WIDTH / 2,
//     Y: GAME_HEIGHT / 2
//   },
//   TEXT: {
//     REGULAR: 24 * SCALE,
//     TITLE: 48 * SCALE
//   }
// }

// export default {
//     WIDTH: GAME_WIDTH,
//     HEIGHT: GAME_HEIGHT,
//     SCALE: SCALE,
//     CENTER: {
//         X: GAME_WIDTH / 2,
//         Y: GAME_HEIGHT / 2
//     }
// }
