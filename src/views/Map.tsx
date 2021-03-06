import * as L from 'leaflet';
import * as React from 'react';

import {
  BaseLayer,
  Circle,
  CircleMarker,
  EditControl,
  FeaturGroup,
  GeoJsonLayer,
  GoogleLayer,
  LayersControl,
  Map,
  MapControl,
  Marker,
  MarkerClusterGroup,
  NewCircleControl,
  NewLineControl,
  NewMarkerControl,
  NewPolygonControl,
  NewRectangleControl,
  Overlay,
  PolyLine,
  Popup,
  TileLayer
} from '@mas.eg/mas-leaflet';

import {FloatingPanel} from '@mas.eg/mas-floating-panel';

var classes=require('./map-icons.css');

//to override build error the name of the file is case sensitive
export interface MapViewProps {
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
  >,
  bounds?:[number,number][],
  onPipeClick?: (properties,evt) => void,
  onDeviceClick?:(properties,evt)=>void,
  onStartDrawing?:()=>void,
  onEndDrawing?:(event)=>void,
  onContextmenu?:(latlng:L.LatLng,evt:L.LeafletMouseEvent)=>void,
 // layersSettings?:{"pipes":{maxZoom:number,minZoom:number,features:number,thread:number},}

  layersSettings?:Array<{layer:string,setting:{maxZoom:number,minZoom:number,maxCountOfFeatures:number,thread:number}}>
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
    this.state = {
      zoom: this.props.zoom||15
    }
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
  handlePipeClick(properties,evt){
    console.dir(evt);
    if(this.props.onPipeClick)
      this.props.onPipeClick(properties||{},evt||{});
  }
 
  Drawing(){
    if(this.props.onStartDrawing){
      this.props.onStartDrawing()
    }
    
  }
  endDrawing(event){
    if(this.props.onEndDrawing){
      this.props.onEndDrawing(event)
    }
    
  }
 render() {     
    const center = this.props.center || {
      lat: -72.99132727730068,
      lng: 46.1774400905128
      // -72.99132727730068,46.1774400905128 30.805001088273251, 29.355928713231339
      // fayoum
    }
    console.log('rendering map');
    const mapStyle = {
      width: '100%',
      height: '100%',
      minHeight: 200,
      minWidth: 200
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
      return <Marker onClick={(evt)=>{
        if(this.props.onDeviceClick)
          this.props.onDeviceClick(device,evt);
        }}  key={key} position={{
        lat: device.LAT,
        lng: device.LNG
      }} />
    });  
    console.log(this.props.layersSettings);
    
  
   const mapBounds=this.props.bounds && this.props.bounds.length>0?L.latLngBounds(this.props.bounds):undefined;
    return <Map editable={true}
      ref={this
      .bindMap
      .bind(this)}
      accurecyCircle={false}
      followLocation={false}
      enableKeyNavigation={true}
      maxZoom={20}
      style={mapStyle}
      center={center}  
      onContextmenu={(evt:L.LeafletMouseEvent)=>{
        console.dir(evt.latlng);
        if(this.props.onContextmenu){
          this.props.onContextmenu(evt.latlng,evt)
        }
      }}  
      zoom={this.state.zoom} useFlyTo={true} >
      <LayersControl position="topright">
      <BaseLayer checked={true} name="openstreet">
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      </BaseLayer>
        <BaseLayer  name="roadmap">
          <GoogleLayer maptype="ROADMAP"/>
        </BaseLayer>
        <BaseLayer name="roadmap">
          <GoogleLayer maptype="SATELLITE"/>
        </BaseLayer>
        <BaseLayer  name="hybrid">
          <GoogleLayer maptype="HYBRID"/>
        </BaseLayer> 
      </LayersControl>

      <NewPolygonControl    position={"topleft"}  title="create new Polygon"    html="▰" />
      <NewMarkerControl     position={"topleft"}  title="create new marker"     html="🖈" />
      <NewRectangleControl  position={"topleft"}  title="create new reactangle" html="⬛" />
      <NewLineControl       position={"topleft"}  title="create new line"       html="/\/" />
      <NewCircleControl     onStartDrawing={this.Drawing.bind(this)} onEndDrawing={this.endDrawing.bind(this)} position={"topleft"}  title="create new circle"  html="⬤" />    

      <GeoJsonLayer    {...this.props.layersSettings[3].setting}    path="./res/cityregions.geojson" onFeatureClick={this.handlePipeClick.bind(this)} /> 
      <GeoJsonLayer    {...this.props.layersSettings[0].setting}    path="./res/pipes.geojson" onFeatureClick={this.handlePipeClick.bind(this)} />
      <GeoJsonLayer    {...this.props.layersSettings[2].setting}    path="./res/valves.geojson" onFeatureClick={this.handlePipeClick.bind(this)} /> 
      <GeoJsonLayer    {...this.props.layersSettings[2].setting}    path="./res/airvalves.geojson" onFeatureClick={this.handlePipeClick.bind(this)} /> 
      <GeoJsonLayer     path="./res/markazboundary.geojson" /> 
    </Map>
//{...this.props.layersSettings["pipe"]}
  }
}
var styles:React.CSSProperties={
  legend:{
    color: 'black',
    position: 'fixed',
    top: '20%',
    right: '10px',
    width: 100,
    zIndex: 99999,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    border:'1px solid black',
    borderRadius: 5

  },
  icon:{
    display:'inline-block',
    width  :75  
  }
}