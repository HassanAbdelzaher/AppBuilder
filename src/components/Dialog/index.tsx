import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class ModalDialog extends React.Component<{show:boolean,onClose:Function},{open:boolean}> {
  constructor(props){
    super(props);
    this.state = {
    open: props.show,
  };
  }
  
  handleOpen(){
        this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
    if(this.props.onClose){
      this.props.onClose({show:false})
    }
    
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div style={this.props.show? {display:'block'}:{display:'none'}}>  
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.props.show}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}