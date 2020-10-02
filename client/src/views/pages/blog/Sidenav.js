import React, { Component } from 'react';
class Sidenav extends Component {
  
  render() {
    return (
      <div className="sidenav">
          {this.props.ch.map((data,index)=>(
                
                <a key={index} onClick={()=>this.props.redata(data.ch)}>{data.ch}</a>
                ))} 
      
      </div>
    );
  }
}

export default Sidenav;