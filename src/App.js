import MyDrawer from './components/MyDrawer.js';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Head from './components/Head';
import Paragraf from './components/Paragraf';
import Chart from './components/BarChart';
import ChairPannel from './components/PieChart';
import MyButton from './components/Button';
import ColorfulText from './components/ColorfulText';
import { get_colors } from './components/getColor';
import { GetData, install_event } from './DataReciver.js'
import {
	Train,
	CountCurrentState,
	CountTimesADayHour,
	CountMinMaxVals,

} from './logic.js';
import Dialog from '@mui/material/Dialog';
import InstallButton from './components/InstallButton.js';


const myColors = get_colors()

function Pannel(props) {
	return (
		<div className='chair-pannel'>
			<Grid container alignItems={'center'}>
				<Grid item xs={8}>
					<Paragraf
						aspect_ratio={10}
						marginLeft={5}
						red={true}
						text={'Weight distribution'}
					/>
				</Grid>
				<Grid item xs={4} alignItems={'center'} >
					<MyDrawer main_ref={props.main_ref}
						history_ref={props.history_ref}
						stat_ref={props.stat_ref} />
				</Grid>
			</Grid>
			<ChairPannel data={props.data} />
		</div >
	)
}

function WeightChart(props) {
	return (
		<div className='weight-chart'>
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
	let margin = 38
	if (train_state.text === 'sit') {
		margin = 44
	}

	return (
		<Dialog fullScreen={true} open={train_state.open} >
			<Paragraf
				aspect_ratio={100}
				marginLeft={10}
				font_size={'10vw'}
				red={true}
				text={'train had started'}
			/>
			<div
				style={{
					background: `${myColors.block2}`,
					borderRadius: '10%/20%',
					marginLeft: '5%',
					marginRight: '5%',
				}}>
				<Paragraf
					aspect_ratio={100}
					marginLeft={margin}
					font_size={'8vw'}
					red={false}
					text={train_state.text}
				/>
			</div>
		</Dialog>
	)
}


function App() {
	const [is_loaded, setIsLoaded] = useState(false)
	const [data, setData] = useState(undefined)
	const [train_state, setTrainState] = useState({ open: false, time: 'time', text: 'text' })

	const main_ref = useRef(null)
	const history_ref = useRef(null)
	const stat_ref = useRef(null)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoaded(true)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [is_loaded])

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
				ref={main_ref}
				aspect_ratio={5}
				text={'Posture controll system'}
				marginLeft={50}
			/>
			<div className='body' style={{ paddingLeft: '3%', paddingRight: '3%' }}>
				<Pannel main_ref={main_ref} history_ref={history_ref} stat_ref={stat_ref} data={data} />

				<div style={{ marginTop: '10%' }}>
					<CurrentState data={data} />
				</div>

				<div ref={history_ref} style={{ marginTop: '25%' }}>
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

				<div style={{ marginTop: '25%' }} ref={stat_ref}>
					<Head aspect_ratio={8} text='statistics' marginLeft='38' />
				</div>
				<WeightChart refer={stat_ref} data={data} />

				<div style={{ marginTop: '10%' }}>
					<ColorfulText
						color={myColors.block2}
						text_color={myColors.text2}
						text={'training every 40 minutes'}
					/>
					<ColorfulText
						color={myColors.block2}
						text_color={myColors.text2}
						text={`time before trianing in seconds: ${train_state.time}`}
					/>
					<ColorfulText
						color={myColors.block1}
					>
						<InstallButton event={install_event} />
					</ColorfulText>
				</div>

				<div style={{ height: '100px' }} />

			</div>
		</div>
	);
}
export default App;
