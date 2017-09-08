import Loading,{LoadingPropTypes, LoadingType} from '@mas.eg/mas-loading/src'

import {AppState} from '../reducers';
import { connect } from 'react-redux'

const mapStateToProps = (state:AppState, ownProps):LoadingPropTypes => {
  return {
    title:'loading...',
    show:false,
    color:'white',
    type:LoadingType.bars
  }
}

export default connect(mapStateToProps,null)(Loading);