import React from 'react';

import Success from '../success';
import Fail from '../fail';
import Info from '../info';
import Warning from '../warning';

class AlertHelper extends React.Component{
    render(){
        const getAlert = () => {
            if(this.props.type === "success")
                return <Success message={this.props.message} />;
            else if(this.props.type === "fail")
                return <Fail message={this.props.message} />;
            else if(this.props.type === "info")
                return <Info message={this.props.message} />;
            else if(this.props.type === "warning")
                return <Warning message={this.props.message} />;
        }
        return (<React.Fragment>{getAlert()}</React.Fragment>);
    }
}

export default AlertHelper;