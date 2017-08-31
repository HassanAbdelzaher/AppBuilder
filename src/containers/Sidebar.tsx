import * as actions from '../actions/sidebar';
import * as mapAtions from '../actions/map';

import {AppState} from '../reducers';
import Sidebar from '../components/Sidebar'
import { connect } from 'react-redux';

const mapStateToProps = (state:AppState, ownProps) => {
  return {
    title:state.sidebar.title,
    isOpen:state.sidebar.isOpen,
    items:state.sidebar.items
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    open: () => {
      dispatch(actions.open())
    },
    close: () => {
      dispatch(actions.close())
    },
    toggle:()=>{
      dispatch(actions.toggle())
    },
    onClick:(clickedItem:string)=>{
      dispatch(actions.onClick(clickedItem) )
      dispatch(actions.close());
      dispatch(mapAtions.loadDevicesLocations())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);