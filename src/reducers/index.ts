import ConnectionMonitor from './connection-monitor';
import {State as ConnectionMonitorState} from '../actions/connection-monitor';
import FloatinPanelReducer from './floating-panel';
import {State as FloatingPanelState} from '../actions/floating-panel';
import Header from './header';
import {State as HeaderState} from '../actions/header';
import Loading from './loading';
import {State as LoadingState} from '../actions/loading';
import Lu from './lu';
import {State as LuState} from '../actions/lu';
import Map from './map';
import {State as MapState} from '../actions/map';
import NewComplaint from './new-complaint';
import {State as NewComplaintState} from '../actions/new-complaint';
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
    loading:Loading,
    newComplaint:NewComplaint,
    lu:Lu
})

export interface AppState{
    floatingPanel:FloatingPanelState   
    connectionMonitor:ConnectionMonitorState
    header:HeaderState,
    sidebar:SidebarState,
    map:MapState,
    settings:SettingsState,    
    loading:LoadingState,
    newComplaint:NewComplaintState,
    lu:LuState
}