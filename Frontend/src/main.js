import 'phaser'
import UIPlugin from './plugins/rex/rexuiplugins.min.js'

import {Preload, Menu, Game, Leaderboard, SubmitScore, HUD} from 'Scenes'
import {GAME_WIDTH, GAME_HEIGHT, COLORS} from "Config"

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    backgroundColor: COLORS.GAME.hex,
    dom: {
        createContainer: true,
    },
    scale: {
        mode: Phaser.Scale.NONE,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        zoom: 1 / window.devicePixelRatio
    },
    physics: {
        // default: 'arcade',
        // arcade: {
        //     // gravity: {y: 300},
        //     // debug: true
        // },
    },
    render: {
        antialias: false,
    },
    scene: [Preload, Menu, Game, Leaderboard, SubmitScore, HUD],
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI',
        }],
    }
}

new Phaser.Game(config)
