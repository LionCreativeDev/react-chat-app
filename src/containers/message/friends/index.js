import React from 'react';

import {connect} from "react-redux";
import {get_users_friends, get_message} from "../../../store/action";

//import firebase from "../../../config/firebase";

class Friends extends React.Component{
    chat = (v) => {
        let chat_id = this.chat_id(this.props.login.uid, v.uid);
        this.get_messages(chat_id, v);
    }
    chat_id = (loginuserid, chatuserid) => {
        if(loginuserid > chatuserid)
            return chatuserid + "-" + loginuserid;
        else
            return loginuserid + "-" + chatuserid;
    }
    get_messages = (chat_id, chatting_with) => {
        this.props.get_message(chat_id, chatting_with);
    }
    componentDidMount() {
        this.props.get_users_friends();
    }
    render(){
        return(
            <React.Fragment>
                <div className="navbar">
                    <div className="input-group flex bg-light rounded">
                        <input type="text" className="form-control no-bg no-border no-shadow search" placeholder="Search" required /> 
                        <span className="input-group-append">
                        <button className="btn no-bg no-shadow" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search text-fade">
                            <circle cx={11} cy={11} r={8} />
                            <line x1={21} y1={21} x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        </span>
                    </div>
                </div>

                {this.props.friends.length > 0 ? (
                <div className="list list-row">
                    {this.props.friends.map((v,i)=>{
                        return (v.uid !== this.props.login.uid && ( <div className={v.uid === this.props.chattingwith.uid ? "list-item activechat" : "list-item" } onClick={()=>{ this.chat(v) }} key={i}>
                                {/**<div><span className="w-40 avatar gd-primary"><img src="../assets/img/a1.jpg" alt="." /></span></div>**/}
                                {(v.hasOwnProperty('profile') && v.profile !== null && v.profile !== "") ? <span className="avatar w-40 gd-primary friendprofileimage" style={{padding:0}}><img src={v.profile} alt={v.name+" profile"} /></span> : <span className="avatar w-40 gd-success friendprofileimage" style={{padding:0}}>{v.name[0].toUpperCase()}</span> }
                                <div className="friendloginstatus"><span className={v.status === "login" ? "avatar-status on" : "avatar-status off"} /></div>
                                <div className="flex" style={{padding:"0"}}>
                                    <div className="item-author text-color">{v.name}</div>
                                    {/**<div className="item-except text-muted text-sm h-1x">In WordPress Tutorial, we’ll streamline the process for you by pointing out the all key features of the WordPress</div>**/}
                                </div>
                                <div />
                            </div>))
                    })}
                </div>) :
                <div className="no-result">
                    <div className="p-4 text-center">No Results</div>
                </div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProp = (state) => ({
    friends: state.friends,
    chattingwith: state.chattingwith,
    chat: state.chat
})
const mapDispatchToProp = (dispatch) => ({
    get_users_friends: ()=> dispatch(get_users_friends()),
    get_message: (chat_id, chattingwith)=> dispatch(get_message(chat_id, chattingwith))
})

//export default Friends;
export default connect(mapStateToProp, mapDispatchToProp)(Friends);