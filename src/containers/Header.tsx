import {Header, HeaderProps} from '../components/header'

import {AppState} from '../reducers';
import { connect } from 'react-redux';
import * as sActions from '../actions/sidebar';


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