import * as d3 from 'd3'
import GL from '@luma.gl/constants';

import {ScatterplotLayer, GeoJsonLayer, LineLayer, HexagonLayer} from 'deck.gl';

let nyc = [-73.91922208269459, 40.72185277744134]

let words = {
    'GOOD': d3.rgb('pink'),
    'FAIR': d3.rgb('purple'),
    'BAD': d3.rgb('red'),
    'POOR': d3.rgb('blue'),
    'NR': d3.rgb('white')
}
const LIGHT_SETTINGS = {
    lightsPosition: [nyc[0], nyc[1], 5000, nyc[0], nyc[1], 8000],
    ambientRatio: 1.,
    diffuseRatio: 1.,
    specularRatio: 1.,
    lightsStrength: [1.0, 1.0, 1.0, 1.0],
    numberOfLights: 2
};

let colorSchemes = {
    crimes: (d) => {
        let opacity = 255,
            idx = d[3]

        return {
            1:[0, 0, 255 , opacity],
            2:[200, 0, 200, opacity],
            3:[255, 0, 0, opacity]
        }[idx]
    },
    trees: (d) => {
        return [100, d[3] * 200, 100, 255]
    },

    bikes: (d) => {
        return [100, d[3] * 200, 100, 255]
    },
    sidewalk_quality: (f) => {
        let val = words[f.properties.rating_word]
        return [val.r, val.g, val.b]
    }
}


let geoJson = (data, name) => {
    return new GeoJsonLayer({
        id: name,
        data: data[name],
        opacity: 0.8,
        stroked: true,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: true,
        //getFillColor: colorSchemes[name],
        //getLineColor: colorSchemes[name],
        getLineColor: [255,255,255],
        lightSettings: LIGHT_SETTINGS,
        lineWidthScale: 10,
    });
}




const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];

const elevationScale = {min: 1, max: 50};

let heatMap = (data, name) => {
    let radius = 100,
        upperPercentile = 90,
        coverage = 1

    const lightSettings = {
        lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
        ambientRatio: 0.4,
        diffuseRatio: 0.6,
        specularRatio: 0.2,
        lightsStrength: [0.8, 0.0, 0.8, 0.0],
        numberOfLights: 2
    };

    return new HexagonLayer({
        id: name,
       colorRange,
        coverage,
        data: data[name],
        elevationRange: [0, 3000],
        elevationScale: 25,
        extruded: true,
        getPosition: d => { return [+d.Longitude, +d.Latitude]},
        lightSettings,
        opacity: 1,
        /* onHover: this.props.onHover,
         * pickable: Boolean(this.props.onHover),*/
        radius,
        upperPercentile
    })
}


let scatter = (data, name) => {
    return new ScatterplotLayer({
        id: name,
        getPosition: (d) => d,
        getColor: colorSchemes[name],
        radiusScale: 5,
        getRadius: d => 5,
        data: data[name],
        outline: false,
        parameters: {
  // prevent flicker from z-fighting
  [GL.DEPTH_TEST]: false,

  // turn on additive blending to make them look more glowy
  [GL.BLEND]: true,
  [GL.BLEND_SRC_RGB]: GL.ONE,
  [GL.BLEND_DST_RGB]: GL.ONE,
  [GL.BLEND_EQUATION]: GL.FUNC_ADD,
},
        /* pickable: true,
         * onHover: info => console.log('Hovered:', info),
         * onClick: info => console.log('Clicked:', info)*/
    })
}

let lines = (data) => {
    return new LineLayer({
        id: 'flight-paths',
        data: data,
        strokeWidth: 1    ,
        fp64: false,
        getSourcePosition: d => d[0],
        getTargetPosition: d => d[1],
        getColor: () => [255,0,0,100]
    })
}




import {csv as requestCSV} from 'd3-request';
import {json as requestJSON} from 'd3-request';

// Set your mapbox token here
let done = (results) => {
  let data = {}

    data.trees = results[0]
    data.crimes = results[1]
    data.sidewalk_quality = results[2]
    data['311_requests'] = results[3];
    //data['buildings'] = result[4]

    processors.trees(data)
    processors.crimes(data)
    processors.streetRatings(data)
    processors['311_requests'](data)
    //processors['buildings'](data)


    return data
}

let load = (url) => {
  return new Promise((resolve, reject) => {
    let fetch = (url.split('.')[1] == 'json' ? requestJSON : requestCSV)

    fetch(url)
      .on('load', resolve)
      .on('error', reject)
      .get();
  });
}
function loadData() {
    return Promise.all([
        load('data/trees/trees.csv'),
        load('data/crimes/crimes.csv'),
        load('data/sidewalk_quality/sidewalk_quality.json'),
        load('data/311_requests/1m.csv'),
        //load('data/Building Footprints.geojson')
    ])
    .then(done);
}


let processors = {
  'buildings': (data) => {
      data['buildings'] = data['buildings']
      //.map(d => [+ d.Longitude, + d.Latitude])
  },
    streetRatings: (data)=> {

    },
    '311_requests': (data) => {
        data['311_requests'] = data['311_requests']
        //.map(d => [+ d.Longitude, + d.Latitude])
    },
  trees: (data) => {
    var cat = {
      Good: 1,
      Fair: 2,
      Poor: 3
    }

    data.trees = data.trees.map((d) => [(+ d.longitude),
                                        (+ d.latitude),
                                        0,
                                        cat[d.health]
    ]
    );
  },
  crimes: (data) => {
    var cat = {
      MISDEMEANOR: 1,
      VIOLATION: 2,
      FELONY: 3
    }
    data.crimes = data.crimes.map((d) => [(+ d.Longitude),
                                (+ d.Latitude),
                                0,
                                cat[d.LAW_CAT_CD]
                               ]
                       );
  },
  bike_stations: (results) => {
    let beanList = results[0].bike_stations
    let stations = {}
    for (let bean of beanList) stations[bean.id] = bean

    result.bike_stations = stations
  },
  bike_trips: (results) => {
    let shadow= [ 40.75668720603179, -73.98257732391357 ]

    let trips = results.bike_trips.map((row, n) => {
      let source = results.stations[row['start station id']],
          target = resultsstations[row['end station id']]

      return [
        [source ? source.longitude : shadow[1],
         source ? source.latitude : shadow[0]
        ],
        [target ? target.longitude : shadow[1],
         target ? target.latitude : shadow[0]
        ]
      ]
    })


    data.bike_trips = trips
  }
}

const Layers = [
    'trees',
    'crimes',
    'sidewalk_quality',
    '311_requests',
    'buildings'
]

let LoadLayers = (data) =>{

  return [
        scatter(data, 'trees'),
        scatter(data, 'crimes'),
        geoJson(data, 'sidewalk_quality'),
        heatMap(data, '311_requests'),
        geoJson(data, 'buildings')
      ]
}
LoadLayers.load = loadData;
LoadLayers.layers = Layers;
export default LoadLayers;
