import * as React from 'react';

import {Layout} from '../containers/Layout'
import MapView from '../containers/MapView'

export const routes = [
  { path: '/',
    sidebar: () => <div>home!</div>,
    main:()=> <MapView/>,
    exact:true
  },
  { path: '/app',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <MapView/>,
    exact:false
  }
]