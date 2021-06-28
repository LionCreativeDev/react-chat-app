import React from "react";
import logo from '../../assets/logo.svg';
import './style.css';

import {connect} from "react-redux";
import {get_users_friends, send_message, sign_out} from "../../store/action";
import { Redirect } from 'react-router-dom';

import firebase from "../../config/firebase";

import $ from 'jquery';

window.$ = window.jQuery = require('jquery');

// $(document).ready(function(){
//     $(".dropdown").on("click",function(e){
//         console.log("clicked");
//     });
// })

class Message extends React.Component{
    constructor()
    {
        super();
        this.state ={
            chattingwith: [],
            chat: [],
            message: ''
        }
    }
    chat = (v) => {
        let chat_id = this.chat_id(this.props.login[0].uid, v.uid);
        this.get_messages(chat_id, v);
    }
    chat_id = (loginuserid, chatuserid) => {
        if(loginuserid > chatuserid)
            return chatuserid + "-" + loginuserid;
        else
            return  loginuserid + "-" + chatuserid;
    }
    send_message = () => {
        this.setState({
            //chat: [...this.state.chat, this.state.message],
            message: ''
        })
        let chat_id = this.chat_id(this.props.login[0].uid, this.state.chattingwith.uid);
        this.props.send_message(chat_id, {message: this.state.message, sender_name: this.props.login[0].name, sender_id: this.props.login[0].uid, reciever_id: this.state.chattingwith.uid});
    }
    get_messages = (chat_id, chatting_with) => {
        let this_user_chat = [];

        firebase.database().ref('/').child(`chats/${chat_id}`).on("child_added", (messages)=>{
            // this.setState({
            //     chat: [...this.state.chat, messages.val()],
            //     chattingwith: chatting_with
            // })
            this_user_chat.push(messages.val());
        })
        
        if(this_user_chat.length > 0)
            this.setState({chattingwith: chatting_with, chat: this_user_chat});
        else
            this.setState({chattingwith: chatting_with, chat: []});
    }
    componentDidMount() {
        this.props.get_users_friends();
        $(".dropdown").on("click",function(e){
            if(!$(this).hasClass("show")){
                $(this).addClass("show");
                $(this).find(".dropdown-menu").addClass("animate fadeIn show").css({"display":"block"});
            }
            else{
                $(this).removeClass("show");
                $(this).find(".dropdown-menu").removeClass("animate fadeIn show").removeAttr("style");
            }
        });

        $("button.openleft, button[data-toggle='modal']").on("click", function(){
            $("#content-aside").addClass("show").css({"display":"block"});
            $("#chat-nav").css({"transform":"translate3d(0,0,0)"});
            $("body").append("<div class='modal-backdrop show'></div>");

            $(".modal-backdrop").on("click", function(){
                $("#content-aside").removeClass("show").css({"display":"none"});
                $("#chat-nav").css({"transform":"translate3d(-100%,0,0)"});
                $(".modal-backdrop").remove();
            })
        })
        console.log("componentDidMount");
    }
    render(){
        let loggedin = (this.props.login.length > 0) ? true : false;
        let redirect = "/";
        //console.log("render");
        //console.log("this.state===",this.state);
        return(
            <div className="layout-row">
                {!loggedin ? <Redirect to={redirect}/> : ""}
                { loggedin && (
                <div id="main" className="layout-column flex">
                    {/* ############ Header START*/}
                    <div id="header" className="page-header bg-body sticky" data-class="bg-body">
                    <div className="navbar navbar-expand-lg">
                        {/* brand */} 
                        <a href="index.html" className="navbar-brand">
                        <img src={logo} alt="React Chat App Logo" width="56" height="39"/> <span className="hidden-folded d-inline l-s-n-1x" style={{color: "#61dafb"}}>React Chat App</span> 
                        </a>
                        {/* / brand */}{/* Navbar collapse */}
                        <ul className="nav navbar-menu order-1 order-lg-2">                            
                            {/* User dropdown menu */}
                            <li className="nav-item dropdown">
                                <button data-toggle="dropdown" className="nav-link d-flex align-items-center px-2 text-color areplacement">
                                    {this.props.login[0].profile !== null ? <span className="avatar w-40" style={{margin: '-2px'}}><img src={this.props.login[0].profile} alt="..." /></span> : <span className="avatar w-40 gd-success" style={{margin: '-2px'}}>{this.props.login[0].name[0].toUpperCase()}</span> }
                                </button>
                                <div className="dropdown-menu dropdown-menu-right w mt-3 animate fadeIn" style={{paddingTop:0}}>
                                    {/**<div className="dropdown-divider" />
                                    <a className="dropdown-item" href="page.setting.html"><span>Account Settings</span> </a>**/}
                                    <span className="profileName">{this.props.login[0].name}</span>
                                    <button className="dropdown-item" onClick={()=>this.props.sign_out(this.props.login)}>Sign out</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
                    {/* ############ Footer END*/}{/* ############ Content START*/}
                    <div id="content" className="flex">
                    {/* ############ Main START*/}
                    <div className="d-flex flex fixed-content">
                        <div className="aside aside-sm" id="content-aside">
                        <div className="d-flex flex-column w-xl modal-dialog bg-body" id="chat-nav">
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
                            <div className="scrollable hover">
                            {this.props.friends.length > 0 ? (
                            <div className="list list-row">
                                {this.props.friends.map((v,i)=>{
                                    return (v.uid !== this.props.login[0].uid && ( <div className={v.uid === this.state.chattingwith.uid ? "list-item activechat" : "list-item" } onClick={()=>{ this.chat(v) }} key={i}>
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
                            </div>
                        </div>
                        </div>
                        <div className="d-flex flex pr-md-3" id="content-body">
                        <div className="d-flex flex-column flex card m-0 mb-md-3" id="chat-list">
                            <div className="navbar flex-nowrap b-b">
                                <button data-toggle="modal" data-target="#content-aside" data-modal className="d-md-none btn btn-sm btn-icon no-bg">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                                        <line x1={3} y1={12} x2={21} y2={12} />
                                        <line x1={3} y1={6} x2={21} y2={6} />
                                        <line x1={3} y1={18} x2={21} y2={18} />
                                    </svg>
                                    </span>
                                </button>
                                <span className="text-ellipsis flex mx-1"><span className="text-md text-highlight mx-2 frientname">{this.state.chattingwith.hasOwnProperty('name') ? this.state.chattingwith.name : ""}</span> </span><span className="flex" />
                                {/**<div>
                                    <div className="d-flex flex-wrap align-items-center avatar-group">
                                    <a href="app.message.html" className="w-24 avatar circle bg-danger-lt"><img src="../assets/img/a10.jpg" alt="." /> </a>
                                    <a href="app.message.html" className="w-24 avatar circle bg-primary-lt"><img src="../assets/img/a3.jpg" alt="." /> </a>
                                    <a href="app.message.html" className="w-24 avatar circle bg-info-lt">A </a>
                                    <a href="app.message.html" className="w-24 avatar circle bg-warning-lt">T </a>
                                    <a className="w-24 avatar circle bg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={5} y1={12} x2={19} y2={12} />
                                        </svg>
                                    </a>
                                    </div>
                                </div>**/}
                            </div>
                            {this.state.chattingwith.hasOwnProperty('uid') ? (<div className="scrollable hover">
                                <div className="list">
                                    <div className="p-3">
                                        <div className="chat-list">
                                            {this.state.chat.map((v,i)=>{
                                                return (
                                                <div key={i} className="chat-item" data-class={v.reciever_id === this.props.login[0].uid ? "null": "alt"} data-sr-id={i} style={{visibility: 'visible', transform: 'none', opacity: 1, transition: 'transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s'}}>
                                                    {/**<button className="avatar w-40 areplacement"><img src="../assets/img/a2.jpg" alt="." /></button>**/}
                                                    {v.sender_id === this.props.login[0].uid ? (
                                                        <button className="avatar w-40 areplacement" style={{padding:0}}>{(this.props.login[0].hasOwnProperty('profile') && this.props.login[0].profile !== '' && this.props.login[0].profile !== null) ? <img src={this.props.login[0].profile} alt="." /> : <span className="avatar w-40 gd-success" style={{margin: "-2px"}}>{this.props.login[0].name[0].toUpperCase()}</span>}</button>
                                                    ) : (
                                                        <button className="avatar w-40 areplacement" style={{padding:0}}>{(this.state.chattingwith.hasOwnProperty('profile') && this.state.chattingwith.profile !== '' && this.state.chattingwith.profile !== null) ? <img src={this.state.chattingwith.profile} alt="." /> : <span className="avatar w-40 gd-info" style={{margin: "-2px"}}>{this.state.chattingwith.name[0].toUpperCase()}</span>}</button>
                                                    )}
                                                    <div className="chat-body">
                                                        <div className="chat-content rounded msg bg-body">{v.message}</div>                                                    
                                                        <div className="chat-date date">2 days ago</div>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            {this.state.chat.length <= 0 && ( <div className="p-4 text-center rounded bg-body emptyChat">No Message! Start Chatting</div> )}
                                            {/**<div className="chat-item" data-class="null" data-sr-id={2} style={{visibility: 'visible', transform: 'none', opacity: 1, transition: 'transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s'}}>
                                                <button className="avatar w-40 areplacement"><img src="../assets/img/a2.jpg" alt="." /></button>
                                                <div className="chat-body">
                                                    <div className="chat-content rounded msg bg-body">New photos coming...</div>
                                                    <div className="w-md my-3">
                                                    <div className="row row-xs">
                                                        <div className="col-4">
                                                        <div className="media media-4x3 r box-shadows"><div className="media-content" style={{backgroundImage: 'url(../assets/img/b1.jpg)'}} /></div>
                                                        </div>
                                                        <div className="col-4">
                                                        <div className="media media-4x3 r box-shadows"><div className="media-content" style={{backgroundImage: 'url(../assets/img/b7.jpg)'}} /></div>
                                                        </div>
                                                        <div className="col-4">
                                                        <div className="media media-4x3 r box-shadows"><div className="media-content" style={{backgroundImage: 'url(../assets/img/b16.jpg)'}} /></div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="chat-date date">2 days ago</div>
                                                </div>
                                            </div>
                                            <div className="chat-item" data-class="alt" data-sr-id={3} style={{visibility: 'visible', transform: 'none', opacity: 1, transition: 'transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s'}}>
                                                <button className="avatar w-40 areplacement"><img className="image" src="../assets/img/a0.jpg" alt="." /></button>
                                                <div className="chat-body">
                                                    <div className="chat-content rounded msg bg-body">Hi, Jacqueline Reid...</div>
                                                    <div className="w-md my-3">
                                                    <div className="row row-xs">
                                                        <div className="col-12">
                                                        <div className="media media-2x1 r box-shadows">
                                                            <div className="media-content" style={{backgroundImage: 'url(../assets/img/b11.jpg)'}} />
                                                            <div className="media-action active">
                                                                <div className="btn btn-md btn-icon btn-white btn-rounded">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-play">
                                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="chat-date date">8 hrs ago</div>
                                                </div>
                                            </div>**/}
                                        </div>
                                    </div>
                                </div>
                            </div>) : (
                                <div className="padding">                                
                                    <div className="text-center">
                                        <div className="block d-inline-flex">
                                            <div className="p-4 p-sm-5 b-r">
                                                <div className="text-center p-5">
                                                    <h1 className="text-highlight">Welcome</h1>
                                                </div>

                                                <span className="avatar w-64">
                                                    {/**<img src="https://lh3.googleusercontent.com/a-/AOh14Gj89ZGl-klrigZXkWLW73aI_cg2rOCU35DS59Fs4A=s96-c" alt="."/>**/}
                                                    {(this.props.login[0].hasOwnProperty('profile') && this.props.login[0].profile !== '' && this.props.login[0].profile !== null) 
                                                    ? 
                                                    <img src={this.props.login[0].profile} alt="." /> 
                                                    :
                                                    <span className="avatar w-60 gd-success" style={{margin: "-2px"}}>{this.props.login[0].name[0].toUpperCase()}</span>}
                                                </span>
                                                
                                                <div className="text-center p-5">
                                                    <h2 className="text-highlight">{this.props.login[0].name}</h2>
                                                </div>
                                                <div className="text-muted status-message">status message goes here</div>
                                                <div className="py-4">
                                                    <a href="#" className="btn btn-sm btn-rounded btn-primary">Invite Friends</a>
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
                            {this.state.chattingwith.hasOwnProperty('uid') && (<div className="mt-auto b-t" id="chat-form">
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
                                        <input type="text" className="form-control p-3 no-shadow no-border" placeholder="Say something" id="newField" value={this.state.message} onChange={(e)=> this.setState({message: e.target.value})} /> 
                                        <button className="btn btn-icon btn-rounded gd-success" type="button" id="newBtn" onClick={ ()=>{this.send_message()} }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up">
                                            <line x1={12} y1={19} x2={12} y2={5} />
                                            <polyline points="5 12 12 5 19 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        </div>
                    </div>
                    {/* ############ Main END*/}
                    </div>
                    {/* ############ Content END*/}{/* ############ Footer START*/}
                    <div id="footer" className="page-footer hide">
                    <div className="d-flex p-3">
                        <span className="text-sm text-muted flex">© Copyright. LionCreativeDev</span>
                        <div className="text-sm text-muted">Version 1.1.2</div>
                    </div>
                    </div>
                    {/* ############ Footer END*/}
                </div>
                )
                }
            </div>
        )
    }
}

const mapStateToProp = (state) => ({
    login: state.login,
    friends: state.friends
})
const mapDispatchToProp = (dispatch) => ({
    sign_out: (data)=> dispatch(sign_out(data)),
    get_users_friends: ()=> dispatch(get_users_friends()),
    send_message: (chat_id, newmessage) => dispatch(send_message(chat_id, newmessage))
})

//export default Message;
export default connect(mapStateToProp, mapDispatchToProp)(Message);