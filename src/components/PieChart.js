import { Grid } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Label } from 'recharts';
import { get_colors } from "../getColor";


const colors = get_colors()

function data_color(value) {
	let color = colors.avarageW

	if (value > 50) {
		color = colors.bigW
	}
	else if (value < 5) {
		color = colors.smallW
	}
	return color
}


let data_index = 0
const mydata = [
	[
		{ name: 'test', value: 23, color: data_color(23) },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 345, color: data_color(345) },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: data_color(32) },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 77, color: data_color(77) },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: '#ff0000' },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: '#ff0000' },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: '#ff0000' },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: '#ff0000' },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: '#ff0000' },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
	[
		{ name: 'test', value: 32, color: '#ff0000' },
		{ name: 'test1', value: 68, color: '#ffffff' }
	],
]

function ChairCell(props) {
	return (
		<ResponsiveContainer width={'100%'} style={{ aspectRatio: '1/1' }}>
			<PieChart>
				<Pie data={props.data}
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
						value={`${props.data[0].value}%`}
						position="center"
						fontSize='4vw'
						color="#ffffff"
					/>
					{props.data.map((elem, index) => (
						<Cell fill={elem.color} key={index}></Cell>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)
}

function ChairRow(props) {
	let iterable = Array(4).fill(0)
	let in_row_count = props.in_row_count
	let data_index = 0

	return (
		<Grid container>
			{iterable.map((elem, index) => {
				let cell_object

				if (in_row_count === 2 && (index === 0 || index === 3)) {
					cell_object = (<div />)
				}
				else {
					cell_object = (< ChairCell data={props.data[data_index]} />)
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

function ChairChart() {
	return (
		<ResponsiveContainer width={'100%'} aspect={'3/4'}>
			<ChairRow in_row_count={2} data={mydata.slice(0, 2)} />
			<ChairRow in_row_count={4} data={mydata.slice(2, 6)} />
			<ChairRow in_row_count={4} data={mydata.slice(6, 10)} />
		</ResponsiveContainer>
	)
}

export default ChairChart