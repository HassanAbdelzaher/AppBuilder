import * as React from 'react';

import {Icon, Menu} from 'semantic-ui-react';

import SideBar from '../../containers/Sidebar';

export interface HeaderProps {
  heigth?: number;
  title?: string,
  version?: string,
  style?:{}
}
export interface HeaderState {
  /* empty */
  open : boolean
}
export class Header extends React.Component < HeaderProps,
HeaderState > {
  constructor(props?: HeaderProps, context?: any) {
    super(props, context);
    this.state = {
      open: false
    }
    this.handleSave = this
      .handleSave
      .bind(this);
  }

  handleSave(text : string) {}
  handleChange() {
    this.setState({open: true})
  }
  render() {
    return (
      <Menu inverted style={this.props.style} attached>
        <Menu.Item position="right">
          {this.props.version}
        </Menu.Item>
        <Menu.Item position="left">
          <Icon color='blue' name="tasks"/>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;
var styles : React.CSSProperties = {
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 20
  }
}