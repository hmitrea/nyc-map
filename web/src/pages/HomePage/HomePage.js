import React, { useState, useEffect } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from 'deck.gl'
import _ from 'lodash'
import {GeoJsonLayer} from '@deck.gl/layers';
import * as d3 from 'd3'

import { LayerControls, MapStylePicker, HEXAGON_CONTROLS } from 'src/components/controls'
import ListView from 'src/components/list-view.js'
import {H3HexagonLayer} from '@deck.gl/geo-layers';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import styled from 'styled-components'

// require('./style.css')

const INITIAL_VIEW_STATE = {
  longitude: -73.91922208269459,
  latitude: 40.72185277744134,
  zoom: 11.502812637593744,
  pitch: 0,
  bearing: 0,
  width: 960,
  height: 500
}

// Set your mapbox token here
const MAPBOX_TOKEN = // process.env.MapboxAccessToken; // eslint-disable-line
'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'


function Root () {
  let [showBuildings, setShowBuildings] = useState(false)

  const [selection, setSelection] = useState('Noise---Residential')

  const _onWebGLInitialize = (gl) => {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }

  const _updateLayerSettings = (settings) => {
    setData({ settings })
  }

  const _selectLayer = (e) => {
    setSelection( e.target.id )
    console.log( e.target.id )
  }

  let colorHexagon =(d) => {
    let rgb = d3.rgb(d3.interpolateMagma((d[1]+50) / 500))

    return [rgb.r, rgb.g, rgb.b]
  }

  let layers = [new H3HexagonLayer({
      id: 'h3-hexagon-layer' + 123,
      data: `https://raw.githubusercontent.com/adnan-wahab/nyc-map/master/data/${selection}.json`,

      elevationScale: 20,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: false,
      fp64: true,
      getHexagon: d => d[0],
      getFillColor: colorHexagon,
      elevationScale: 1,
      getElevation: d => d[1]
    })]


      const lightSettings = {
        lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
        ambientRatio: 0.4,
        diffuseRatio: 0.6,
        specularRatio: 0.2,
        lightsStrength: [0.8, 0.0, 0.8, 0.0],
        numberOfLights: 2
      }
      const COLOR_SCALE = [
         // negative
         [65, 182, 196],
         [127, 205, 187],
         [199, 233, 180],
         [237, 248, 177],

         // positive
         [255, 255, 204],
         [255, 237, 160],
         [254, 217, 118],
         [254, 178, 76],
         [253, 141, 60],
         [252, 78, 42],
         [227, 26, 28],
         [189, 0, 38],
         [128, 0, 38]
       ];

       let colorScale = x => {
         const i = Math.round(x * 7) + 4;
         if (x < 0) {
           return COLOR_SCALE[i] || COLOR_SCALE[0];
         }
         return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
       };
     layers.push(
       new GeoJsonLayer({
        id: 'name',
        data:  `https://raw.githubusercontent.com/adnan-wahab/nyc-map/master/adnan-no-fields.json`,
        opacity: 0.8,
        stroked: true,
        filled: true,
        extruded: true,
        getElevation: f => Math.random() * 100,
        getFillColor:  f => colorScale(Math.random()),
        getLineColor:  [255, 0, (1 - 1 / 500) * 255],
        lightSettings: lightSettings,
        lineWidthScale: 10,
        visible: showBuildings
      }))

      let Legend = styled.section`
      display: fixed;
      `;

  return (
    <div>
      <ListView
      showBuildings={setShowBuildings}
        selectedIndex={selection}
        onClick={_selectLayer}
        showBuildings={setShowBuildings}
      />

      {false && (<LayerControls
        settings={this.state.settings}
        propTypes={HEXAGON_CONTROLS}
        onChange={settings => this._updateLayerSettings(settings)}
      />)}

      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={[layers]}>
        <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle='mapbox://styles/mapbox/dark-v9' />
      </DeckGL>

      <Legend>
      </Legend>

    </div>
  )
}

export default Root
