import {
  CartesianGrid,
  XAxis,
  Tooltip,
  LineChart, 
  Line,
  ResponsiveContainer
} from 'recharts';

const data01 = [
  { day: '01', wether: 23 },
  { day: '02', wether: 12 },
  { day: '03', wether: 211 },
  { day: '04', wether: 12 },
  { day: '05', wether: 32 },
  { day: '06', wether: 43 },
  { day: '07', wether: 31 },
  { day: '08', wether: 14 },
  { day: '09', wether: 19 },
];

export default function MyChart() {
  return (
    <ResponsiveContainer width='100%' aspect={4.0/6.0}>
      {<LineChart width={300} height={600} data={data01} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="day" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="wether" stroke="#ff7300" yAxisId={0} />
      </LineChart> }
    </ResponsiveContainer>
  );
}