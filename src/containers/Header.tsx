import {Header} from '../components/header'

import {AppState} from '../reducers';
import { connect } from 'react-redux'

const mapStateToProps = (state:AppState, ownProps) => {
  return {
    title:state.header.title
  }
}

export default connect(mapStateToProps,null)(Header);