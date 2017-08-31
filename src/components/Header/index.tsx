import * as React from 'react';
import {AppBar} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menue from '../Menu/index'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';
import SideBar from '../../containers/Sidebar'

const defaulStyle={
  height:50
}
export interface HeaderProps {
  heigth?:number;
  title?:string,
}
export interface HeaderState {
  /* empty */
  open:boolean,
}
export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props?: HeaderProps, context?: any) {
    super(props, context);
    this.state={open:false}
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    
  }
  handleChange(){
    this.setState({open:true})
  }
  render() {
    return (
      <AppBar style={{height:this.props.heigth,textAlign:'center'}}
          title={this.props.title}
          iconElementRight={ <Menue />}
          iconElementLeft={<SideBar/>}

            />     );
  }
}

export default Header;
