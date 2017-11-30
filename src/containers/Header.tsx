import * as sActions from '../actions/sidebar';

import {Header, HeaderProps} from '../components/header'

import {AppState} from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state:AppState, ownProps:HeaderProps):HeaderProps => {
  return {
    title:state.header.title,
    version:state.header.version
  }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
  return{
    onSideBarToggle:()=>{
      console.log('fird');
      dispatch(sActions.toggle());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);