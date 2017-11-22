import * as React from 'react';
import * as smu from 'semantic-ui-react';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class ModalDialog extends React.Component<{title:string,onClose:Function,open:boolean}> {
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
      <smu.Icon
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <smu.Icon
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
        <smu.Modal
          actions={actions}
          open={this.props.open}
          onClose={this.handleClose}
        >
        <smu.Modal.Header>
          {this.props.title}
          </smu.Modal.Header>
        <smu.Modal.Content>
          {this.props.children}
        </smu.Modal.Content>
        </smu.Modal>
    );
  }
}