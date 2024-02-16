import React from 'react';
import './index.css';
import { styled } from '@mui/material/styles'
import { Grid, Paper } from '@mui/material';
import { ResponsiveContainer } from 'recharts';


var style = getComputedStyle(document.body)
const cellColors = {
    smallW: style.getPropertyValue('--smallW-color'),
    avarageW: style.getPropertyValue('--avarageW-color'),
    bigW: style.getPropertyValue('--bigW-color')
}
let data = { weightPerPercent: 1, weights: [1, 1, 1, 1, 1, 11, 1, 1, 1, 1] }

let margin = 6
const CellItem = styled(Paper)(({ color, theme }) => ({
    backgroundColor: color,
    borderRadius: '100%',
    margin: `${margin}%`,
    height: `${100 - 2 * margin}%`,
}))

function PannelCel(weight) {
    let color = cellColors.avarageW
    if (weight / data.weightPerPercent > 15) {
        color = cellColors.bigW
    }
    else if (weight / data.weightPerPercent < 5) {
        color = cellColors.smallW
    }

    return (
        <CellItem color={color} />
    )
}

function PannelRow(weights) {
    let keys = Array(4).fill(null)
    let weigths = weights.weights
    let index = 0

    return (
        <Grid container style={{ padding: 1 }}>
            {keys.map((elem, key) => {

                let cell_component = (
                    <PannelCel weight={weigths[index++]} />
                )
                if (weigths.length === 2 && (key === 0 || key === 3)) {
                    cell_component = (
                        <div />
                    )
                }
                return (
                    <Grid item style={{ alignItems: 'stretch' }} xs={3} key={key}>
                        {cell_component}
                    </Grid>
                )
            })}
        </Grid>
    )
}

function ChairPannel() {
    return (
        <ResponsiveContainer width='100%' aspect={4.5 / 2.0}>
            <Grid container spacing={1} style={{ padding: 10 }}>
                <PannelRow weights={data.weights.slice(0, 2)} />
                <PannelRow weights={data.weights.slice(2, 6)} />
                <PannelRow weights={data.weights.slice(6, 10)} />
            </Grid>
        </ResponsiveContainer>
    )
}
export { ChairPannel }
