import * as actions from '../actions/sidebar';
import * as mapAtions from '../actions/map';

import {AppState} from '../reducers';
import * as sidebar from '../components/Sidebar'
import { connect } from 'react-redux';

const mapStateToProps = (state:AppState, ownProps:sidebar.SideProps):sidebar.SideProps => {
  return {
    title:state.sidebar.title,
    isOpen:state.sidebar.isOpen,
    items:state.sidebar.items
  }
}


const mapDispatchToProps = (dispatch, ownProps:sidebar.SideProps):sidebar.SideProps => {
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
      if(clickedItem==sidebar.HHU_LOCATIONS)
        dispatch(mapAtions.loadDevicesLocations());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(sidebar.Sidebar);