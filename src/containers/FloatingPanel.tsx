import * as React from 'react';
import * as actions from '../actions/floating-panel'

import {AppState} from '../reducers';
import {FloatingPanel,FloatingPanelProps} from '@mas.eg/mas-floating-panel'
import { connect } from 'react-redux'


const mapStateToProps = (state:AppState, ownProps:FloatingPanelProps):FloatingPanelProps => {
  return {
    isOpen:state.floatingPanel.status,
    items:state.floatingPanel.items,
    timeOut:state.floatingPanel.timeOut,
    title:state.floatingPanel.title
  }
}

const mapDispatchToProps = (dispatch, ownProps:FloatingPanelProps):FloatingPanelProps => {
  return {
    addItem: (item:actions.Item) => {
      dispatch(actions.addItem(item))
    },
    onClose:()=>{
      dispatch(actions.closePanel())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FloatingPanel);
