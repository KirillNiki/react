import { React } from "react";
import { get_colors } from "./getColor";


const colors = get_colors()


function Paragraf(props) {
	let font_color = props.red ? colors.smallW : 'black'
	let font_weight = props.red ? 'bold' : 'normal'

	if (props.text_color !== undefined) {
		font_color = props.text_color
	}
	if (props.font_weight !== undefined) {
		font_weight = props.font_weight
	}

	return (
		<div style={{
			aspectRatio: `${props.aspect_ratio}`,
			display: 'flex',
			alignItems: 'center',
		}} >

			<p style={{
				whiteSpace: 'pre-line',
				marginLeft: `${props.marginLeft}%`,
				fontSize: '4vw',
				fontWeight: `${font_weight}`,
				color: `${font_color}`,
			}}>
				{props.text}
			</p>
		</div >
	)
}
export default Paragraf
