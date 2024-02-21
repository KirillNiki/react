import { Grid } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Label } from 'recharts';


const data = [
	{ name: 'test', value: 32, color: '#ff0000' },
	{ name: 'test1', value: 68, color: '#ffffff' },
]

function ChairCell() {
	return (
		<ResponsiveContainer width={'100%'} style={{ aspectRatio: '1/1' }}>
			<PieChart>
				<Pie data={data}
					dataKey={'value'}
					outerRadius={'100%'}
					innerRadius={'80%'}
					startAngle={-360}
					endAngle={0}
					paddingAngle={5}
					stroke="#000000"
				>
					<Label
						value={`${data[0].value}%`} position="center" className='simple-text' fontSize='100%'
					/>
					{data.map((elem, index) => (
						<Cell fill={elem.color} key={index}></Cell>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)
}

function ChairRow(props) {
	let iterable = Array(4).fill(null)
	let in_row_count = props.in_row_count

	return (
		<Grid container>
			{iterable.map((elem, index) => {
				let cell_object = (< ChairCell />)

				if (in_row_count === 2 && (index === 0 || index === 3)) {
					cell_object = (<div />)
				}
				return (
					< Grid item xs={3} key={index} style={{ padding: '2%' }}>
						{cell_object}
					</Grid>
				)
			})}
		</Grid >
	)
}

function ChairChart() {
	return (
		<ResponsiveContainer width={'100%'} aspect={'3/4'}>
			<ChairRow in_row_count={2} />
			<ChairRow in_row_count={4} />
			<ChairRow in_row_count={4} />
		</ResponsiveContainer>
	)
}

export default ChairChart
