import * as actions from '../actions/map';
import * as fActions from '../actions/floating-panel';
import * as tActions from '../actions/toastr';

import Map, { MapViewProps } from '../views/Map'

import { AppState } from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState, ownProps): MapViewProps => {
  return {
    zoom: state.map.zoom,
    center: state.map.center,
    devicesLocations: state.map.devicesLocations,
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
      tActions.showMessage("done")
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);