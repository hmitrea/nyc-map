import React, { useState, useEffect } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from 'deck.gl'
import _ from 'lodash'

import { LayerControls, MapStylePicker, HEXAGON_CONTROLS } from './components/controls'
import ListView from './components/list-view.js'
import Charts from './components/charts'
import LoadLayers from './layers/index'
import DelayedPointLayer from './layers/DelayedPointLayer'

const layers = LoadLayers.layers
require('./style.css')

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

const choice = layers[_.random(layers.length)]

const makePoints = () => {
  return {
    position: [-73.91922208269459, 40.72185277744134],
    hour: new Date().getUTCHours(),
    pickup: true
  }
}

function Root () {
  const [selection, setSelection] = useState('trees')

  const [data, setData] = useState({

    selectedIndex: choice,

    settings: Object.keys(HEXAGON_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: HEXAGON_CONTROLS[key].value
      })
    )
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await LoadLayers.load()
      console.log(result)

      setData(result)
    }
    fetchData()
  })

  const _onSelect = () => {}

  const _onHighlight = () => {}

  const _onStyleChange = (style) => {
    setData({ style })
  }
  const _onWebGLInitialize = (gl) => {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }

  const _onClick = (info) => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  }

  const _updateLayerSettings = (settings) => {
    setData({ settings })
  }

  const _selectLayer = (e) => {
    setSelection({ selectedIndex: e.target.id })
  }

  const selectedIndex = 'trees'
  const layers = LoadLayers(data)
    .filter(d => d.id === selectedIndex)

  return (
    <div>
      <ListView
        selectedIndex={selectedIndex}
        onClick={_selectLayer}
      />

      {false && (<LayerControls
        settings={this.state.settings}
        propTypes={HEXAGON_CONTROLS}
        onChange={settings => this._updateLayerSettings(settings)}
      />)}

      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers}>
        <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle='mapbox://styles/mapbox/dark-v9' />
      </DeckGL>

      <Charts
        all={data}
        highlight={_onHighlight}
        select={_onSelect}
      />
    </div>
  )
}

export default Root
