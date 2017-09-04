import * as actions from '../actions/connection-monitor'

import { CONNECTION_STATUS } from '../components/ConnectionMonitor'

const connectionMonitor = (state: actions.State = { status: CONNECTION_STATUS.NOTHING, clinet: null }, action): actions.State => {
    switch (action.type) {
        case actions.CONNECTION_CREATED:
            return {
                ...state, clinet: action.client
            };
        case actions.CONNECT:
            return {
                ...state, status: CONNECTION_STATUS.CONNECTED
            };
        case actions.DISCONNECT:
            return { ...state, status: CONNECTION_STATUS.DISCONNECTED };
        case actions.RECONNECTING:
            return {
                ...state, status: CONNECTION_STATUS.CONNECTING
            };
        case actions.CONNECTION_ERROR:
            return {
                ...state, status: CONNECTION_STATUS.CONNECTION_FAILED
            };
        default:
            return state
    }
}

export default connectionMonitor;