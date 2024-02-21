import { React } from "react";
import { get_colors } from "./getColor";

const colors = get_colors()


function Paragraf(props) {
	let font_color = props.red ? colors.smallW : 'black'
	let font_weight = props.red ? 'bold' : 'normal'

	return (
		<div style={{
			aspectRatio: `${props.aspect_ratio}`,
			display: 'flex',
			alignItems: 'center',
		}} >
			<p style={{
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
