import React from 'react';

import firend_invitation_image from '../../../assets/firend_invitation_image.png';

class Invites extends React.Component{
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

                <div className="scrollable hover">
                {
                <div className="no-result" style={{position:'absolute', top: '50%', left:'25%'}}>
                    <img src={firend_invitation_image} style={{marginLeft:'5px'}} alt=""/>
                    <div className="p-4 text-center"><b>No Invitations</b></div>
                </div>
                }
                </div>
            </React.Fragment>
        )
    }
}

export default Invites;