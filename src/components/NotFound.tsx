import * as React from 'react';

export class NotFound extends React.Component<any,{}>{
  constructor(props,context){
    super(props,context)
  }
  render(){
    const mapStyle={width:'100%',
    minHeight:200,
    minWidth:200,
    display:'block',
    padding:0,
    margin:0,
    marginTop:'0px',
    background:'green'
  }
    
    return (<div style={mapStyle}>
    <h3>No match for <code>{location&&location.pathname?location.pathname:location}</code></h3>
  </div>)
  }
}