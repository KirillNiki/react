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
    { name: '', value: 0 },
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: "C", value: 15 },
    { name: '', value: 0 },
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
        <ResponsiveContainer width='100%' aspect={2.0 / 1.0}>
            <ComposedChart data={data}>
                <defs>
                    <linearGradient id="gradient" x1='0' y1='0' x2='0' y2='1'>
                        <stop offset="5%" stopColor={cellColors.avarageW} stopOpacity={1} />
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0.3} />
                    </linearGradient>
                </defs>

                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false}
                    domain={[0, `dataMax + ${max_offset}`]}
                />

                <CartesianGrid vertical={false} strokeDasharray="4" />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="value"
                    fill="url(#gradient)"
                    barSize={10}>
                </Bar>
                <Line type="monotone" dataKey="value" stroke={`${cellColors.bigW}`} />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
export default Chart
