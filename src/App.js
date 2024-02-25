import MyDrawer from './components/drawer';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import './App.css';
import Head from './components/Head';
import Paragraf from './components/Paragraf';
import Chart from './components/BarChart';
import ChairPannel from './components/PieChart';
import MyButton from './components/Button';
import ColorfulText from './components/ColorfulText';
import { get_colors } from './components/getColor';
import { GetData } from './DataReciver.js'
import {
	Train,
	CountCurrentState,
	CountTimesADayHour,
	CountMinMaxVals,

} from './logic.js';


const myColors = get_colors()

function Pannel(props) {
	return (
		<div className='chair-pannel'>
			<Paragraf
				aspect_ratio={10}
				marginLeft={5}
				red={true}
				text={'Weight distribution'}
			/>
			<ChairPannel data={props.data} />
		</div>
	)
}

function WeightChart(props) {
	return (
		<div className='weight-chart' style={{ marginTop: '20%' }}>
			<Paragraf
				aspect_ratio={10}
				marginLeft={5}
				red={true}
				text={'Weight at spesific time'}
			/>
			<Chart data={props.data} />
		</div>
	)
}

function CurrentState(props) {
	let current_state = CountCurrentState(props.data)

	return (
		<div className='current-state'>
			<ColorfulText
				color={myColors.block1}
				text_color={myColors.text1}
				text={`posture: ${current_state.state}`}
			/>
			<ColorfulText
				color={myColors.block2}
				text_color={myColors.text2}
				text={`change posture: ${current_state.sugest}`}
			/>
			<ColorfulText color={myColors.block3}>
				<MyButton data={props.data} />
			</ColorfulText>
		</div>
	)
}

function HistoryPart(props) {
	return (
		<div>
			<Paragraf
				aspect_ratio={8}
				marginLeft={5}
				red={true}
				text={props.main_text}
			/>

			<div style={{
				border: 'solid 0.5vw',
				borderColor: `${myColors.block2}`,
				borderRadius: '5%/10%'
			}}>
				{props.texts.map((single_text) =>
					<Paragraf
						aspect_ratio={100}
						marginLeft={5}
						red={false}
						text={single_text}
					/>
				)}
			</div>
		</div>
	)
}

function DayAndHour(props) {
	let times = CountTimesADayHour(props.data)

	return (
		<div>
			<HistoryPart main_text={'number of times'}
				texts={[`- day ${times.day}`, `- hour ${times.hour}`]} />
		</div>
	)
}

function MinAndMax(props) {
	let values = CountMinMaxVals(props.data)

	return (
		<div>
			<HistoryPart main_text={'avarage weight'}
				texts={[`- max ${values.max}`, `- min ${values.min}`]} />
		</div>
	)
}

function TrainDiv({ train_state }) {
	return (
		<div style={{
			width: '100%',
			overflowY: 'scroll',
			display: 'flex',
			position: 'absolute',
			zIndex: 1000,
			alignItems: 'center',
			visibility: `${train_state.visibility}`,
			background: 'rgba(0, 0, 0, 0.6)',
		}} >
			<p style={{
				whiteSpace: 'pre-line',
				marginLeft: `${36}%`,
				fontSize: '10vw',
				fontWeight: `bold`,
				color: `#ffffff`,
			}}>
				{train_state.text}
			</p>
		</div >
	)
}


function App() {
	const [data, setData] = useState(undefined)
	const [train_state, setTrainState] = useState({ visibility: 'hidden', time: 'time', text: 'text' })

	useEffect(() => {
		const interval = setInterval(() => {
			GetData().then((res) => {
				setData(res)
				Train(res, setTrainState)
			})
		}, 2000)

		return () => {
			clearInterval(interval);
		}
	}, [])

	if (data === undefined)
		return (<></>)

	return (
		<div className="App">
			<TrainDiv train_state={train_state} />

			<Head
				aspect_ratio={5}
				text={'Posture controll system'}
				marginLeft={50}
			/>
			<div className='body' style={{ paddingLeft: '3%', paddingRight: '3%' }}>
				<Pannel data={data} />

				<div style={{ marginTop: '10%' }}>
					<CurrentState data={data} />
				</div>

				<div style={{ marginTop: '25%' }}>
					<Head aspect_ratio={8} text='history' marginLeft='42' />
				</div>

				<div style={{ margin: '4%' }}>
					<Grid container>
						<Grid item xs={5.5}>
							<DayAndHour data={data} />
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={5.5}>
							<MinAndMax data={data} />
						</Grid>
					</Grid>
				</div>

				<WeightChart data={data} />
				<div style={{ marginTop: '10%' }}>
					<ColorfulText
						color={myColors.block2}
						text_color={myColors.text2}
						text={'training every 40 minutes'}
					/>
					<ColorfulText
						color={myColors.block2}
						text_color={myColors.text2}
						text={`time before trianing(sec): ${train_state.time}`}
					/>
				</div>

				<div style={{ height: '100px' }} />

			</div>
		</div>
	);
}
export default App;
