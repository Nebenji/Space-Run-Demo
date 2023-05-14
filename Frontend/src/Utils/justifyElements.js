/**
 * Justify elements vertically, analog of css flexbox justify-content: space-around
 *
 * @param elements
 * @param parent
 */
export function justifyElements(elements, parent) {
    const parentHeight = parent.displayHeight ? parent.displayHeight : parent.height
    const elementsHeight = elements.reduce((accumulator, element) => {
        return accumulator + element.height
    }, 0)

    const freeSpace = parentHeight - elementsHeight
    const paddingHeight = freeSpace / (elements.length + 2)
    let y = 0

    elements.forEach((element) => {
        const elementHeight = element.displayHeight ? element.displayHeight : element.height
        y += paddingHeight + elementHeight * element.originY
        element.setY(y)
        y += elementHeight * (1 - element.originY)
    })
}
