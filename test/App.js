import MyChart from './Chart';
import MyDrawer from './drawer';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './App.css';
import { ChairPannel } from './ChairPannel';


const Item = styled(Paper)(({ color, theme }) => ({
  backgroundColor: color, //theme.palette.mode === 'dark' ? '#1A2027' : '#F0E4E1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div className="App">

      <Grid container spacing={1} style={{ padding: 5 }}>
        <Grid item xs={12}>
          <Item color='#1A2027'>
            <MyDrawer />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item color='#1A2027'>
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
        <Grid item xs={12}>
          <ChairPannel />
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
