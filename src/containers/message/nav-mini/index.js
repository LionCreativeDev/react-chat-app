import React from 'react';

import './style.css';

class NavMini extends React.Component{
    render(){
        return(
            <React.Fragment>
            <div className="navbar" style={{backgroundColor:"white", display:"none"}}>
                <div className="">
                    <div className="nav-fold">
                        <a className="d-flex" data-toggle="dropdown">                            
                            {this.props.login.profile !== null 
                            ? <img src={this.props.login.profile} alt="profile image" className="w-60 r" />
                            : <span className="avatar w-60 rounded gd-success" style={{margin: '-2px', fontSize:"40px"}}>{this.props.login.name[0].toUpperCase()}</span> 
                            }
                        </a>
                        <div className="hidden-folded flex p-2">
                            <div className="d-flex">
                            <a href="#" className="mr-auto text-nowrap">
                            {this.props.login.name}
                                <small className="d-block text-muted">status message goes here</small>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-dark-overlay r-2x no-r-b" style={{backgroundColor:'white'}}>
                <div className="d-md-flex">
                    <div style={{paddingTop:"1.5rem", paddingBottom:"1.5rem", paddingLeft:".9rem", paddingRight:".9rem"}}>
                        <div className="d-flex">
                            <a href="#">
                                {this.props.login.profile !== null 
                                ? <span className="avatar w-64" style={{margin: '-2px'}}><img src={this.props.login.profile} alt="..." /></span> 
                                : <span className="avatar w-64 gd-success" style={{margin: '-2px', fontSize:"40px"}}>{this.props.login.name[0].toUpperCase()}</span> 
                                }
                            </a>
                            <div style={{paddingLeft:".5rem"}}>
                                <h5 className="mt-2">{this.props.login.name}</h5>
                                <div className="text-fade text-sm"><span className="m-r">status message goes here</span>
                                {/**<small><i className="fa fa-map-marker mr-2" />London, UK</small>**/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default NavMini;