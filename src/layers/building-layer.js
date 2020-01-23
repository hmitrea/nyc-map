import {GeoJsonLayer} from 'deck.gl';

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
        getFillColor: colorSchemes[name],
        getLineColor: colorSchemes[name],
        lightSettings: LIGHT_SETTINGS,
        lineWidthScale: 10,
    });
}
