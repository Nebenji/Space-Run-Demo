import Koji from '@withkoji/vcc'

const colorsConfig = Koji.config.colors

let colors = {
    GAME: colorsConfig.game,
    TEXT: colorsConfig.text,
    BUTTON: colorsConfig.button,
    BACKGROUND: colorsConfig.background,
}

Object.keys(colors).forEach((key) => {
    const hex = colors[key]
    colors[key] = Phaser.Display.Color.HexStringToColor(hex)
    colors[key].hex = hex
})

export const COLORS = colors
