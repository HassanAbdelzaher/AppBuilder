import * as React from 'react';

import { Icon, Menu } from 'semantic-ui-react';
import * as sAction from '../../actions/sidebar'
import SideBar from '../../containers/Sidebar';

export interface HeaderProps {
  heigth?: number;
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
    console.log("lkkk");
    this.setState({ open: !this.state.open })
  }
  handleToggleRequest() {
    console.log(this.props.onSideBarToggle)
    this.props.onSideBarToggle()
  }
 
  render() {
    return (<div>
      <Menu inverted style={this.props.style} attached>
        <Menu.Item position="right">
          {this.props.version}
        </Menu.Item>
        <Menu.Item position="left">
        <Icon color='blue' name="tasks" onClick={this.handleToggleRequest.bind(this)} />
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
  }
}