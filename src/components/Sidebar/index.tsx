import * as React from 'react';
import * as smu from 'semantic-ui-react';

import {Header, Icon, Image, Menu, MenuItem, Segment, Sidebar} from 'semantic-ui-react';
import { History, Location, LocationListener, UnregisterCallback } from 'history';

import {Link} from 'react-router-dom';

export interface SideProps {
  onLocationClick?: () => void,
  onSHowDrawingControlsClick?: () => void,
  onEnableAddingNewComplaintClick?: () => void,
  onClick?:(clickeItem:string)=>void,
  toggle?:()=>void,
  open?:()=>void,
  close?:()=>void,
  isOpen?:boolean,
  title?:string,
  items?:Array<any>
}

export const HHU_LOCATIONS="HHU_LOCATIONS";
export const CUSTOMER_LOCATIONS="CUSTOMER_LOCATIONS";
export const DRAWING="DRAWING";
export const ILLEGAL_CONNECTIONS="ILLEGAL_CONNECTIONS";
export const COMPLAINTS="COMPLAINTS";
export const SETTINGS="SETTINGS";

export class Sidebar2 extends React.Component < SideProps, {
  isOpen : boolean
} > {

  constructor(props : SideProps) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
        };
    this.handleClick=this.handleClick.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }
  handleClose(){
    if(this.props.toggle)
        this.props.close();
    this.setState({isOpen: false});
  };
   
  handleClick (action:string) {
    if(this.props.onClick)
        this.props.onClick(action);
  }  
  
  componentWillReceiveProps(nextProps){
    this.setState({isOpen: nextProps.isOpen});    
  }
  handleSettings(){

  }
  render() {
  console.log(this.state.isOpen);
    var styleIcon = Object.assign({}, {marginTop: 10}); // custom color for Action Home icon
    //custom color for MenuItem
    var styleMenuItem = Object.assign({}, {
      borderBottom: '1px solid #c9d2e0',
      padding: '5px'
    });
    return (<div>
          <Sidebar as={Menu} animation='overlay' style={styles.sidebar} visible={this.state.isOpen} icon='labeled' vertical inverted>
          <Menu.Item name='home'>
              <Icon color="blue" onClick={this.handleClose.bind(this)} name='arrow left' />
          </Menu.Item>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Link  to='/settings'>
            <Menu.Item name='settings'>
              <Icon name='settings'  onClick={this.handleSettings.bind(this)}/>
              Settings
            </Menu.Item>
            </Link>
            <Menu.Item name='point'>
            <Icon name='point' />
              مكاني
            </Menu.Item>
            <Menu.Item name='registered'>
               <Icon name='registered' />
              تسجيل نقطة صيانة
            </Menu.Item>
            <Menu.Item name='registered Reading'>
             <Icon name='registered' />
             تسجيل قراءة
            </Menu.Item>
            <Menu.Item name='refresh'>
            <Icon name='refresh' />
              تحديث الشبكة
            </Menu.Item>
            <Menu.Item name='commenting outline'>
            <Icon name='commenting outline' />
              الشكاوى المفتوحة
            </Menu.Item>
            <Menu.Item name='info'>
            <Icon name='info' />
              اوامر الشغل
              </Menu.Item>
            <Menu.Item name='circle outline'>
            <Icon name='circle outline' />
              توصيلة غير قانونية
              </Menu.Item>
              <Menu.Item name='help circle'>
              <Icon name='help circle' />
              اعتداء على الشبكة
              </Menu.Item>
          </Sidebar>  
          </div>        
    )
  }
}
var styles : React.CSSProperties = {

  sidebar: {
    
    backgroundColor: '#146180'
  },
  title: {
    marginTop: "24px",
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: '40px'
  },
  name: {
    color: '#ecf4ff',
    padding: 0,
    marginLeft: "-15px",
    marginTop: "5px",
    fontSize: "14px"
  },
  icon: {
    color: "#777",
    textAlign: 'left',
    margin: '10px',
    float: 'right',
    height: '26px',
    width: '26',
    hover: {
      color: 'red',
      fill: "red",
      fontSize: '30px'
    }
  },
  label: {
    fontSize: '20px',
    fontWeight: "400",
    fontFamily: 'Cairo, sans-serif'
  },
  button: {
    margin: 20
  },
  a: {
    textDecoration: 'none',
    hover: {

      textDecoration: 'overline'
    }
  }
}