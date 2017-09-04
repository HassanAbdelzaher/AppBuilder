import * as cActions from '../actions/connection-monitor'
import * as mActions from '../actions/map'
import * as pActions from '../actions/floating-panel'
import * as sActions from '../actions/settings'

import { Message, WebSocketHandler } from '@mas.eg/mas-sockets/src';

export default function (store,client:WebSocketHandler) {
    store.dispatch(cActions.create(client));
    store.dispatch(sActions.loadLocalSettings());
    store.dispatch(sActions.loadServerSettings())
    client.onConnect(() => {
        store.dispatch(cActions.connect());
    });
    client.onDisconnect(() => {
        store.dispatch(cActions.disConnect());
    });
    client.onReconnecting(() => {
        store.dispatch(cActions.reConnecting());
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
                store.dispatch(pActions.setItems([
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
                store.dispatch(pActions.setItems(items));

            } else {
                store.dispatch(pActions.setItems([
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
            store.dispatch(mActions.move(mapMessage.zoom, mapMessage.center))
        }
    });

}