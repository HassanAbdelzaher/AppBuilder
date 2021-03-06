import * as React from 'react';
import * as classNames from 'classnames';

var style =require('!style-loader!css-loader!./style.css');
export interface FooterProps {
  height:number;
};

export interface FooterState {
  /* empty */
}

export class Footer extends React.Component<FooterProps, FooterState> {

  render() {
    return (
    <div>
      <footer style={{height:this.props.height,width:'100%',position:'relative'}} className={style.normal}>
        {this.props.children}
      </footer>
    </div>
    );
  }
}

export default Footer;
