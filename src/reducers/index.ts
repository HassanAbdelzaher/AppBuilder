import ConnectionMonitor from './connection-monitor';
import {State as ConnectionMonitorState} from '../actions/connection-monitor';
import FloatinPanelReducer from './floating-panel';
import {State as FloatingPanelState} from '../actions/floating-panel';
import Header from './header';
import {State as HeaderState} from '../actions/header';
import Loading from './loading';
import {State as LoadingState} from '../actions/loading';
import Map from './map';
import {State as MapState} from '../actions/map';
import Settings from './settings';
import {State as SettingsState} from '../actions/settings';
import Sidebar from './sidebar';
import {State as SidebarState} from '../actions/sidebar';
import { combineReducers } from 'redux';

export default combineReducers({
    floatingPanel:FloatinPanelReducer,
    connectionMonitor:ConnectionMonitor,
    header:Header,
    sidebar:Sidebar,
    map:Map,
    settings:Settings,
    loading:Loading
})

export interface AppState{
    floatingPanel:FloatingPanelState   
    connectionMonitor:ConnectionMonitorState
    header:HeaderState,
    sidebar:SidebarState,
    map:MapState,
    settings:SettingsState,
    
    loading:LoadingState
}