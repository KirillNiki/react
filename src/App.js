import MyDrawer from './drawer';
import Grid from '@mui/material/Grid';
import './App.css';
import Head from './Head';
import Chart from './BarChart';
import Paragraf from './Paragraf';
import ChairPannel from './PieChart';
import MyButton from './Button';
import ColorfulText from './ColorfulText';
import { get_colors } from './getColor';



const myColors = get_colors()

function Pannel() {
	return (
		<div className='chair-pannel'>
			<Paragraf
				aspect_ratio={10}
				marginLeft={5}
				red={true}
				text={'Weight distribution'}
			/>
			<ChairPannel />
		</div>
	)
}

function WeightChart() {
	return (
		<div className='weight-chart' style={{ marginTop: '20%' }}>
			<Paragraf
				aspect_ratio={10}
				marginLeft={5}
				red={true}
				text={'Weight at spesific time'}
			/>
			<Chart />
		</div>
	)
}

function CurrentState() {
	return (
		<div className='current-state'>
			<ColorfulText
				color={myColors.block1}
				text_color={myColors.text1}
				text={`posture: ${'correct'}`}
			/>
			<ColorfulText
				color={myColors.block2}
				text_color={myColors.text2}
				text={`change posture: ${'none'}`}
			/>
			<ColorfulText color={myColors.block3}>
				<MyButton />
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

function App() {

	return (
		<div className="App">
			<Head
				aspect_ratio={5}
				text={'Posture controll system'}
				marginLeft={50}
			/>
			<div className='body' style={{ paddingLeft: '3%', paddingRight: '3%' }}>
				<Pannel />

				<div style={{ marginTop: '10%' }}>
					<CurrentState />
				</div>

				<div style={{ marginTop: '25%' }}>
					<Head aspect_ratio={8} text='history' marginLeft='42' />
				</div>

				<div style={{ margin: '4%' }}>
					<Grid container>
						<Grid item xs={5.5}>
							<HistoryPart main_text={'number of times'} texts={[`- day ${0}`, `- hour ${0}`]} />
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={5.5}>
							<HistoryPart main_text={'avarage weight'} texts={[`- max ${0}`, `- min ${0}`]} />
						</Grid>
					</Grid>
				</div>

				<WeightChart />
				<div style={{marginTop: '10%'}}>
					<ColorfulText
						color={myColors.block2}
						text_color={myColors.text2}
						text={'training every 40 minutes'}
					/>
					<ColorfulText
						color={myColors.block2}
						text_color={myColors.text2}
						text={`time before trianing(sec): ${2399}`}
					/>
				</div>

				<div style={{height: '100px'}}/>

			</div>
		</div>
	);
}
export default App;
