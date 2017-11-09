import * as React from 'react';

import {Redirect, Route, Switch} from 'react-router-dom';

import MapView from '../containers/Map'
import NewComplaint from '../containers/NewComplaint'
import SettingsPage from '../containers/SettingsPage'

const NotFound=()=>{return <h1 style={{color:'red'}}>NOT FOUND</h1>}
export default ()=>{return (
  <Switch>
        <Route path="/" exact={true} component={MapView} />
        {/*<Route path="/MAP" component={MapView} />*/}
        <Route path="/settings" component={SettingsPage} />
        <Route path="/new" component={NewComplaint} />
        <Route path="/notfound" component={NotFound} />
        <Redirect path="/map" to="/" />
        <Redirect to="/notfound" />
  </Switch>)
}