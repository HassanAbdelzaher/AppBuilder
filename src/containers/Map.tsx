import * as L from 'leaflet'
import * as actions from '../actions/map';
import * as compActions from '../actions/new-complaint';
import * as fActions from '../actions/floating-panel';
import * as rout from '../actions/routing';
import * as tActions from '../actions/toastr';

import Map, { MapViewProps } from '../views/Map'

import { AppState } from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState, ownProps): MapViewProps => {
  return {
    zoom: state.map.zoom,
    center: state.map.center,
    devicesLocations: state.map.devicesLocations,
    layersSettings:state.map.layersSettings,
    /*bounds: state.map.bounds,
    readings:state.map.readings*/
  }
  
}


const mapDispatchToProps = (dispatch, ownProps) : MapViewProps=> {
  return {
    onDeviceClick:(device)=>{      
      //dispatch(actions.getDeviceInfo(device.DEVICE_ID))
    },
    onPipeClick:(pipe)=>{
      dispatch(fActions.setMessage(pipe));
      dispatch(tActions.showMessage("done"));
    }
    ,
    onContextmenu:(latlang:L.LatLng,evt:L.LeafletMouseEvent)=>{
      console.log(latlang);
      dispatch(compActions.updateInitModelLocation(latlang)); 
      setTimeout(()=>{
        dispatch(rout.routTo("new"));        
      },1)     
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);