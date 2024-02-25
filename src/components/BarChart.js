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

var style = getComputedStyle(document.body)
const cellColors = {
	smallW: style.getPropertyValue('--smallW-color'),
	avarageW: style.getPropertyValue('--avarageW-color'),
	bigW: style.getPropertyValue('--bigW-color')
}


const max_offset = 10

function Chart(props) {
	let info_data = props.data.infoData

	return (
		<ResponsiveContainer width="100%" aspect={1 / 0.75}>
			<ComposedChart data={info_data} margin={{ left: -20, right: 10, top: 20 }} barCategoryGap={'35%'}>
				<defs>
					<linearGradient id="gradient" x1='0' y1='0' x2='0' y2='1'>
						<stop offset="5%" stopColor={cellColors.avarageW} stopOpacity={1} />
						<stop offset="95%" stopColor="#ffffff" stopOpacity={0.3} />
					</linearGradient>
				</defs>

				<XAxis angle={-70} dataKey="time" tickLine={false} axisLine={false} fontSize={'120%'} />
				<YAxis tickLine={false} axisLine={false}
					domain={[`dataMin`, `dataMax + ${max_offset}`]}
				/>

				<CartesianGrid vertical={false} strokeDasharray="4" />
				<Tooltip />
				<Bar
					dataKey="value"
					fill="url(#gradient)"
				>
				</Bar>
				<Line type="monotone" dataKey="value" stroke={`${cellColors.bigW}`} />
			</ComposedChart>
		</ResponsiveContainer>
	);
}
export default Chart
