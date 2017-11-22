import * as React from 'react';
import * as actions from '../actions/floating-panel'

import {FloatingPanel, FloatingPanelProps} from '@mas.eg/mas-floating-panel'

import {AppState} from '../reducers';
import { connect } from 'react-redux'

const mapStateToProps = (state:AppState, ownProps:FloatingPanelProps):FloatingPanelProps => {
  let imageList=[];
  let items=state.floatingPanel.items.filter((itm:any)=>{
    if(itm.name=='imageList'||itm.name=="ImageList"){
      itm.value.map((imagePath)=>{
        imageList.push(<img src={imagePath}/>) 
      })
      return false;
    }
    else
    return true;
  });
  return {
    isOpen:state.floatingPanel.status,
    items:state.floatingPanel.items,
    /*timeout:state.floatingPanel.timeout,*/
    title:state.floatingPanel.title,
    imageList
    /*actions:state.floatingPanel.actions||[]*/
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
