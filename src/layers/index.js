import * as d3 from 'd3'
import GL from '@luma.gl/constants'

import { ScatterplotLayer, GeoJsonLayer, LineLayer, HexagonLayer } from 'deck.gl'

import { csv as requestCSV, json as requestJSON } from 'd3-request'

const nyc = [-73.91922208269459, 40.72185277744134]

const words = {
  GOOD: d3.rgb('pink'),
  FAIR: d3.rgb('purple'),
  BAD: d3.rgb('red'),
  POOR: d3.rgb('blue'),
  NR: d3.rgb('white')
}
const LIGHT_SETTINGS = {
  lightsPosition: [nyc[0], nyc[1], 5000, nyc[0], nyc[1], 8000],
  ambientRatio: 1.0,
  diffuseRatio: 1.0,
  specularRatio: 1.0,
  lightsStrength: [1.0, 1.0, 1.0, 1.0],
  numberOfLights: 2
}

const colorSchemes = {
  crimes: (d) => {
    const opacity = 255
    const idx = d[3]

    return {
      1: [0, 0, 255, opacity],
      2: [200, 0, 200, opacity],
      3: [255, 0, 0, opacity]
    }[idx]
  },
  trees: (d) => {
    return [100, d[3] * 200, 100, 255]
  },

  bikes: (d) => {
    return [100, d[3] * 200, 100, 255]
  },
  sidewalk_quality: (f) => {
    const val = words[f.properties.rating_word]
    return [val.r, val.g, val.b]
  }
}

const geoJson = (data, name) => {
  return new GeoJsonLayer({
    id: name,
    data: data[name],
    opacity: 0.8,
    stroked: true,
    filled: true,
    extruded: true,
    wireframe: true,
    fp64: true,
    // getFillColor: colorSchemes[name],
    // getLineColor: colorSchemes[name],
    getLineColor: [255, 255, 255],
    lightSettings: LIGHT_SETTINGS,
    lineWidthScale: 10
  })
}

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
]

const elevationScale = { min: 1, max: 50 }

const heatMap = (data, name) => {
  const radius = 100
  const upperPercentile = 90
  const coverage = 1

  const lightSettings = {
    lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
  }

  return new HexagonLayer({
    id: name,
    colorRange,
    coverage,
    data: data.heatmap,
    elevationRange: [0, 3000],
    elevationScale: 25,
    extruded: true,
    getPosition: d => { return [+d.Longitude, +d.Latitude] },
    lightSettings,
    opacity: 1,
    /* onHover: this.props.onHover,
         * pickable: Boolean(this.props.onHover), */
    radius,
    upperPercentile
  })
}

const done = (results) => {
  const data = {}
  data.heatmap = results[0]
  console.log(data)
  return data
}

const load = (url) => {
  return new Promise((resolve, reject) => {
    const fetch = (url.split('.')[1] == 'json' ? requestJSON : requestCSV)
    console.log(url)
    fetch(url)
      .on('load', resolve)
      .on('error', reject)
      .get()
  })
}
function loadData () {
  let complaints = [
  '311-Blocked-Driveway',
  '311-Street-Light-Condition',
  '311-UNSANITARY-CONDITION',
  '311-GENERAL-CONSTRUCTION',
  '311-Water-System',
  '311-HEAT-HOT-WATER',
  '311-HEATING',
  '311-Illegal-Parking',
  '311-Noise---Residential',
  '311-Noise---Street-Sidewalk',
  '311-PLUMBING',
  '311-Street-Condition'
  ]
  return Promise.all([
    load('data/311-Noise---Residential.csv'),
    // load('data/311-Noise---Residential.csv'),
    // load('data/311-PLUMBING.csv'),
    // load('data/311-GENERAL-CONSTRUCTION.csv')
  ])
    .then(done)
}

const processors = {
  buildings: (data) => {
    data.buildings = data.buildings
    // .map(d => [+ d.Longitude, + d.Latitude])
  },
  streetRatings: (data) => {

  },
  '311_requests': (data) => {
    data['311_requests'] = data['311_requests']
    console.log(data)
  // [  ('311-Blocked-Driveway'),
  //   ('311-Noise---Residential'),
  //   ('311-PLUMBING'),
  //   ('311-GENERAL-CONSTRUCTION')]
    // .map(d => [+ d.Longitude, + d.Latitude])
  }
}

const Layers = [
  ('311-Blocked-Driveway'),
  ('311-Noise---Residential'),
  ('311-PLUMBING'),
  ('311-GENERAL-CONSTRUCTION')
]

const LoadLayers = (data) => {
  return [
    heatMap(data, '311-Blocked-Driveway'),
    // heatMap(data, '311-Noise---Residential'),
    // heatMap(data, '311-PLUMBING'),
    // heatMap(data,'311-GENERAL-CONSTRUCTION')
  ]
}
LoadLayers.load = loadData
LoadLayers.layers = Layers
export default LoadLayers
