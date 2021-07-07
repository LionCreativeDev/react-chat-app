import React from 'react';

import {connect} from "react-redux";
import {send_message} from "../../../store/action";

class Emptychat extends React.Component{
    constructor()
    {
        super();
        this.state ={
            message: ''
        }
    }
    chat_id = (loginuserid, chatuserid) => {
        if(loginuserid > chatuserid)
            return chatuserid + "-" + loginuserid;
        else
            return  loginuserid + "-" + chatuserid;
    }
    handle_message = (e) => {
        if (e.keyCode === 13)
        {
            this.send_message();
        }
        else{
            this.setState({message: e.target.value});
        }
    }
    send_message = () => {
        if(this.state.message.trim() !== ""){
            this.setState({
                //chat: [...this.state.chat, this.state.message],
                message: ''
            })
            let chat_id = this.chat_id(this.props.login.uid, this.props.chattingwith.uid);
            this.props.send_message(chat_id, {message: this.state.message, sender_name: this.props.login.name, sender_id: this.props.login.uid, reciever_id: this.props.chattingwith.uid, timestamp: Date.now()});
        }
    }
    render(){
        return(
            <div className="mt-auto b-t" id="chat-form">
                <div className="p-2">
                    {/**<div className="px-3">
                        <div className="toolbar my-1">
                            <button className="text-muted mx-1 areplacement">
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-image">
                                    <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </button>
                            <button className="text-muted mx-1 areplacement">
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-camera">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx={12} cy={13} r={4} />
                                </svg>
                            </button>
                            <button className="text-muted mx-1 areplacement">
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                </svg>
                            </button>
                            <button className="text-muted mx-1 areplacement">
                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                </svg>
                            </button>
                        </div>
                    </div>**/}
                    <div className="input-group">
                        <input type="text" className="form-control p-3 no-shadow no-border" placeholder="Say something" id="newField" value={this.state.message} onKeyDown={this.handle_message} onChange={this.handle_message} /> 
                        <button className="btn btn-icon btn-rounded gd-success" type="button" id="newBtn" onClick={ ()=>{this.send_message()} }>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up">
                            <line x1={12} y1={19} x2={12} y2={5} />
                            <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </button>
                    </div>
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
    send_message: (chat_id, newmessage) => dispatch(send_message(chat_id, newmessage))
})

export default connect(null, mapDispatchToProp)(Emptychat);
//export default Emptychat;