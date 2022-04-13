import React from 'react';
//import message from '..';

import {connect} from "react-redux";
import {set_status_message} from "../../../store/action";

class Welcome extends React.Component{
    constructor()
    {
        super();
        this.state ={
            status_message: '',
            edit_status_message: false
        }
    }
    handle_input = (e) => {
        let message = e.target.value;
        this.setState({status_message: message});
    }
    update_status(){
        this.setState({edit_status_message: false});
        this.props.set_status_message(this.props.login.uid, this.state.status_message);
    }
    render(){
        return(
            <div className="padding">                                
                <div className="text-center">
                    <div className="block d-inline-flex">
                        <div className="p-4 p-sm-5 b-r">
                            <div className="text-center p-5">
                                <h1 className="text-highlight">Welcome</h1>
                            </div>

                            <span className="avatar w-64">
                                {/**<img src="https://lh3.googleusercontent.com/a-/AOh14Gj89ZGl-klrigZXkWLW73aI_cg2rOCU35DS59Fs4A=s96-c" alt="."/>**/}
                                {(this.props.login.hasOwnProperty('profile') && this.props.login.profile !== '' && this.props.login.profile !== null) 
                                ? 
                                <img src={this.props.login.profile} alt="." /> 
                                :
                                <span className="avatar w-60 gd-success" style={{margin: "-2px"}}>{this.props.login.name[0].toUpperCase()}</span>}
                            </span>
                            
                            <div className="text-center p-5">
                                <h2 className="text-highlight">{this.props.login.name}</h2>
                            </div>

                            {this.state.edit_status_message 
                            ?  
                            (<div className="py-4 status-box mb-2">
                                <div className="input-group">
                                    <input type="text" className="p-3" placeholder={this.props.login.status_message != "" ? this.props.login.status_message : "status message"} value={this.state.status_message} onChange={this.handle_input}/>
                                    <button className="btn btn-icon btn-rounded gd-success" type="button" style={{marginRight:'1px'}} onClick={()=>{this.update_status()}}>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check mx-2"><polyline points="20 6 9 17 4 12"></polyline></svg> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-check mx-2"><polyline points="20 6 9 17 4 12" /></svg>
                                    </button>
                                </div>
                            </div>) 
                            : 
                            (<div className="py-4 status-box-holder mb-2">
                                <div className="text-muted" style={{display:'inline', float:'left'}}>{this.props.login.status_message != "" ? this.props.login.status_message : "You can provide your status message here!"}</div>
                                <button className="btn btn-icon btn-rounded gd-success" type="button" style={{display:'inline', float:'right', padding:'5px 0px'}} onClick={(e)=>{this.setState({edit_status_message: true})}}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-2 mx-2 mb-1"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 mx-2 mb-1"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3" /></svg>
                                </button>
                            </div>
                            )}

                            <div className="py-4">
                                <button className="btn btn-sm btn-rounded btn-raised btn-wave btn-primary">Invite Friends</button>
                            </div>
                            {/**<small className="text-muted">End-product<strong>not</strong> for sale</small>**/}
                        </div>
                    </div>
                </div>
                <div className="p-5 text-center">
                    Start Chatting or Invite Firends
                </div>
            </div>
        )
    }
}

// const mapStateToProp = (state) => ({
//     login: state.login,
//     friends: state.friends,
//     chattingwith: state.chattingwith,
//     chat: state.chat
// })
const mapDispatchToProp = (dispatch) => ({
    set_status_message: (uid, status_message)=> dispatch(set_status_message(uid, status_message))
})

//export default Welcome;
export default connect(null, mapDispatchToProp)(Welcome);