import { get_colors } from "./components/getColor";
import { TwoMaxAvarage } from "./logic";

let service = undefined
const serviceUUID = 0x00FF
const dataUUID = 0xFF01
const timeUUID = 0xFF02
const trainUUID = 0xFF03
const colors = get_colors()

const factor = 34;
const weekDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Fir',
  'Fri',
  'Sat',
]


let data_string = ''
let got_data = false
let syncronized = false

function default_data() {
  return {
    weights: Array(10).fill({ weight: 0, value: 0, color: 0 }),
    infoData: Array(10).fill({ time: 0, time_string: '', value: 0 }),
    allValuesSum: 0,
    valuePerPersent: 0,
    sittingTimer: Date.now(),
    currentWeight: 0,
  }
}

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

async function connect_to_bt() {
  try {
    navigator.bluetooth.requestDevice({
      filters: [{
        services: [serviceUUID],
        optionalServices: [serviceUUID]
      }],
    })
      .then(device => {
        return device.gatt.connect()
      })
      .then(async (server) => {
        service = await server.getPrimaryService(serviceUUID)
      })
  }
  catch (error) { }
}

async function request_data() {
  if (got_data) {
    return data_string
  }

  let data_chunk
  if (service !== undefined) {

    const characteristic = await service.getCharacteristic(dataUUID)

    data_chunk = await characteristic.readValue()
    for (var i = 0; i < data_chunk.byteLength; i++) {
      data_string += String.fromCharCode(data_chunk.getInt8(i))
    }
    if (String.fromCharCode(data_chunk.getInt8(data_chunk.byteLength - 1)) === '\r') {
      got_data = true
      data_string = data_string.substring(0, data_string.length - 1)
      return data_string
    }
  }
  return undefined
}

async function sync_time() {
  let transmit_data = JSON.stringify({
    "time": Math.round((new Date(Date.now())).getTime() / 1000),
  })

  if (service !== undefined) {
    const characteristic = await service.getCharacteristic(timeUUID)
    let encoder = new TextEncoder()
    let to_write = encoder.encode(transmit_data)
    await characteristic.writeValue(to_write)
    syncronized = true
  }
}

async function set_train() {
  const characteristic = await service.getCharacteristic(trainUUID)
  let to_write = 0x00
  await characteristic.writeValue(to_write)
}

let data
async function GetData() {
  let new_data
  if (!syncronized) {
    data = default_data()
    sync_time()
  }

  try {
    let json_string = await request_data()
    if (json_string) {
      new_data = JSON.parse(json_string)
      json_string = undefined
      got_data = false
      data_string = ''

      new_data.allValuesSum = 0;
      for (let i = 0; i < new_data.weights.length; i++) {
        new_data.allValuesSum += parseInt(new_data.weights[i].weight)
      }
      new_data.valuePerPersent = new_data.allValuesSum / 100
      let current_weight = TwoMaxAvarage(new_data) * factor
      new_data.currentWeight = current_weight !== undefined ? current_weight : 0
      new_data.currentWeight = Math.round(new_data.currentWeight / 1000)
      new_data.sittingTimer = new_data.sittingTimer !== 0 ? new_data.sittingTimer * 1000 : Date.now()

      for (let i = 0; i < new_data.weights.length; i++) {
        new_data.weights[i].value = 0
        if (new_data.valuePerPersent > 0) {
          new_data.weights[i].value = Math.round(new_data.weights[i].weight / new_data.valuePerPersent)
        }
        new_data.weights[i].color = data_color(new_data.weights[i].value)
      }
      new_data.weights.reverse()

      for (var i = 0; i < new_data.infoData.length; i++) {
        if (new_data.infoData[i].time !== 0) {
          let time = new Date(new_data.infoData[i].time * 1000)
          new_data.infoData[i].time = time
          new_data.infoData[i].value = Math.round(new_data.infoData[i].value / 1000)
          new_data.infoData[i].time_string = `${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
          new_data.infoData[i].day = `${weekDays[time.getDay()]}`
        } else {
          new_data.infoData[i].time_string = '0'
          new_data.infoData[i].day = '0'
        }
      }
    }
  }
  catch (error) {
    data_string = ''
    console.log(error)
  }

  if (new_data !== undefined) {
    data = JSON.parse(JSON.stringify(new_data))
  }
  return data
}

export {
  set_train,
  connect_to_bt,
  GetData,
  default_data,
}
