import { Grid } from "@mui/material";
import {
	Bar,
	ComposedChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	Line,
	Legend,
	ResponsiveContainer
} from "recharts";

const data = [
	{ hour: '', day: "", value: 0 },
	{ hour: "19", day: "23.09", value: 10 },
	{ hour: "D", day: "23.98", value: 20 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: "C", day: "g", value: 15 },
	{ hour: '', day: "", value: 0 },
];


var style = getComputedStyle(document.body)
const cellColors = {
	smallW: style.getPropertyValue('--smallW-color'),
	avarageW: style.getPropertyValue('--avarageW-color'),
	bigW: style.getPropertyValue('--bigW-color')
}


const max_offset = 10

function Chart() {
	return (
		<ResponsiveContainer width="100%" aspect={1 / 0.75}>
			<ComposedChart data={data} margin={{ left: -20, right: 10, top: 20 }}>
				<defs>
					<linearGradient id="gradient" x1='0' y1='0' x2='0' y2='1'>
						<stop offset="5%" stopColor={cellColors.avarageW} stopOpacity={1} />
						<stop offset="95%" stopColor="#ffffff" stopOpacity={0.3} />
					</linearGradient>
				</defs>

				<XAxis  angle={-70} dataKey="day" tickLine={false} axisLine={false} />
				<YAxis tickLine={false} axisLine={false}
					domain={[0, `dataMax + ${max_offset}`]}
				/>

				<CartesianGrid vertical={false} strokeDasharray="4" />
				<Tooltip />
				<Bar
					dataKey="value"
					fill="url(#gradient)"
					width={'5%'}>
				</Bar>
				<Line type="monotone" dataKey="value" stroke={`${cellColors.bigW}`} />
			</ComposedChart>
		</ResponsiveContainer>
	);
}
export default Chart
