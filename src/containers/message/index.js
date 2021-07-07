import React from "react";
//import logo from '../../assets/logo.svg';
import './style.css';

import {connect} from "react-redux";
import {get_users_friends} from "../../store/action";
import { Redirect } from 'react-router-dom';

import Header from '../message/header';
import NavMini from '../message/nav-mini';
import Friends from '../message/friends';
import Contacts from '../message/contacts';
import Invites from '../message/invites';
import Welcome from '../message/welcome';
import Chatbox from '../message/chatbox';
import Emptychat from '../message/emptychat';

//import firebase from "../../config/firebase";

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
            message: ''
        }
    }    
    componentDidMount() {
        if(this.props.login.length > 0)
            this.props.get_users_friends(this.props.login[0].uid);
            
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
        $("#search-tab").on("click", function(){
            $("div.active").removeClass("active");
            $(this).addClass("active");
            $(".tab-pane").hide().removeClass("show active");
            $("#search").show().addClass("show active");
        })
        $("#friends-tab").on("click", function(e){
            $("div.active").removeClass("active");
            $(this).addClass("active");
            $(".tab-pane").hide().removeClass("show active");
            $("#friends").show().addClass("show active");
        })
        $("#invites-tab").on("click", function(e){
            $("div.active").removeClass("active");
            $(this).addClass("active");
            $(".tab-pane").hide().removeClass("show active");
            $("#invites").show().addClass("show active");
        })
        //console.log("componentDidMount");
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
                    <Header login={this.props.login[0]}/>

                    {/* ############ Content START*/}
                    <div id="content" className="flex">
                    {/* ############ Main START*/}
                    <div className="d-flex flex fixed-content">
                        <div className="aside aside-sm" id="content-aside">
                            <div className="d-flex flex-column w-xl modal-dialog bg-body" id="chat-nav">
                                {/**<div className="navbar">
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
                                </div>**/}
                                <NavMini login={this.props.login[0]} />
                                <ul className="nav nav-tabs">
                                    <li className="nav-item" style={{width:'33%'}}>
                                        <div className="nav-link active" id="friends-tab">Friends</div>
                                    </li>
                                    <li className="nav-item" style={{width:'33%'}}>
                                        <div className="nav-link" id="search-tab">Search</div>
                                    </li>
                                    <li className="nav-item" style={{width:'33%'}}>
                                        <div className="nav-link" id="invites-tab">Invites</div>
                                    </li>
                                </ul>                                                                    
                                <div className="tab-content mb-4" style={{height:'100%'}}>
                                    <div className="tab-pane fade show active" id="friends" style={{height:'100%'}}>
                                        <Friends login={this.props.login[0]} chattingwith={this.props.chattingwith} />
                                    </div>
                                    <div className="tab-pane fade" id="search" style={{height:'100%'}}>
                                        <Contacts login={this.props.login[0]} chattingwith={this.props.chattingwith} />
                                    </div>
                                    <div className="tab-pane fade" id="invites" style={{height:'100%'}}>
                                        <Invites login={this.props.login[0]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex pr-md-3" id="content-body">
                        <div className="d-flex flex-column flex card m-0 mb-md-3" id="chat-list">
                            <div className="navbar flex-nowrap b-b">
                                <button data-toggle="modal" data-target="#content-aside" data-modal className="d-md-none btn btn-sm btn-icon no-bg btnmenu">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                                        <line x1={3} y1={12} x2={21} y2={12} />
                                        <line x1={3} y1={6} x2={21} y2={6} />
                                        <line x1={3} y1={18} x2={21} y2={18} />
                                    </svg>
                                    </span>
                                </button>
                                <span className="text-ellipsis flex mx-1"><span className="text-md text-highlight mx-2 frientname">{this.props.chattingwith.hasOwnProperty('name') ? this.props.chattingwith.name : ""}</span> </span><span className="flex" />
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
                            {this.props.chattingwith.hasOwnProperty('uid') ? <Chatbox chat={this.props.chat} login={this.props.login[0]} chattingwith={this.props.chattingwith} /> : <Welcome login={this.props.login[0]} />}
                            {this.props.chattingwith.hasOwnProperty('uid') && (<Emptychat login={this.props.login[0]} chattingwith={this.props.chattingwith}/>)}
                        </div>
                        </div>
                    </div>
                    {/* ############ Main END*/}
                    </div>
                    {/* ############ Content END*/}

                    {/**<div id="footer" className="page-footer hide">
                        <div className="d-flex p-3">
                            <span className="text-sm text-muted flex">© Copyright. LionCreativeDev</span>
                            <div className="text-sm text-muted">Version 1.1.2</div>
                        </div>
                    </div>**/}
                </div>
                )
                }
            </div>
        )
    }
}

const mapStateToProp = (state) => ({
    login: state.login,
    friends: state.friends,
    chattingwith: state.chattingwith,
    chat: state.chat
})
const mapDispatchToProp = (dispatch) => ({
    get_users_friends: (uid)=> dispatch(get_users_friends(uid))
})

//export default Message;
export default connect(mapStateToProp, mapDispatchToProp)(Message);