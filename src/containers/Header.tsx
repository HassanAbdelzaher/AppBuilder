import {Header, HeaderProps} from '../components/header'

import {AppState} from '../reducers';
import { connect } from 'react-redux'

const mapStateToProps = (state:AppState, ownProps:HeaderProps):HeaderProps => {
  return {
    title:state.header.title,
    version:state.header.version
  }
}

export default connect(mapStateToProps,null)(Header);