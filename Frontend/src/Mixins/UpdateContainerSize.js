/**
 * Set container size by children elements sizes and positions
 * Based on William Clarkson tutorial https://phasergames.com/phaser-3-container-size-get-height-and-width/
 */
export function updateContainerSize() {
    let top = 0
    let bottom = 0
    let left = 0
    let right = 0

    this.iterate((child) => {
        const childX = child.x
        const childY = child.y
        const childWidth = child.displayWidth
        const childHeight = child.displayHeight

        const childTop = childY - (childHeight * child.originY)
        const childBottom = childY + (childHeight * (1 - child.originY))
        const childLeft = childX - (childWidth * child.originX)
        const childRight = childX + (childWidth * (1 - child.originY))

        if (childBottom > bottom) {
            bottom = childBottom
        }
        if (childTop < top) {
            top = childTop
        }
        if (childLeft < left) {
            left = childLeft
        }
        if (childRight > right) {
            right = childRight
        }
    })

    const height = Math.abs(top - bottom)
    const width = Math.abs(right - left)

    this.setSize(width, height)
}
