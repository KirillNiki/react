import { Button } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paragraf from "./Paragraf";
import { get_colors } from "./getColor";

const colors = get_colors()

function InstallButton(props) {
  return (
    <ResponsiveContainer id={'install_button'} aspect={1.0 / 0.15} width={'100%'}>
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
            size="lg"
            variant="outlined"
            color='inherit'
            style={{
              width: '70%',
              fontSize: '2.4vw',
              aspectRatio: 3,
              color: colors.text1
            }}>
            click
          </Button>
        </Grid>

      </Grid>
    </ResponsiveContainer>
  )
}
export default InstallButton
