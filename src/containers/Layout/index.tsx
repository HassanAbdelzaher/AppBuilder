import * as React from 'react';

import {Redirect, Route, Switch} from 'react-router-dom';
import { ToastContainer, toast } from '@mas.eg/mas-toastr';

import {AppBar} from 'material-ui';
import ConnectionMonitor from '../ConnectionMonitor';
import FloatingPanel from '../FloatingPanel'
import {Footer} from '../../components/Footer/index'
import Header from '../Header'
import Loading from '../loading'
import M_Toolbar from '../../components/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from '../../routes';
import SettingsView from '../SettingsPage';
import SideBar from '../sidebar'

toast("welcom","error");
export class Layout extends React.Component<any, any> {
  constructor() {
    super();
    let height=window.innerHeight-81;    
    this.state = { };    
    this.onWindowResized=this.onWindowResized.bind(this);
  }
  renderHeader(){
    return <AppBar style={{width:'100%'}}
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  }
  componentDidMount(){
      window.onresize = this.onWindowResized;
  }
  private onWindowResized (event:UIEvent):void
  {
      let height=window.innerHeight-81;    
      this.setState({height})
  }

  
  layoutStyle:React.CSSProperties={
    padding:0,
    margin:0,
    position:'absolute',
    height:'100%',
    width:'100%',
    minHeight:'10px',
    display:'flex',
    flexDirection:'column',
    overflow:'hidden',
    alignItems:'stretch',
    alignContent:'stretch'
  }
  contentStyle:React.CSSProperties={
    padding:0,
    margin:0,
    width:'100%',
    alignSelf:'stretch',
    flexGrow:1000,
    position:'relative',
    height:'100%',
    overflow:'hidden'/*, this kill google maps
    textAlign:'center'*/
   }
  footStyle:React.CSSProperties={
    padding:0,
    margin:0,
    backgroundColor:'lightblue',
    width:'100%',
    alignSelf:'stretch',
    flexGrow:1000,
    position:'absolute',
    bottom:1,
    left:0,
    zIndex:9999
  }
   render(){
    const children = React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child as React.ReactElement<any>, {}) : null
    }); 
    return <div style={this.layoutStyle}>
      <ConnectionMonitor/>
      <Loading/>
      <ToastContainer 
          position="bottom-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      <Header title={"Mas"}/>
      <div style={this.contentStyle}>
        <Routes/>
        <FloatingPanel
          style={{
          height: '100%',
        }}/>
      </div>
    </div>
  }}
  