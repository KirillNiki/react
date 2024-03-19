import { get_colors } from "./components/getColor";
import { TwoMaxAvarage } from "./logic";

let service = undefined
const serviceUUID = 0x00FF
const dataUUID = 0xFF01
const timeUUID = 0xFF02
const colors = get_colors()

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
    sittingTimer: Date.now() / 1000,
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
  navigator.bluetooth.requestDevice({
    filters: [{
      services: [serviceUUID],
      optionalServices: [serviceUUID]
    }],
  })
    .then(device => {
      return device.gatt.connect()
    })
    .then(server => {
      service = server.getPrimaryService(serviceUUID)
    })
}

async function request_data() {
  if (got_data) {
    return data_string
  }

  let data_chunk
  if (service !== undefined) {

    service.then(service => {
      return service.getCharacteristic(dataUUID)

    }).then(async (characteristic) => {
      data_chunk = await characteristic.readValue()
      for (var i = 0; i < data_chunk.byteLength; i++) {
        data_string += String.fromCharCode(data_chunk.getInt8(i))
      }
      if (String.fromCharCode(data_chunk.getInt8(data_chunk.byteLength - 1)) === '\r') {
        got_data = true
        return data_string
      }
    })
  }
  return undefined
}

async function sync_time() {
  let transmit_data = JSON.stringify({
    "time": Math.round((new Date(Date.now())).getTime() / 1000),
  })

  if (service !== undefined) {
    service.then(service => {

      service.getCharacteristic(timeUUID)
        .then(async (characteristic) => {
          let encoder = new TextEncoder()
          let to_write = encoder.encode(transmit_data)
          await characteristic.writeValue(to_write)
        })
    })
    syncronized = true
  }
}

async function GetData() {
  if (!syncronized) {
    sync_time()
  }

  let data = default_data()
  try {
    let json_string = await request_data()
    if (json_string) {
      data = JSON.parse(json_string)
      json_string = undefined
      got_data = false
      data_string = ''
    }
  }
  catch (error) {
    console.log(error)
  }

  data.allValuesSum = 0;
  for (let i = 0; i < data.weights.length; i++) {
    data.allValuesSum += parseInt(data.weights[i].weight)
  }
  data.valuePerPersent = data.allValuesSum / 100
  let current_weight = TwoMaxAvarage(data)
  data.currentWeight = current_weight !== undefined ? current_weight : 0
  data.currentWeight = Math.round(data.currentWeight / 1000)
  data.sittingTimer = data.sittingTimer !== 0 ? data.sittingTimer * 1000 : Date.now()

  for (let i = 0; i < data.weights.length; i++) {
    data.weights[i].value = 0
    if (data.valuePerPersent > 0) {
      data.weights[i].value = Math.round(data.weights[i].weight / data.valuePerPersent)
    }
    data.weights[i].color = data_color(data.weights[i].value)
  }

  for (var i = 0; i < data.infoData.length; i++) {
    if (data.infoData[i].time !== 0) {
      let time = new Date(data.infoData[i].time * 1000)
      data.infoData[i].time = time
      data.infoData[i].value = Math.round(data.infoData[i].value / 1000)
      data.infoData[i].time_string = `${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
      data.infoData[i].day = `${weekDays[time.getDay()]}`
    } else {
      data.infoData[i].time_string = '0'
      data.infoData[i].day = '0'
    }
  }
  return data
}

export {
  connect_to_bt,
  GetData,
  default_data,
}
