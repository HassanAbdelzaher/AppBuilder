import * as React from 'react';
import * as luActions from '../../actions/lu';
import * as sAction from '../../actions/sidebar'
import {Menu, Segment, Sidebar} from 'semantic-ui-react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer, toast} from '@mas.eg/mas-toastr';

import ConnectionMonitor from '../ConnectionMonitor';
import FloatingPanel from '../FloatingPanel'
import {Footer} from '../../components/Footer/index'
import Header from '../Header'
import Loading from '../loading'
import M_Toolbar from '../../components/Toolbar'
import Routes from '../../routes';
import SettingsView from '../SettingsPage';
import SideBar from '../sidebar';

//toast("welcom","error");
export class Layout extends React.Component < any,
any > {
  constructor(props) {
    super(props);
    let height = window.innerHeight - 81;
    this.state = {};
    this.onWindowResized = this
      .onWindowResized
      .bind(this);
  }
  renderHeader() {
    return <Menu
      style={{
      width: '100%'
    }}
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"/>
  }
  componentDidMount() {
    window.onresize = this.onWindowResized;
    //LOADING application lookups
  }
  private onWindowResized(event : UIEvent) : void
  {
    let height = window.innerHeight - 81;
    this.setState({height})
  }
 
  render() {
    const children = React
      .Children
      .map(this.props.children, child => {
        return child
          ? React.cloneElement(child as React.ReactElement < any >, {})
          : null
      });
    return <Sidebar.Pushable>
      {< SideBar  />}
      <Sidebar.Pusher
        style={{
        width: '100%',
        background: 'red',
        height: '100%',
        scroll: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <Segment 
          style={{
          padding:0,
          margin: 0,
          width: '100%',
          flexGrow: 1000,
          overflow:'auto',
          height:'100%'        
        }}
          attached
          >
          <Routes/>
          <FloatingPanel style={{
            height: '100%'
          }}/>
        </Segment>
        <ConnectionMonitor/>
        <Loading /> {/* <ToastContainer
          position="bottom-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        /> */}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  }
}
