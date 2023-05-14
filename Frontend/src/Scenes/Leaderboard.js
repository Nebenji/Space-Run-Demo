import {CENTER, COLORS, ENDPOINTS, GAME_HEIGHT, GAME_WIDTH, SCALE, TEXT_STYLE} from 'Config'
import {Button, Text} from 'UI'

export class Leaderboard extends Phaser.Scene {
  constructor() {
    super({
      key: 'Leaderboard',
    })
  }

  preload() { }

  create() {
    fetch(ENDPOINTS.LEADERBOARD)
        .then((response) => response.json())
        .then(({scores}) => {
          this.gridTable.setItems(scores)
        })
        .catch((err) => {
          console.log('Fetch Error: ', err)
        })

    let scrollMode = 0 // 0:vertical, 1:horizontal
    this.gridTable = this.rexUI.add.gridTable({
      x: CENTER.X,
      y: CENTER.Y,
      width: GAME_WIDTH * (GAME_WIDTH>GAME_HEIGHT ? 0.7 : 0.9),
      height: GAME_HEIGHT * (GAME_WIDTH>GAME_HEIGHT ? 0.8 : 0.8),

      scrollMode: scrollMode,

      background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLORS.BACKGROUND.color),

      table: {
        cellWidth: (scrollMode === 0) ? undefined : 40 * SCALE,
        cellHeight: (scrollMode === 0) ? 40 * SCALE : undefined,

        columns: 1,

        mask: {
          padding: 10,
        },

        reuseCellContainer: true,
      },

      slider: {
        track: this.rexUI.add.roundRectangle(0, 0, 20 * SCALE, 10, 10, COLORS.BUTTON.color),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13 * SCALE, COLORS.BACKGROUND.color),
      },

      header: this.rexUI.add.label({
        width: (scrollMode === 0) ? undefined : 30,
        height: (scrollMode === 0) ? 30 : undefined,

        orientation: scrollMode,
        background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLORS.BACKGROUND.color),
        text: new Text(this, 0, 0, 'Leaderboard', TEXT_STYLE.BUTTON)
      }),

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,

        table: 10,
        header: 10,
        footer: 10,
      },

      createCellContainerCallback: function(cell, cellContainer) {
        let scene = cell.scene
        let width = cell.width
        let height = cell.height
        let item = cell.item
        let index = cell.index
        if (cellContainer === null) {
          cellContainer = scene.rexUI.add.label({
            width: width,
            height: height,

            orientation: scrollMode,
            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLORS.BACKGROUND.color),
            text: new Text(this, 0, 0, '', TEXT_STYLE.REGULAR),

            space: {
              left: (scrollMode === 0) ? 15 : 0,
              top: (scrollMode === 0) ? 0 : 15,
            },
          })
        }

        // Set properties from item value
        cellContainer.setMinSize(width, height) // Size might changed in this demo
        cellContainer.getElement('text').setText(`${index+1}. ${item.score ? item.score : 0} - ${item.name}`) // Set text of text object
        return cellContainer
      },
    })
        .layout()

    this.createBottomButton()
  }

  back() {
    this.scene.stop()
  }

  createBottomButton() {
    const gameScene = this.scene.get('Game')
    const isPlay = gameScene.scene.isActive()
    const buttonX = GAME_WIDTH / 2
    const buttonY = GAME_HEIGHT - (GAME_HEIGHT - this.gridTable.height) / 2
    const buttonLabel = isPlay ? 'RESTART' : 'BACK'
    const callback = isPlay ? this.restartPlayScene.bind(this) : this.back.bind(this)
    new Button(this, buttonX, buttonY, buttonLabel, callback)
  }

  restartPlayScene() {
    const gameScene = this.scene.get('Game')
    gameScene.preRestart()
    this.scene.stop()
  }
}
