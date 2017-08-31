import * as React from 'react';

import {BaseLayer, LayersControl, Overlay} from '@mas.eg/mas-leaflet/src';

import {CircleMarker} from '@mas.eg/mas-leaflet/dist';
import {FeatureGroup} from '@mas.eg/mas-leaflet/src/FeatureGroup';
//import FloatingPanel from '../containers/FloatingPanel';
import {GeoJsonLayer} from '@mas.eg/mas-leaflet/dist';
import {GoogleLayer} from '@mas.eg/mas-leaflet/dist';
import {Map} from '@mas.eg/mas-leaflet/dist'
import {Marker} from '@mas.eg/mas-leaflet/dist';
import {MarkerClusterGroup} from '@mas.eg/mas-leaflet/dist';
import {NewLineControl} from '@mas.eg/mas-leaflet/dist';
import {PolyLine} from '@mas.eg/mas-leaflet/dist';
import {Popup} from '@mas.eg/mas-leaflet/dist';
import {TileLayer} from '@mas.eg/mas-leaflet/dist';
import {VectorGridLayer} from '@mas.eg/mas-leaflet/dist';

//to override build error the name of the file is case sensitive
export interface MapViewProps {
  onFeatureClick?: ({}) => void,
  zoom?: number,
  center?: {
    lat: number,
    lng: number
  },
  devicesLocations?: Array<
    {
      LAT: number,
      LNG: number
    }
  >
}


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
    console.dir({evt});
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
    window.onkeypress(this.onkeypress.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("onkeypress",this.onkeypress);
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

  render() {
    const center = this.props.center || {
      lat: 29.355928713231339,
      lng: 30.805001088273251
      // -72.99132727730068,46.1774400905128 30.805001088273251, 29.355928713231339
      // fayoum
    }

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
    }).map((device) => {
      return <Marker position={{
        lat: device.LAT,
        lng: device.LNG
      }}/>
    })
    if(devices.length>0){
      this.markers=this.markers||[];
      this.markers.push(<Marker position={center} />);
      if(this.markers.length==0)
      setTimeout(()=>{this.setState({})},1)
    }
    return <Map
      ref={this
      .bindMap
      .bind(this)}
      accurecyCircle={false}
      followLocation={false}
      maxZoom={18}
      style={mapStyle}
      center={center}
      zoom={this.state.zoom}>
      <Marker position={center}/>
      <LayersControl position="topright">
        <BaseLayer name="roadmap">
          <GoogleLayer maptype="ROADMAP"/>
        </BaseLayer>
        <BaseLayer name="roadmap">
          <GoogleLayer maptype="SATELLITE"/>
        </BaseLayer>
        <BaseLayer checked={true} name="hybrid">
          <GoogleLayer maptype="HYBRID"/>
        </BaseLayer>
        <Overlay checked={this.props.devicesLocations.length>0} name="اماكن الوحدات">
          <MarkerClusterGroup options={{}}>
            {devices}
          </MarkerClusterGroup>
        </Overlay>
      </LayersControl>
    </Map>

  }
}