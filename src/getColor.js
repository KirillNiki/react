

var style = getComputedStyle(document.body)
const cellColors = {
  smallW: style.getPropertyValue('--smallW-color'),
  avarageW: style.getPropertyValue('--avarageW-color'),
  bigW: style.getPropertyValue('--bigW-color')
}


function get_colors() {
  return cellColors
}
export { get_colors }
