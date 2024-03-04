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
import { get_colors } from "./getColor";


const max_offset = 10
let cellColors = get_colors()

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
				text={`day: ${label}`}
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

				<XAxis dataKey="day" tickLine={false} axisLine={false} fontSize='1.5vh' />
				<YAxis tickLine={false} axisLine={false} fontSize='1.5vh'
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
