import React from "react";

var style = getComputedStyle(document.body)
const cellColors = {
    smallW: style.getPropertyValue('--smallW-color'),
    avarageW: style.getPropertyValue('--avarageW-color'),
    bigW: style.getPropertyValue('--bigW-color')
}

function Head(props) {
    const aspect_ratio = props.aspect_ratio
    const color1 = cellColors.bigW;
    const color2 = cellColors.avarageW;
    const deg = 90;

    const cssGradient = `linear-gradient(${deg}deg, ${color1}, ${color2})`


    const head_style = {
        aspectRatio: `${aspect_ratio}`,
        background: cssGradient,
        borderRadius: '8%/30%',
    }
    return (
        <div style={head_style} />
    )
}
export default Head
