import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as actions from './actions/floating-panel'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as stores from './stores';

import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import { Layout } from './containers/Layout';
//import MapView from './views/MapView'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {routes} from './routes'
import * as themes from '@mas.eg/mas-themes/dist'

injectTapEventPlugin();
let store=stores.store;
ReactDOM.render(
  <Provider  store={store}>
    <Router >
    <MuiThemeProvider muiTheme={getMuiTheme(themes.basic)}>   
      <Layout>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.main}
            exact={false}
          />
        ))}
      </Layout>
    </MuiThemeProvider>
   </Router >
  </Provider >,
  document.getElementById('root')
);