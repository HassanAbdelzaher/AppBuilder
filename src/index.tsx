import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as stores from './stores';

import {Layout} from './containers/Layout';
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom';

require('!style-loader!css-loader!@mas.eg/mas-forms-semantic-ui/css/semantic-rtl.css');
let store = stores.store;
ReactDOM.render(
  <Provider store={store}>
    <Router history={stores.history}>
      <Layout/>
    </Router >
</Provider>, document.getElementById('root'));