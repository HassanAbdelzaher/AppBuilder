import * as React from 'react';
import * as sAction from '../../actions/sidebar'

import { Icon, Menu } from 'semantic-ui-react';

import SideBar from '../../containers/Sidebar';

export interface HeaderProps {
  heigth?: number,
  title?: string,
  version?: string,
  style?: {},
  onSideBarToggle?:()=>{
  }
}
export interface HeaderState {
  /* empty */
  open: boolean
}
export class Header extends React.Component<HeaderProps,
  HeaderState> {
  constructor(props?: HeaderProps, context?: any) {
    super(props, context);
    this.state = {
      open: false
    }
  }


  handleClick() {
    this.setState({ open: !this.state.open })
  }
  handleToggleRequest() {
    console.log(this.props.onSideBarToggle)
    this.props.onSideBarToggle()
  }
  render() {
    return (<div>
      <Menu inverted style={styles.menu} attached >
        <Menu.Item position="left">
          {this.props.version}
        </Menu.Item>
        <Menu.Item position="right">
        <Icon  name="tasks" style={styles.icon} onClick={this.handleToggleRequest.bind(this)} />
        </Menu.Item>
      </Menu>
    </div>
    );
  }
}
export default Header;
var styles: React.CSSProperties = {
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 20
  },
  menu:{
    background:"#38819e"
  },
  icon:{
   fontSize:25
  },
  item:{
    position: 'absolute',
    fontSize: 17,
    fontWeight: 'bold',
  }
}