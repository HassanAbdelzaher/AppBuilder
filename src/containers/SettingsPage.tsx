import * as cActions from '../actions/connection-monitor'
import * as sActions from '../actions/settings'

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
    onSubmit:(model:{server:string,port:number,namespace:string},reset,update)=>{
      dispatch(cActions.changeConnectionSettings({server:model.server,port:model.port,namespace:model.namespace}));
      dispatch(sActions.saveSettings(model));      
     return model;
   }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsForm);