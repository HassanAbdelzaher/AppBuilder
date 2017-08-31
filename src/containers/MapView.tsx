import * as actions from '../actions/map';

import Map,{MapViewProps} from '../components/Map'

import {AppState} from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state:AppState, ownProps):MapViewProps => {
  return {
    zoom:state.map.zoom,
    center:state.map.center,
    devicesLocations:state.map.devicesLocations
  }
}

/*
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    open: () => {
      dispatch(actions.open())
    },
    close: () => {
      dispatch(actions.close())
    },
    toogle:()=>{
        dispatch(actions.toggle())
    }
  }
}
*/
export default connect(mapStateToProps,null)(Map);