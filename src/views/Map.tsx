import * as L from 'leaflet';
import * as React from 'react';

import {BaseLayer, CircleMarker, FeaturGroup, GeoJsonLayer, GoogleLayer, LayersControl, Map, Marker, MarkerClusterGroup, NewLineControl, Overlay, PolyLine, Popup, TileLayer} from '@mas.eg/mas-leaflet';

import {FloatingPanel} from '@mas.eg/mas-floating-panel';

var classes=require('./map-icons.css');

//to override build error the name of the file is case sensitive
export interface MapViewProps {
  onFeatureClick?: ({}) => void,
  zoom?: number,
  center?: {
    lat: number,
    lng: number
  },
  pipeInfo?:string|object,
  devicesLocations?: Array<
    {
      LAT: number,
      LNG: number
    }
  >,
  bounds?:[number,number][],
  onDeviceClick?:(evt)=>void,
  onPipeClick?:(info)=>void,
  
  readings?:Array<
  {
    LAT: number,
    LNG: number
  }
>
}

const readingIcon=L.divIcon({className:classes.reading});
const collectionIcon=L.divIcon({className:classes.collection})

export default class MapView extends React.Component < MapViewProps, {
  zoom : number
} > {
  //state: {}
  markers : React.ReactElement < Marker > []
  map:L.Map
  constructor(props) {
    super(props);
    this.handleGeoClick = this
      .handleGeoClick
      .bind(this);
    this.state = {
      zoom: this.props.zoom||13
    }
  }
  handleGeoClick(evt) {
    this
      .props
      .onFeatureClick(evt);
  }
    onkeypress(e){
      if(!this.map)
          return;
        if (e.keyCode == 49) { //no 1 make zoom in
          this.map.zoomIn()
        } else if (e.keyCode == 55) { // no 7 make zoom out
          this.map.zoomOut()
        } else if (e.keyCode == 50) {
          this.map.panBy([0, 100]); // no 2 handle up pan
        } else if (e.keyCode == 56) {
          this.map.panBy([0, -100]); // no 8 handle down pan
        } else if (e.keyCode == 54) {
          this.map.panBy([-100, 0]); // no 6 handle right pan
        } else if (e.keyCode == 52) {
          this.map.panBy([100, 0]); // no 4 handle left pan
        }
    }
  //  this.setState(function (prevState, props) {         return {           zoom:
  // this.state.zoom - 1         };       });
  componentDidMount() {    
    window.addEventListener("keypress",this.onkeypress.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("keypress",this.onkeypress);
  }
  bindMap(el) {
    if (el && el.leafletElement) 
      this.map = el.leafletElement
  }
  handleUpPanClick() {
    this.map.panBy([0, -100]);
  }
  handleRightPanClick() {
    this.map.panBy([100, 0]);
  }
  handleLeftPanClick() {
    this.map.panBy([-100, 0]);
  }
  handleDownPanClick() {
    this.map.panBy([0, 100]);
  }
  handlePipeClick(evt){
    this.props.onPipeClick(evt);
  }
  render() {
    const center = this.props.center || {
      lat: 29.355928713231339,
      lng: 30.805001088273251
      // -72.99132727730068,46.1774400905128 30.805001088273251, 29.355928713231339
      // fayoum
    }

    console.log('rendering map');

    const mapStyle = {
      width: '100%',
      height: '100%',
      minHeight: 200,
      minWidth: 200,
      display: 'block'
    }    
  
    const devices = (this.props.devicesLocations || ([]as[
      {
        LAT,
        LNG
      }
    ])).filter((device) => {
      if (device.LAT > 0 && device.LNG > 0) 
        return true;
      else 
        return false
    }).map((device,key) => {
      return <Marker onClick={()=>{
        if(this.props.onDeviceClick)
          this.props.onDeviceClick(device);
        }}  key={key} position={{
        lat: device.LAT,
        lng: device.LNG
      }} />
    });

    const readingsLocations = (this.props.readings || ([]as[
      {
        LAT,
        LNG
      }
    ])).filter((rdg) => {
      if (rdg.LAT > 0 && rdg.LNG > 0) 
        return true;
      else 
        return false
    }).map((rdg,key) => {
      return <Marker icon={readingIcon}  key={"c"+key} position={{
        lat: rdg.LAT,
        lng: rdg.LNG
      }} />
    });
  
   const mapBounds=this.props.bounds && this.props.bounds.length>0?L.latLngBounds(this.props.bounds):undefined;
    return <Map
      ref={this
      .bindMap
      .bind(this)}
      accurecyCircle={false}
      followLocation={false}
      maxZoom={18}
      style={mapStyle}
      center={center}
      bounds={mapBounds}
      zoom={this.state.zoom} useFlyTo={true} >
      <Marker position={center}/>
      <LayersControl position="topright">
        <BaseLayer checked={true} name="roadmap">
          <GoogleLayer maptype="ROADMAP"/>
        </BaseLayer>
        <BaseLayer name="roadmap">
          <GoogleLayer maptype="SATELLITE"/>
        </BaseLayer>
        <BaseLayer  name="hybrid">
          <GoogleLayer maptype="HYBRID"/>
        </BaseLayer>
        <Overlay key={"1"} checked={this.props.devicesLocations.length>0} name="اماكن الوحدات">
          <MarkerClusterGroup iconColor="blue" clusterName="U" key={"11"} options={{}}>
            {devices}
          </MarkerClusterGroup>
        </Overlay>
        <Overlay key={"2"} checked={readingsLocations.length>0} name="اماكن القراءات">
          <MarkerClusterGroup iconColor="green" clusterName="R" key={"21"} options={{}}>
            {readingsLocations}
          </MarkerClusterGroup>
        </Overlay>
        <Overlay checked={true} name="خطوط المياة الرئيسية">
          <GeoJsonLayer  path="./res/markazboundary.geojson" onClick={this.handlePipeClick.bind(this)} />
        </Overlay>
        
      </LayersControl>
    </Map>

  }
}