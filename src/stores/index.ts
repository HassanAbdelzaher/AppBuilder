import * as hist from 'history';
import * as stores from '../stores';

import { applyMiddleware, createStore } from 'redux';

import { WebSocketHandler } from '@mas.eg/mas-sockets/src';
import init from './initialize'
import reducers from '../reducers';
import thunk from 'redux-thunk';

export const history=hist.createHashHistory();
let localSettings:{server:string,port:number,namespace:string}=JSON.parse(localStorage.getItem("settings")||"{}");
let url=(localSettings.server||"localhost")+":"+(localSettings.port||"1213")+"/"+(localSettings.namespace||"");
export const client = new WebSocketHandler(url);
export const store = createStore(reducers,applyMiddleware(thunk.withExtraArgument({client,api:{},history})));
init(store,client);