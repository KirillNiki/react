import { Button } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paragraf from "./Paragraf";
import { get_colors } from "./getColor";

const colors = get_colors()

function InstallButton(props) {
  return (
    <ResponsiveContainer
      id='install_button_div'
      aspect={1.0 / 0.15}
      width={'100%'}
    >
      <Grid container alignItems='center'>

        <Grid item xs={9}>
          <Paragraf
            aspect_ratio={8}
            marginLeft={4}
            text_color={`${colors.text1}`}
            font_weight={'bold'}
            text={'Press to install'}
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            id='install_button'
            size="lg"
            variant="outlined"
            color='inherit'
            style={{
              width: '70%',
              fontSize: '2.4vw',
              aspectRatio: 3,
              color: colors.text1
            }}
            onClick={() => {
              let elem = document.getElementById('install_button_div')
              elem.style.visibility = 'hidden'
              props.install_event.prompt()
            }}>
            click
          </Button>
        </Grid>

      </Grid>
    </ResponsiveContainer>
  )
}
export default InstallButton