import { Button } from "@mui/material";
import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paragraf from "./Paragraf";
import { get_colors } from "./getColor";

const colors = get_colors()
const start_text = 'Press to enter weight measurment'

function MyButton(props) {
  const [buttonState, ChangeState] = useState(false)
  let text = start_text

  if (buttonState === true) {
    text = `${props.data.currentWeight / 1000} kg`
  }

  return (
    <ResponsiveContainer aspect={1.0 / 0.15} width={'100%'}>
      <Grid container alignItems='center'>

        <Grid item xs={9}>
          <Paragraf
            aspect_ratio={8}
            marginLeft={4}
            red={true}
            text={text}
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            size="lg"
            variant="outlined"
            color='inherit'
            // color={colors.bigW}
            style={{
              width: '70%',
              fontSize: '2.4vw',
              aspectRatio: 3,
              color: colors.bigW
            }}
            onClick={() => {
              if (buttonState === false) {
                alert('enterd weight measurment mode')
              }
              ChangeState(!buttonState)
            }}>
            click
          </Button>
        </Grid>

      </Grid>
    </ResponsiveContainer>
  )
}
export default MyButton
