import * as React from 'react';

import {ConnectionMonitor, ConnectionMonitorProps} from '../components/ConnectionMonitor';

import {AppState} from '../reducers';
import { connect } from 'react-redux'

const mapStateToProps = (state:AppState, ownProps:ConnectionMonitorProps):ConnectionMonitorProps => {
  return {
    ConnState:state.connectionMonitor.status/*,
    url:state.settings.server+":"+state.settings.port+"/"+state.settings.namespace*/
  }
}

export default connect(mapStateToProps,null)(ConnectionMonitor);