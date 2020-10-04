import React from 'react'
import { Redirect } from 'react-router-dom'

class Superadminprotected extends React.Component {
    token=localStorage.getItem('auth');
    render() {
        const Component = this.props.component;
        const token=localStorage.getItem('auth');
        const username=localStorage.getItem('username');
        const role=localStorage.getItem('userrole');
        let isAuthenticated=false;

        if(token && role=="superadmin")
        isAuthenticated = true;        
        return isAuthenticated ? ( 
            <Component />
        ) : (
            <Redirect to={{ pathname: '/Superadminlogin' }} />
        );
        
    }
}

export default Superadminprotected;