import * as Axios from 'axios';
import * as PropTypes from 'prop-types'
import * as React from 'react';
import * as geojson from './models/GeoJson'
import * as leaflet from 'leaflet';
import * as mapTools from './tools/map';

import {ChildrenType, LayerContainerType} from './types'

import {AbstractLayerGroup} from './LayerGroup'
import CircleMarker from './CircleMarker'
import FeatureGroup from './FeatureGroup'
import {Pipe} from './models/Pipe'
import PolyLine from './PolyLine'
import {delay} from './tools/delay';
import {featureGroup,geoJSON,GeoJSON} from 'leaflet';

//import * as actions from '../../om/tv/actions/map';
const axios = Axios.default;
export interface GeojsonLayerProps {
  type?    : 'point' | 'line' | 'polygon',
  onClick?:Function,
  checked?:boolean,
  path:string
}

export type AcceptedTypes = leaflet.Polyline | leaflet.Polygon | leaflet.CircleMarker | leaflet.Marker;

export interface GeoJsonLayerFeatur {
  layer : AcceptedTypes,
  isOn : boolean, //curren state
  willBeOn : boolean,
  willBeOff : boolean,
  id?: number
}

export interface OnFeatureClickProps{
  event?:leaflet.LeafletEvent,
  attributes?:[{name:string,value:any}]|{},
  layer?:leaflet.Layer
}
export default class GeoJsonLayer extends AbstractLayerGroup < GeojsonLayerProps,leaflet.GeoJSON > {
  features : Array < GeoJsonLayerFeatur >= [];
  isInReDrawMode : boolean = false;
  cancelCurrentReDraw : boolean = false;
  onClick:(evt:OnFeatureClickProps)=>{};
  reDrawCycle : {
    task: Promise < void >,
    id: number
  };
  isCancelling : boolean = false;
  tasksCount : number = 0;
  constructor(props : GeojsonLayerProps, context) {
    super(props, context);
    /*this.state = {
      features: []
    }*/
    this.load = this
      .load
      .bind(this);
    this.onMapMoveStart = this
      .onMapMoveStart
      .bind(this);
    this.onMapMoveEnd = this
      .onMapMoveEnd
      .bind(this);
    /*this.checkVisiblity = this
      .checkVisiblity
      .bind(this);*/
    if(props.onClick)
      this.onClick=props.onClick.bind(this);
    else
      this.onClick=null;
  }

  componentDidMount() {
    super.componentDidMount()
    //this.setStyle(this.props)
    setTimeout(()=>{
      this.load();
    },1000)
    const map : leaflet.Map = this.context.map;
    map.on('movestart', this.onMapMoveStart);
    map.on('moveend', this.onMapMoveEnd);    
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    const map : leaflet.Map = this.context.map;
    map.off('moveend', this.onMapMoveEnd);
    console.log('unmount geojson')
  }

  createLeafletElement(props : GeojsonLayerProps) : leaflet.GeoJSON {
    return geoJSON();
  }

  onEachFeature(feature, layer:any) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
  }
  
  filter(feature:any):boolean {
    return feature.properties.show_on_map;
  }

  async load() {
    try {
      var options : Axios.AxiosRequestConfig = {};
      let data = await axios.get(this.props.path);
      let features = data.data.features;
      console.log("adding features")
      this.leafletElement.addData(features);
      const map : leaflet.Map = this.context.map;  
      let bnds=this.leafletElement.getBounds();
      map.flyToBounds(bnds);
    } catch (ex) {
      console.dir(ex);
      console.error("can not load pipes") ;
         
      //
    }
  }

  onMapMoveEnd() {
    const map : leaflet.Map = this.context.map;      
    if(map){
      map.addLayer(this.leafletElement);
    }
  }

  onMapMoveStart(){
    const map : leaflet.Map = this.context.map;      
    if(map){
      map.removeLayer(this.leafletElement);
    }
  }
}
