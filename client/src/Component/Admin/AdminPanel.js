import React from "react";
import Auth from '../Common/Auth';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom';


export class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false
        }
      }

      componentWillMount() {
        if(Auth.isAuthenticated()) {
          this.setState({isLoggedIn: true});
        }
      }
    
    logout = () => {
        Auth.removeToken();
        this.setState({isLoggedIn: false});
    }
      
    render() {
        if(!this.state.isLoggedIn) {
            return(<Redirect to={'/login'}/>)
        }

		return (
            <div>
                <h1>AdminPanel</h1>
                <div>
                <button  onClick={this.logout}>
                      Logout
                </button>
                </div>  
            </div>    
        )
    }    
}
