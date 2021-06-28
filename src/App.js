//import logo from './assets/logo.svg';
import './App.css';

import Signin from "./containers/signin";
import Signup from "./containers/signup";
import Message from "./containers/message";

import {  Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
        <Route path="/" component={Signin} exact />
        <Route path="/signup" component={Signup} />
        <Route path="/message" component={Message} />
      </Switch>
  );
}

export default App;
