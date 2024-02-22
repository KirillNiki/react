import { Button } from "@mui/material";
import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paragraf from "./Paragraf";

const start_text = 'Press to enter weight measurment'

function MyButton() {
  const [buttonState, ChangeState] = useState(true)
  const [text, ChangeText] = useState(start_text)

  return (
    <ResponsiveContainer aspect={1.0 / 0.15} width={'100%'}>
      <Grid container alignItems='center'>

        <Grid item xs={3}>
          <Button
            size="lg"
            variant="outlined"
            color='inherit'
            style={{
              width: '70%',
              fontSize: '2.4vw',
              aspectRatio: 3
            }}
            onClick={() => {
              switch (buttonState) {
                case true:
                  ChangeText('567')
                  break
                default:
                  ChangeText(start_text)
                  break
              }
              ChangeState(!buttonState)
            }}>
            click
          </Button>
        </Grid>

        <Grid item xs={9}>
          <Paragraf
            aspect_ratio={8}
            marginLeft={2}
            red={false}
            text={text}
            font_weight='bold'
          />
        </Grid>

      </Grid>
    </ResponsiveContainer>
  )
}
export default MyButton
