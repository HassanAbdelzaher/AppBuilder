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
      isOpen: false
        };
    this.handleClick=this.handleClick.bind(this);
    this.handleToggle=this.handleToggle.bind(this);
  }

  handleToggle(){
    if(this.props.toggle)
        this.props.toggle();
  };
   
  handleClick (action:string) {
    //this.setState({open: false});
    if(this.props.onClick)
        this.props.onClick(action);
  }

  render() {
    var styleIcon = Object.assign({}, {marginTop: 10}); // custom color for Action Home icon
    //custom color for MenuItem
    var styleMenuItem = Object.assign({}, {
      borderBottom: '1px solid #c9d2e0',
      padding: '5px'
    });
    return (
          <Sidebar as={Menu} animation='overlay' visible={this.state.isOpen} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>          
    )
  }
}
var styles : React.CSSProperties = {

  AppBar: {
    width: '100%',
    height: '90px',
    padding: '10px',
    backgroundColor: '#0264f2'
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