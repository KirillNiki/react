import React from "react";
import { get_colors } from '../getColor'

const cellColors = get_colors()

function Head(props) {
	const aspect_ratio = props.aspect_ratio
	const color1 = cellColors.bigW;
	const color2 = cellColors.avarageW;
	const deg = 90;

	const cssGradient = `linear-gradient(${deg}deg, ${color1}, ${color2})`

	return (
		<div style={{
			margin: '0.5%',
			aspectRatio: `${aspect_ratio}`,
			background: cssGradient,
			borderRadius: '8%/30%',

			display: 'flex',
			alignItems: 'center',
		}}>
			<p style={{
				marginLeft: `${props.marginLeft}%`,
				color: 'white',
				fontSize: '4vw',
				fontWeight: 'bold'
			}}>
				{props.text}
			</p>
		</div >
	)
}
export default Head
