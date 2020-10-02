import React, { Component } from 'react';

class Reletedposts extends Component {
   
    render() {
        return (
            <div>
                {this.props.releted.length?<div><h4 style={{"color":"ActiveCaption","textAlign":"center"}}>Check Releted Posts</h4>
                <hr></hr>
                {this.props.releted.map((data,index)=>(
                    <div key={Math.random()}>
                        {/* <a href={`${data}`}>{data}</a> */}
                        <h5 key={index}>{data}</h5>
                        <br></br>
                 </div> 
               
                 )
                )}</div>:''}
                 
              
            </div>
        );
    }
}

export default Reletedposts;