import * as d3 from 'd3'
import GL from '@luma.gl/constants'

import { ScatterplotLayer, GeoJsonLayer, LineLayer, HexagonLayer } from 'deck.gl'
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

import { csv as requestCSV, json as requestJSON } from 'd3-request'
import {h3ToGeo} from "h3-js";

const nyc = [-73.91922208269459, 40.72185277744134]
import {H3HexagonLayer} from '@deck.gl/geo-layers';

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

//   const layer = new HeatmapLayer({
//   id: 'heatmapLayer',
//   data:  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json',
//   radiusPixels: 10,
//   threshold: 0,
//   getPosition: d =>   [d[0], d[1]],
//   getWeight: d => 100,
// opacity: 1
// });
// return layer
  return new H3HexagonLayer({
    id: 'h3-hexagon-layer' + 123,
    data: dat,
    elevationScale: 20,
    opacity: 0.8,
    stroked: true,
    filled: true,
    extruded: true,
    wireframe: true,
    fp64: true,
    getHexagon: d => (d.hex9),
    getFillColor: d => [255, (1 - parseFloat(d.cnt) / 500) * 255, 0],
    getElevation: d => parseFloat(d.cnt)
  });
}

const done = (results) => {
  const data = {}
  data.heatmap = results[0]
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

  window.x = [
    heatMap(data, '311-Blocked-Driveway'),
    // heatMap(data, '311-Noise---Residential'),
    // heatMap(data, '311-PLUMBING'),
    // heatMap(data,'311-GENERAL-CONSTRUCTION')
  ]
  return window.x
}
LoadLayers.load = loadData
LoadLayers.layers = Layers
export default LoadLayers
