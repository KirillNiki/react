import { Button } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paragraf from "./Paragraf";
import { get_colors } from "./getColor";
import ColorfulText from "./ColorfulText";
import { connect_to_bt } from '../DataReciver'

const colors = get_colors()


function ConnectButton() {
  const onClick = () => {
    connect_to_bt();
  }

  return (
    <ColorfulText color={colors.block2}>
      <ResponsiveContainer aspect={1.0 / 0.15} width={'100%'}>
        <Grid container alignItems='center'>

          <Grid item xs={9}>
            <Paragraf
              aspect_ratio={8}
              marginLeft={4}
              red={true}
              text_color={colors.text2}
              text={'Press to connect to bluetooth'}
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
                color: colors.text2
              }}
              onPointerUp={onClick}>
              click
            </Button>
          </Grid>

        </Grid>
      </ResponsiveContainer>
    </ColorfulText>
  );
};
export default ConnectButton
