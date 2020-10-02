import React, { Component } from 'react';
import Homeslider from './Home.slider';
import Homecourse from './Home.course';
import Hometotalcourse from './Home.totalcourse';
import Homecontact from './Home.contact';
import Homefooter from './Home.footer';
import Hometeacher from './Home.teacher';
import Header from '../Header';

import '../../blog/blog.css'

class Roothome extends Component {
   
    render() {
        return (
           
            <div>
                 
                 <Header/>
                <Homeslider/>
                <Homecourse/>
                <Hometeacher/>
                <Hometotalcourse/>
                <Homecontact/>
                <Homefooter/>
        
            </div>
           
        );
    }
}

export default Roothome;