import * as React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import {AppBar} from 'material-ui'
import {Link} from 'react-router-dom';
import ModalDialog from '../Dialog/index'
import RaisedButton from 'material-ui/RaisedButton';

class M_Toolbar extends React.Component<{ height?: number,toolbar?:any,style?:React.CSSProperties }, { show: boolean }> {
  constructor(props) {
    super(props);
    this.state = { show: false }
  }
  handleClick(event, index, value) {
    this.setState({ show: true })
  }

  handleClose(data) {
    this.setState({ show: data.show })
  }
  render() {
    return <div style={{...styles.bar,...this.props.style}} > {this.props.toolbar||null}
      </div>
  }
}
const styles :{bar:React.CSSProperties } = {
  bar:{
    width:'100%',
    backgroundColor:'gray',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    height:30
  }
}
export default M_Toolbar