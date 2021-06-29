import React from 'react';
import logo from '../../../assets/logo.svg';

import {connect} from "react-redux";
import {sign_out} from "../../../store/action";

import './style.css';

class Header extends React.Component{
    render()
    {
        return (
            <div id="header" className="page-header bg-body sticky" data-class="bg-body">
                <div className="navbar navbar-expand-lg">
                    {/* brand */} 
                    <div className="navbar-brand">
                        <img src={logo} alt="React Chat App Logo" width="56" height="39" className="mini-logo"/> <span className="hidden-folded d-inline l-s-n-1x" style={{color: "#61dafb"}}>React Chat App</span> 
                    </div>
                    {/* / brand */}{/* Navbar collapse */}
                    <ul className="nav navbar-menu order-1 order-lg-2">                            
                        {/* User dropdown menu */}
                        <li className="nav-item dropdown">
                            <button data-toggle="dropdown" className="nav-link d-flex align-items-center px-2 text-color areplacement">
                                {this.props.login.profile !== null ? <span className="avatar w-40" style={{margin: '-2px'}}><img src={this.props.login.profile} alt="..." /></span> : <span className="avatar w-40 gd-success" style={{margin: '-2px'}}>{this.props.login.name[0].toUpperCase()}</span> }
                            </button>
                            <div className="dropdown-menu dropdown-menu-right w mt-3 animate fadeIn" style={{paddingTop:0}}>
                                {/**<div className="dropdown-divider" />
                                <a className="dropdown-item" href="page.setting.html"><span>Account Settings</span> </a>**/}
                                <span className="profileName">{this.props.login.name}</span>
                                <button className="dropdown-item" onClick={()=>this.props.sign_out(this.props.login)}>Sign out</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } 
}

// const mapStateToProp = (state) => ({
//     login: state.login,
//     friends: state.friends
// })
const mapDispatchToProp = (dispatch) => ({
    sign_out: (data)=> dispatch(sign_out(data))
})

//export default Header;
export default connect(null, mapDispatchToProp)(Header);