import React from "react";
import logo from '../../assets/logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {facebook_login, google_login, create_user, show_alert, remove_alert} from "../../store/action";
import { Redirect } from 'react-router-dom';

import AlertHelper from '../alerts/alerthelper';

class Signup extends React.Component{
    constructor(){
        super();
        this.state ={
          email: '',
          password: '',
          loggedin: false,
          redirect: ''
        }
    }
    handle_email = (e) => {
        this.setState({email: e.target.value});
    }
    handle_password = (e) => {
        this.setState({password: e.target.value});
    }
    vaidate_email = (input) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input))
            return false;
        else
            return true;
    }
    handle_signupwithemailandpassword = () => {
        //this.hide_alert();
        if(this.props.login.length === 0)
        {       
            let email = this.state.email.trim();
            let password = this.state.password.trim();
            
            if((email !== '' && this.vaidate_email(email)) && password !== '')
            {
                this.props.create_user(email, password);
            }
            else
            {
                if(email === '' && password === '')
                    this.props.show_alert("fail","Please provide email and password to create account");//this.setState({ alertmessage: {type: "fail", message: "Please provide email and password to create account"} });
                else if (email === '')
                    this.props.show_alert("fail","Please provide email to create account");//this.setState({ alertmessage: {type: "fail", message: "Please provide email to create account"} });
                else if (password === '')
                    this.props.show_alert("fail","Please provide password to create account");//this.setState({ alertmessage: {type: "fail", message: "Please provide password to create account"} });
                else if(!this.vaidate_email(email))
                    this.props.show_alert("fail","Please provide valid email create account");//this.setState({ alertmessage: {type: "fail", message: "Please provide valid email create account"} });
            }
        }
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.redirect_to_messages(),3000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    redirect_to_messages() {
        if(this.props.login.length > 0){
            this.setState({
                loggedin: true,
                redirect: "/message"
            });

            this.props.remove_alert();
        }
    }
    // hide_alert()
    // {
    //     this.props.remove_alert();
    // }
    render(){

        let showalert = false;
        if(this.props.alerts.length > 0)
            showalert=true;

        return(
            <div className="w-xl w-auto-sm mx-auto py-5">
                {this.state.loggedin ? <Redirect push to={this.state.redirect}/> : ""}
                <div className="p-4 d-flex flex-column">
                    {/* brand */} 
                    <div className="navbar-brand d-inline align-self-center" style={{display: "block"}}>                    
                        <img src={logo} alt="..." width="56" height="39" className="Mini-App-logo"/>
                        <span className="hidden-folded d-inline l-s-n-1x align-self-center" style={{color: "#61dafb"}}>React Chat App</span> 
                    </div>
                    {/* / brand */}
                </div>
                <div className="card mx-2">
                    { showalert ? <AlertHelper type={this.props.alerts[0].type} message={this.props.alerts[0].message}/> : ""}
                    <div id="content-body">
                        <div className="p-3 p-md-5">
                            <h5>Welcome</h5>
                            <p><small className="text-muted">Sign up to manage enjoy</small></p>
                            
                                <div className="form-group"><label>Email</label><input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handle_email} value={this.state.email}/></div>
                                <div className="form-group">
                                    <label>Password</label><input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handle_password} value={this.state.password}/>
                                    {/**<div className="my-3 text-right"><a href="forgot-password.html" className="text-muted" data-pjax-state>Forgot password?</a></div>**/}
                                </div>
                                {/**<div className="checkbox mb-3"><label className="ui-check"><input type="checkbox" /><i /> Remember me</label></div>**/}
                                <button onClick={this.handle_signupwithemailandpassword} className="btn btn-primary mb-1">Sign up</button>
                                <div className="align-self-center">
                                    <div className="dropdown-divider"></div>
                                    <div onClick={()=>{ (this.props.login.length === 0) ? this.props.facebook_login() : alert("Already Login");}} className="fb btn d-block mb-2" style={{backgroundColor:"#3B5998", color:"white"}}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-facebook-f fa-w-10 fa-2x" style={{color: 'white', height: 14, marginBottom: 5, marginRight: 10}}><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg> Login with Facebook</div>
                                    <div onClick={()=>{ (this.props.login.length === 0) ? this.props.google_login(): alert("Already Login");}} className="google btn d-block mb-2" style={{backgroundColor:"#dd4b39", color:"white"}}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="svg-inline--fa fa-google fa-w-16 fa-2x" style={{color: 'white', height: 14, marginBottom: 5, marginRight: 10}}><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg> Login with Google+</div>
                                    <div className="dropdown-divider"></div>
                                </div>
                                <div>Already have an account? <Link to="/" className="text-primary">Sign in</Link></div>
                            
                        </div>
                    </div>
                </div>
                <div className="text-center text-muted">© Copyright. LionCreativeDev</div>
            </div>
        )
    }
}

const mapStateToProp = (state) => ({
    login: state.login,
    alerts: state.alerts
})
const mapDispatchToProp = (dispatch) => ({
    facebook_login: ()=> dispatch(facebook_login()),
    google_login: ()=> dispatch(google_login()),
    create_user: (email, password)=> dispatch(create_user(email, password)),
    show_alert: (alerttype, alertmessage)=> dispatch(show_alert(alerttype, alertmessage)),
    remove_alert: ()=> dispatch(remove_alert())
})

//export default Signup;
export default connect(mapStateToProp, mapDispatchToProp)(Signup);