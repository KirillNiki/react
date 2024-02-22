import MyDrawer from './drawer';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './App.css';
import Head from './Head';
import Chart from './BarChart';
import Paragraf from './Paragraf';
import ChairPannel from './PieChart';
import MyButton from './Button';
import ColorfulText from './ColorfulText';
import { get_colors } from './getColor';


const Item = styled(Paper)(({ color, theme }) => ({
	backgroundColor: color || '#efefef',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const myColors = get_colors()
const current_weight = 90

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

function App() {
	const { innerWidth: width } = window;

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
					{/* <Paragraf
						aspect_ratio={10}
						marginLeft={5}
						red={true}
						text={'Current state'}
					/> */}
					<CurrentState />
				</div>
				<MyButton />






				<Head aspect_ratio={8} />
				<Grid container>
					<Grid item xs={6}>
						<Paragraf />
					</Grid>
					<Grid item xs={6}>
						<Paragraf />
					</Grid>
				</Grid>
				<Chart></Chart>
				<Paragraf />
				<Paragraf />

				{/*       
      <Grid container spacing={1} style={{ backgroundColor: '#FFF0EC' }}>
        <Grid item xs={12} style={{ textAlign: 'left', margin: 4 }}>
          <MyDrawer />
        </Grid>
        <Grid item xs={12} height={width * 0.8} >
          <ChairPannel />
        </Grid>
      </Grid> */}

				{/* <Grid container spacing={1} style={{ padding: 5 }}>
        <Grid item xs={6}>
          <Item>
            <MyChart />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <MyChart />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid> */}

			</div>
		</div>
	);
}

export default App;
