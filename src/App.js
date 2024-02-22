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
import { colors } from '@mui/material';



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
		// <Grid item xs={props.xs}>
		// 	<Paragraf
		// 		aspect_ratio={8}
		// 		marginLeft={5}
		// 		red={true}
		// 		text={props.texts[0]}
		// 	/>
		// 	<div style={{
		// 		marginTop: '10%',
		// 		border: '10px',
		// 		borderColor: `${myColors.bigW}`,
		// 		borderRadius: '5%/20%'
		// 	}}>
		// 	</div>
		// </Grid>
		<div>
			{props.texts.map((text) => {
				console.log(props.texts)

				return <Paragraf
					aspect_ratio={2}
					marginLeft={5}
					red={false}
					text={text}
				/>
			})}
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

				<Grid container>
					<HistoryPart main_text={'number of times'} texts={[`- day ${0}`, `- hour ${0}`]} xs={6} />
					<HistoryPart main_text={'number of times'} texts={[`- day ${0}`, `- hour ${0}`]} xs={6} />
				</Grid>

				<Chart></Chart>
				<Paragraf />
				<Paragraf />

			</div>
		</div>
	);
}

export default App;
