import * as React from 'react';

import {AppBar} from 'material-ui';
import ConnectionMonitor from '../../containers/ConnectionMonitor';
import FloatingPanel from '../FloatingPanel'
import {Footer} from '../../components/Footer/index'
import Header from '../Header'
import M_Toolbar from '../../components/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideBar from '../../components/sidebar'

var style =require('./style.css');

export class Layout extends React.Component<any, any> {
  constructor() {
    super();
    let height=window.innerHeight-81;    
    this.state = { };    
    this.handleOnAdd=this.handleOnAdd.bind(this);
    this.onWindowResized=this.onWindowResized.bind(this);
    this.handleOncLICK=this.handleOncLICK.bind(this);
  }
  renderHeader(){
    return <AppBar style={{width:'100%'}}
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  }
  handleOnAdd(){
  }
  componentDidMount(){
      window.onresize = this.onWindowResized;
  }
  componentWillReceiveProps(nextProps: any, nextContext: any) {
    console.log('layout reciving props');
    console.dir({nextProps,nextContext});    
  }
  private onWindowResized (event:UIEvent):void
    {
        let height=window.innerHeight-81;    
        this.setState({height})
    }

  handleOncLICK(){
    this.props.ui.openFloatingPanel();
  }

  
  layoutStyle:React.CSSProperties={
    padding:0,
    margin:0,
    position:'absolute',
    backgroundColor:'yellow',
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
    backgroundColor:'whitesmoke',
    width:'100%',
    alignSelf:'stretch',
    flexGrow:1000,
    position:'relative',
    height:'100%',
    overflow:'hidden'
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
      <Header title={"Mas"}/>
      <div style={this.contentStyle}>
        {this.props.children
          ? this.props.children
          : 'loading....'}
        <FloatingPanel
          style={{
          height: '100%',
        }}/>
      </div>
    </div>
  }}
  
  /*
  render(){
    const children = React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child as React.ReactElement<any>, {}) : null
    }); 
    return <div style={this.layoutStyle}>
      <ConnectionMonitor ConnState={this.props.ui.ConnState} />
      <Header title={"Mas"}/>
      <div style={this.contentStyle}>
        {this.props.children
          ? this.props.children
          : 'loading....'}
        <FloatingPanel
          style={{
          height: '100%',
        }}/>
      </div>
    </div>
  }
}*/