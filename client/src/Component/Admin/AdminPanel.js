import React from "react";
import Auth from '../Common/Auth';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from '../Common/Header';
import { Nav, NavItem, NavLink } from 'reactstrap';

export class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          isOpen: false
        }
      }

    componentWillMount() {
    if(Auth.isAuthenticated()) {
        this.setState({isLoggedIn: true});
    }
    }
      
    render() {
        if(!this.state.isLoggedIn) {
            return(<Redirect to={'/login'}/>)
        }

		return (
            <div>
               <Header />
                <Nav vertical >
                <NavItem >
                    <NavLink href="#">Add CAR</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">List CARS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Add Models</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink  href="#">Orders</NavLink>
                </NavItem>
                </Nav>
            </div>    
        )
    }    
}
