import * as cActions from '../actions/connection-monitor'
import * as sActions from '../actions/settings'
import * as mAction  from '../actions/map'

import {SettingsForm, SettingsFormProps} from '../forms/settings'

import {AppState} from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state:AppState, ownProps):SettingsFormProps => {
  return {
    initModel:state.settings
  }
}

const mapDispatchToProps = (dispatch, ownProps:SettingsFormProps):SettingsFormProps => {
  return {
    onSubmit:(model:{server:string,port:number,namespace:string,timeOut:number,
      maxZoomP:number,minZoomP:number,featuresP:number,threadP:number,
      maxZoomV:number,minZoomV:number,featuresV:number,threadV:number,
      maxZoomS:number,minZoomS:number,featuresS:number,threadS:number,
      maxZoomBo:number,minZoomBo:number,featuresBo:number,threadBo:number },reset,update)=>{
      dispatch(cActions.changeConnectionSettings({server:model.server,port:model.port,namespace:model.namespace}));
      dispatch(sActions.saveSettings(model));
      dispatch(mAction.savingLayerSettings(model))      
     return model;
   }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsForm);