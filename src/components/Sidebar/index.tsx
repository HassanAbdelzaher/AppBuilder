import * as React from 'react';
import * as sActions from '../../constants/sidebar-actions'

import { History, Location, LocationListener, UnregisterCallback } from 'history';
import {blue500, greenA200, red500} from 'material-ui/styles/colors';

import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionExplore from 'material-ui/svg-icons/action/explore';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionViewDay from 'material-ui/svg-icons/action/view-day';
import AppBar from 'material-ui/AppBar';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import Drawer from 'material-ui/Drawer';
import EditorModeEdit from 'material-ui/svg-icons/editor/Mode-edit';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';

export interface SideProps {
  onLocationClick?: () => void,
  onSHowDrawingControlsClick?: () => void,
  onEnableAddingNewComplaintClick?: () => void,
  onClick?:(clickeItem:string)=>void,
  toggle:()=>void
  isOpen?:boolean
}

class SideBar extends React.Component < SideProps, {
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
      <div style={{overflowX:'hidden',overflowY:'auto'}}>
        <ActionHome style={styleIcon} onClick={this.handleToggle}/>
        <Drawer
          open={this.props.isOpen}
          /*onRequestChange={(open) => this.setState({open})}*/>
          <div style={styles.AppBar}>
            <div style={styles.title}>ManPoint</div>
            <div style={styles.name}>User name
            </div>
          </div>
          {<a style={styles.a}>
            <MenuItem style={styleMenuItem} onTouchTap={()=>{this.handleClick(sActions.HHU_LOCATIONS);this.props.onLocationClick}}><CommunicationLocationOn style={styles.icon}/>
              <span style={styles.label}>
                مواقع الوحدات
              </span>
            </MenuItem>
          </a>}
          {<a style={styles.a}>
            <MenuItem style={styleMenuItem} onTouchTap={()=>{this.handleClick(sActions.CUSTOMER_LOCATIONS)}}><ActionExplore style={styles.icon}/>
              <span style={styles.label}>
                مواقع العملاء
              </span>
            </MenuItem >
          </a>}
          {<a style={styles.a}>
            <MenuItem style={styleMenuItem} onTouchTap={()=>{this.handleClick(sActions.DRAWING)}}><EditorModeEdit style={styles.icon}/>
              <span style={styles.label}>
                رسم حدود مسار
              </span>
            </MenuItem>
          </a>}
          <Link onClick={this.props.onSHowDrawingControlsClick} to='search'>
            <MenuItem style={styleMenuItem} onTouchTap={()=>{this.handleClick(sActions.ILLEGAL_CONNECTIONS)}}><ActionSearch style={styles.icon}/>
              <span style={styles.label}>
                التوصيلات الخلسة
              </span>
            </MenuItem >
          </Link>
          <Link style={styles.a} to='/messages'>
            <MenuItem style={styleMenuItem} onTouchTap={()=>{this.handleClick(sActions.COMPLAINTS)}}><CommunicationMessage style={styles.icon}/>
              <span style={styles.label}>
                الشكاوى المفتوحة
              </span>
            </MenuItem >
          </Link>
          <Link style={styles.a} to='/settings'>
            <MenuItem style={styleMenuItem} onTouchTap={()=>{this.handleClick(sActions.SETTINGS)}}><ActionSettings style={styles.icon}/>
              <span style={styles.label}>
                الأعدادت
              </span>
            </MenuItem>
          </Link>           
        </Drawer>
      </div>

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
export default SideBar;
