import { OpenLayers } from 'ol';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import proj4 from 'proj4';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { getCenter } from 'ol/extent';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';

proj4.defs(
  'EPSG:4326',
  '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'
);

// proj4.defs(
//   'EPSG:27700',
//   '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
//     '+x_0=400000 +y_0=-100000 +ellps=airy ' +
//     '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
//     '+units=m +no_defs'
// );

register(proj4);

const center_pos = [48.455, 12.392];
const imageExtent = [47.267, 14.173, 49.626, 10.613];
// const imageExtent = [0, 0, 700000, 1300000];
//const imageExtent = [0, 0, 17000, ];

const imageLayer = new ImageLayer();

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    imageLayer,
  ],
  target: 'map',
  view: new View({
    center: transform(center_pos, 'EPSG:4326', 'EPSG:3857'),
    zoom: 4,
  }),
});

const interpolate = document.getElementById('interpolate');

//map.addLayer(imageLayer);

function setSource() {
  const source = new Static({
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/' +
      'British_National_Grid.svg/2000px-British_National_Grid.svg.png',
    crossOrigin: '',
    projection: 'EPSG:4326',
    imageExtent: imageExtent,
    interpolate: interpolate.checked,
  });
  imageLayer.setSource(source);
}
setSource();

interpolate.addEventListener('change', setSource);
