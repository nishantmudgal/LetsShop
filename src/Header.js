import React, { Component } from 'react';
import './header.css'
import { auth } from './config/Firebase'
import logo from './res/logo.png'

class Header extends Component {

    constructor(props) {
        super(props);

    }

    logout = () => {
        auth.signOut();
    }

    switchPage = (explorePage) => {
        if ( explorePage !== this.props.currentPage)
        {
            this.props.changePage();
        }
    }

    render() {
        return (
            <div className="container">
                <nav className="nav">
                    <img className="logo" src={logo}/>
                    <div className="nav-menu">
                        <a className="nav-item" onClick={() => this.switchPage(true)}>{this.props.currentPage ? (<b>Explore</b>) : (<span>Explore</span>)}</a>
                        <a className="nav-item" onClick={() => this.switchPage(false)}>{this.props.currentPage ? (<span>Cart</span>) : (<b>Cart</b>)}</a>
                        <button type="button" className="btn btn-info" onClick = {this.logout}>Logout</button>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;