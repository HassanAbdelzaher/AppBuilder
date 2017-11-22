import * as cActions from '../actions/connection-monitor'
import * as luActions from '../actions/lu';
import * as mActions from '../actions/map'
import * as pActions from '../actions/floating-panel'
import * as sActions from '../actions/settings';

import { Message, WebSocketHandler } from '@mas.eg/mas-sockets/src';

export default function (store,client:WebSocketHandler) {
    store.dispatch(cActions.create(client));
    store.dispatch(sActions.loadLocalSettings());
    store.dispatch(sActions.loadServerSettings());
    store.dispatch(luActions.loadLookup());
    initSocket(client,store.dispatch);
}

export function initSocket(client:WebSocketHandler,dispatch:(action)=>void){
    client.onConnect(() => {
        dispatch(cActions.connect());
        dispatch(luActions.loadLookup());        
    });
    client.onDisconnect(() => {
        dispatch(cActions.disConnect());
    });
    client.onReconnecting(() => {
        dispatch(cActions.reConnecting());
    });
    client.onReConnect(() => {
        console.log("reconnected");
    });
    client.onRecevieMessage((msg : Message) => {
        let message = msg
            ? msg.message
            : undefined;
        if (message) {
            if (typeof message == "string") 
                dispatch(pActions.setItems([
                    {
                        name: "",
                        value: message
                    }
                ]));
            else if (typeof message == "object") {
                let items = Object
                    .keys(message)
                    .map((k) => {                        
                        return {name: k, value: message[k]}
                    });
                dispatch(pActions.setItems(items));
            } else {
                dispatch(pActions.setItems([
                    {
                        name: "",
                        value: message
                    }
                ]));
            }
        }
        let mapMessage = msg
            ? msg.map
            : undefined;
        if (mapMessage) {
            dispatch(mActions.move(mapMessage.zoom, mapMessage.center))
        }
    });
}