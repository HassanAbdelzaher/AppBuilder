import ConnectionMonitor from './connection-monitor';
import { State as ConnectionMonitorState } from '../actions/connection-monitor';
import FloatinPanelReducer from './floating-panel';
import { State as FloatingPanelState } from '../actions/floating-panel';
import Header from './header';
import { State as HeaderState } from '../actions/header';
import Map from './map';
import { State as MapState } from '../actions/map';
import Sidebar from './sidebar';
import { State as SidebarState } from '../actions/sidebar';
import { combineReducers } from 'redux';

var appReducers = combineReducers({
    floatingPanel: FloatinPanelReducer,
    connectionMonitor: ConnectionMonitor,
    header: Header,
    sidebar: Sidebar,
    map: Map
});
export const reducers = appReducers;
export interface AppState {
    floatingPanel: FloatingPanelState
    connectionMonitor: ConnectionMonitorState
    header: HeaderState,
    sidebar: SidebarState,
    map: MapState
}