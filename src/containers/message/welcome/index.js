import React from 'react';

class Welcome extends React.Component{
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
}

export default Welcome;