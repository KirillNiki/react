

var style = getComputedStyle(document.body)
const cellColors = {
  smallW: style.getPropertyValue('--smallW-color'),
  avarageW: style.getPropertyValue('--avarageW-color'),
  bigW: style.getPropertyValue('--bigW-color'),

  block1: style.getPropertyValue('--color-block1'),
  block2: style.getPropertyValue('--color-block2'),
  block3: style.getPropertyValue('--color-block2'),

  text1: style.getPropertyValue('--color-text1'),
  text2: style.getPropertyValue('--color-text2'),
  text3: style.getPropertyValue('--color-text3'),
}


function get_colors() {
  return cellColors
}
export { get_colors }
