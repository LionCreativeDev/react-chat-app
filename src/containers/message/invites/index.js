import React from 'react';

import firend_invitation_image from '../../../assets/firend_invitation_image.png';
import {connect} from "react-redux";
import {accept_invitation, reject_invitation} from "../../../store/action";

class Invites extends React.Component{
    constructor()
    {
        super();
        this.state ={
            search: ''
        }
    }
    profile_photo_handle(v)
    {
        if(v.hasOwnProperty('profile') && v.profile !== null && v.profile !== "" && v.profile !== undefined)
            return true;
        else
            return false;
    }
    accept_invite(inviter, invited, invitation_key)
    {
        this.props.accept_invitation(inviter, invited, invitation_key);
        console.log("accept_invite clicked===>", invitation_key);
    }
    reject_invite(v){
        //console.log("reject_invite clicked===>", v.invitation_key);
        this.props.reject_invitation(v.invitation_key);
        console.log("reject_invitation clicked===>", v.invitation_key);
    }
    // componentDidMount(){
    //     if(this.props.login !== null)
    //         this.props.get_invitation(this.props.login.uid);

    //     let thiscontext = this;
    //     var originalSetItem = localStorage.setItem; 
    //     localStorage.setItem = function(){
    //         document.createEvent('Event').initEvent('itemInserted', true, true);
    //         originalSetItem.apply(this, arguments);

    //         if(localStorage.getItem('received_invitation') !== null)
    //         {
    //             let received_invitation = JSON.parse(localStorage.getItem('received_invitation'));
    //             thiscontext.setState({ received_invitation: received_invitation });

    //             setTimeout(()=>{
    //                 localStorage.removeItem('received_invitation');
    //             }, 100);
    //         }
    //     }
    // }
    render(){
        return (
            <React.Fragment>
                <div className="navbar">
                    <div className="input-group flex bg-light rounded">
                        <input type="text" className="form-control no-bg no-border no-shadow search" placeholder="Search Invites" required /> 
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

                {/**<div className="scrollable hover">
                    <div className="no-result" style={{position:'absolute', top: '50%', left:'25%'}}>
                        <img src={firend_invitation_image} style={{marginLeft:'5px'}} alt=""/>
                        <div className="p-4 text-center"><b>No Invitations</b></div>
                    </div>                
                </div>**/}

                { this.props.received_invitation.length > 0 ? (
                <div className="list list-row">                    
                    {this.props.received_invitation.map((v,i)=>{
                        console.log("v===>",v);
                        return (<div className="list-item activechat" key={i} style={{marginLeft:'2px', marginRight:'2px'}}>
                                {(this.profile_photo_handle(v)) ? <span className="avatar w-40 gd-primary friendprofileimage" style={{padding:0}}><img src={v.profile} alt={v.name+" profile"} /></span> : <span className="avatar w-40 gd-success friendprofileimage" style={{padding:0}}>{v.name[0].toUpperCase()}</span> }
                                <div className="friendloginstatus"><span className={v.status === "login" ? "avatar-status on" : "avatar-status off"} /></div>
                                <div className="flex" style={{padding:"0"}}>
                                    <div className="item-author text-color">{v.name}</div>
                                </div>
                                <div style={{left:'0', padding:'0'}}>
                                    {/**<button className="btn btn-raised btn-wave w-xs blue text-white" onClick={()=>{ this.props.invite_friend({sender:this.props.login.uid, receiver: v.uid}) }}>Invite</button>**/}
                                    <button className="btn btn-raised btn-wave btn-icon btn-rounded mb-2 green text-white"  onClick={()=>{ this.accept_invite(v.uid, this.props.login.uid, v.invitation_key) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"> <polyline points="20 6 9 17 4 12" /></svg>
                                    </button>
                                    <button className="btn btn-raised btn-wave btn-icon btn-rounded mb-2 red text-white" style={{marginLeft:"5px"}} onClick={()=>{ this.reject_invite(v) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x mx-2"> <line x1={18} y1={6} x2={6} y2={18} /> <line x1={6} y1={6} x2={18} y2={18} /></svg>
                                    </button>
                                </div>

                            </div>)
                    })}
                </div>) :
                <div className="no-result" style={{position:'absolute', top: '50%', left:'25%'}}>
                    <img src={firend_invitation_image} style={{marginLeft:'5px'}} alt=""/>
                    <div className="p-4 text-center"><b>No Invitations</b></div>
                </div>
                }
            </React.Fragment>
        )
    }
}


const mapStateToProp = (state) => ({
    received_invitation: state.received_invitation
})
const mapDispatchToProp = (dispatch) => ({
    //get_invitation: (uid)=> dispatch(get_invitation(uid)),
    accept_invitation: (inviter, invited, invitation_key)=> dispatch(accept_invitation(inviter, invited, invitation_key)),
    reject_invitation: (invitation_key)=> dispatch(reject_invitation(invitation_key))
})

//export default Invites;
export default connect(mapStateToProp, mapDispatchToProp)(Invites);