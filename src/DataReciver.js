import { get_colors } from "./components/getColor";
import { TwoMaxAvarage } from "./logic";

const host = `http://192.168.0.109:9000/`
const factor = 34;
const colors = get_colors()


function data_color(value) {
  let color = colors.avarageW

  if (value > 50) {
    color = colors.bigW
  }
  else if (value < 5) {
    color = colors.smallW
  }
  return color
}

async function GetData() {
  // let data
  // if (data_in_use === undefined) {
  let data = {
    weights: Array(10).fill({ weight: 0, value: 0, color: 0 }),
    infoData: Array(10).fill({ time: 0, value: 0 }),
    allValuesSum: 0,
    valuePerPersent: 0,
    sittingTimer: 0,
  }
  // }
  // else {
  //   data = { ...data_in_use }
  // }

  try {
    let dataHeaders = await fetch(`${host}data`, { mode: 'cors' })
    data = await dataHeaders.json()
  }
  catch (error) { console.log(error) }


  data.allValuesSum = 0;
  for (let i = 0; i < data.weights.length; i++) {
    data.allValuesSum += parseInt(data.weights[i].weight)
  }
  data.valuePerPersent = data.allValuesSum / 100
  data.currentWeight = TwoMaxAvarage(data) * factor
  data.sittingTimer = data.sittingTimer * 1000

  for (let i = 0; i < data.weights.length; i++) {
    data.weights[i].value = 0
    if (data.valuePerPersent > 0) {
      data.weights[i].value = Math.round(data.weights[i].weight / data.valuePerPersent)
    }
    data.weights[i].color = data_color(data.weights[i].value)
  }

  for (var i = 0; i < data.infoData.length; i++) {
    let time = new Date(data.infoData[i].time * 1000)
    data.infoData[i].time = `${time.getDate()}.${time.getMonth()} ${time.getHours()}:${time.getMinutes()}`
  }
  return data
}


fetch(`${host}watchTime`, {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "time": Math.floor((new Date(Date.now())).getTime() / 1000),
  }),
}).catch((error) => {
  console.log(error);
});


export {
  host,
  GetData,
}
