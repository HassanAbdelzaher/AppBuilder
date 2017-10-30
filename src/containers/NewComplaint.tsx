import * as lActions from '../actions/loading'
import * as mAction  from '../actions/map'
import * as nActions from '../actions/new-complaint';

import {NewComplaintForm, NewComplaintFormProps} from '../forms/NewComplaint'

import {AppState} from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state:AppState, ownProps):NewComplaintFormProps => {
  return {
    initModel:state.newComplaint.model,
    busy:state.newComplaint.busy,
    error:state.newComplaint.error
  }
}

const mapDispatchToProps = (dispatch, ownProps:NewComplaintFormProps):NewComplaintFormProps => {
  return {
    onSubmit:(model:nActions.Model,reset,update)=>{
     dispatch(nActions.saveComplaint(model));
     return model;
   }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewComplaintForm);