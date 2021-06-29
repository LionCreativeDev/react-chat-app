import React from 'react';

class Chatbox extends React.Component{
    render(){
        return(
            <div className="scrollable hover">
                <div className="list">
                    <div className="p-3">
                        <div className="chat-list">
                            {this.props.chat.map((v,i)=>{
                                return (
                                <div key={i} className="chat-item" data-class={v.reciever_id === this.props.login.uid ? "null": "alt"} data-sr-id={i} style={{visibility: 'visible', transform: 'none', opacity: 1, transition: 'transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s'}}>
                                    {/**<button className="avatar w-40 areplacement"><img src="../assets/img/a2.jpg" alt="." /></button>**/}
                                    {v.sender_id === this.props.login.uid ? (
                                        <button className="avatar w-40 areplacement" style={{padding:0}}>{(this.props.login.hasOwnProperty('profile') && this.props.login.profile !== '' && this.props.login.profile !== null) ? <img src={this.props.login.profile} alt="." /> : <span className="avatar w-40 gd-success" style={{margin: "-2px"}}>{this.props.login.name[0].toUpperCase()}</span>}</button>
                                    ) : (
                                        <button className="avatar w-40 areplacement" style={{padding:0}}>{(this.props.chattingwith.hasOwnProperty('profile') && this.props.chattingwith.profile !== '' && this.props.chattingwith.profile !== null) ? <img src={this.props.chattingwith.profile} alt="." /> : <span className="avatar w-40 gd-info" style={{margin: "-2px"}}>{this.props.chattingwith.name[0].toUpperCase()}</span>}</button>
                                    )}
                                    <div className="chat-body">
                                        <div className="chat-content rounded msg bg-body">{v.message}</div>                                                    
                                        <div className="chat-date date">2 days ago</div>
                                    </div>
                                </div>
                                )
                            })}
                            {this.props.chat.length <= 0 && ( <div className="p-4 text-center rounded bg-body emptyChat">No Message! Start Chatting</div> )}
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
            </div>
        )
    }
}
export default Chatbox;