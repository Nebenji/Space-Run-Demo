import Koji from "@withkoji/vcc"
import {COLORS} from './colors'
import {SCALE} from "./dimensions"

export const FONT_FAMILY = Koji.config.settings.fontFamily

export const TEXT_STYLE = {
    DEFAULT: {
        fontFamily: 'sans-serif',
        size: 24 * SCALE,
        color: COLORS.TEXT.hex
    },
    REGULAR: {
        fontFamily: FONT_FAMILY,
        size: 24 * SCALE,
        color: COLORS.TEXT.hex
    },
    TITLE: {
        fontFamily: FONT_FAMILY,
        size: 72 * SCALE,
        color: COLORS.TEXT.hex
    },
    BUTTON: {
        fontFamily: FONT_FAMILY,
        size: 36 * SCALE,
        color: COLORS.TEXT.hex
    }
}

export const TEXT = {
    TITLE: Koji.config.settings.title,
    DESCRIPTION_1: Koji.config.settings.description.line1,
    DESCRIPTION_2: Koji.config.settings.description.line2,
}
