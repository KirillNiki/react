import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paragraf from "./Paragraf";
import { get_colors } from "./getColor";
import ColorfulText from './ColorfulText.js'

const colors = get_colors()


function InstallPWA() {
  const [pressed, setPressed] = useState(false)
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("transitionend", handler)
    };
  }, []);

  const onClick = async (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();

    const { outcome } = await promptInstall.userChoice
    if (outcome === 'accepted') {
      setPressed(true)
    }
  }

  if (!supportsPWA) {
    return null;
  }

  if (pressed)
    return <></>

  return (
    <ColorfulText color={colors.block1}>
      <ResponsiveContainer aspect={1.0 / 0.15} width={'100%'}>
        <Grid container alignItems='center'>

          <Grid item xs={9}>
            <Paragraf
              aspect_ratio={8}
              marginLeft={4}
              red={true}
              text_color={colors.text1}
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
              }}
              onClick={onClick}>
              click
            </Button>
          </Grid>

        </Grid>
      </ResponsiveContainer>
    </ColorfulText>
  );
};
export default InstallPWA;
