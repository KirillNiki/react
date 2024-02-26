import {
	Bar,
	ComposedChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	Line,
	ResponsiveContainer
} from "recharts";
import Paragraf from "./Paragraf";

var style = getComputedStyle(document.body)
const cellColors = {
	smallW: style.getPropertyValue('--smallW-color'),
	avarageW: style.getPropertyValue('--avarageW-color'),
	bigW: style.getPropertyValue('--bigW-color')
}

const max_offset = 10


function CustomTooltip({ active, payload, label }) {
	let value = payload.length > 0 ? payload[0].value : ''

	return (
		<div style={{
			border: '0.25vw solid',
			borderColor: 'black',
			width: '24vw',
			background: '#ffffff'
		}}>
			<Paragraf
				font_size={'3vw'}
				text={`date: ${label}`}
				marginLeft={5}
			/>
			<Paragraf
				font_size={'3vw'}
				text={`${value} kg`}
				marginLeft={10}
			/>
		</div>
	)
}



function Chart(props) {
	let info_data = props.data.infoData

	return (
		<ResponsiveContainer width="100%" aspect={1 / 0.75}>
			<ComposedChart data={info_data} margin={{ left: -20, right: 10, top: 20 }} barCategoryGap={'30%'}>
				<defs>
					<linearGradient id="gradient" x1='0' y1='0' x2='0' y2='1'>
						<stop offset="5%" stopColor={cellColors.avarageW} stopOpacity={1} />
						<stop offset="95%" stopColor="#ffffff" stopOpacity={0.3} />
					</linearGradient>
				</defs>

				<XAxis angle={-70} dataKey="time" tickLine={false} axisLine={false} fontSize='3vw' />
				<YAxis tickLine={false} axisLine={false} fontSize='2vh'
					domain={[0, `dataMax + ${max_offset}`]}
				/>

				<CartesianGrid vertical={false} strokeDasharray="4" />
				<Tooltip content={<CustomTooltip />} />
				<Bar
					dataKey="value"
					fill="url(#gradient)"
				>
				</Bar>
				<Line type="monotone" dataKey="value" stroke={`${cellColors.bigW}`} strokeWidth='0.25vw' />
			</ComposedChart>
		</ResponsiveContainer>
	);
}
export default Chart
