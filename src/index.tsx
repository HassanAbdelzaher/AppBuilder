import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as stores from './stores';
import * as themes from '@mas.eg/mas-themes/src';

import {Layout} from './containers/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import MapView from './views/MapView' it is better to use Router not built in
// Hash router and control the routing type from creating the history

injectTapEventPlugin();
let store = stores.store;
ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(themes.basic)}>
    <Router history={stores.history}>
      <Layout/>
    </Router >
  </MuiThemeProvider>
</Provider>, document.getElementById('root'));