import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class Menue  extends React.Component<{},{value:number}> {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }
 handleChangeSingle (event,  value) {
    this.setState({ value})
        console.log( value); 

}
handleClick(){
  alert("welcom")
}
  render() {          
    return (
   <IconMenu 
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      onChange={this.handleChangeSingle.bind(this)}
      value={this.state.value}
    >
      <MenuItem  onTouchTap={this.handleClick} value='1' primaryText="back"  style={styles.MenuItem}/>
      <MenuItem  onTouchTap={this.handleClick} value='2' primaryText="Send feedback" />
      <MenuItem  onTouchTap={this.handleClick} value='3' primaryText="Settings" />
      <MenuItem  onTouchTap={this.handleClick} value='4' primaryText="Help" />
      <MenuItem  onTouchTap={this.handleClick} value='5' primaryText="Sign out" />
    </IconMenu>
    );
  }
}
var styles={
  MenuItem:{
    marginTop:25,
  }
}