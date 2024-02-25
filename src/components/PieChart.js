import { Grid } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Label } from 'recharts';


function ChairCell({ data }) {
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
						className='text'
						value={`${data[0].value}%`}
						position="center"
						fontSize='4vw'
						color="#ffffff"
					/>
					{data.map((elem, index) => (
						<Cell fill={elem.color} key={index}></Cell>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)
}

function ChairRow({ in_row_count, data }) {
	let iterable = Array(4).fill(0)
	let data_index = 0

	return (
		<Grid container>
			{iterable.map((elem, index) => {
				let cell_object

				if (in_row_count === 2 && (index === 0 || index === 3)) {
					cell_object = (<div />)
				}
				else {
					cell_object = (< ChairCell data={data[data_index]} />)
					data_index++
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

function ChairChart({ data }) {
	return (
		<ResponsiveContainer width={'100%'} aspect={'3/4'}>
			<ChairRow in_row_count={2} data={data.weights.slice(0, 2)} />
			<ChairRow in_row_count={4} data={data.weights.slice(2, 6)} />
			<ChairRow in_row_count={4} data={data.weights.slice(6, 10)} />
		</ResponsiveContainer>
	)
}
export default ChairChart
