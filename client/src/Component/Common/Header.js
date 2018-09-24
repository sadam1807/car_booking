import React from "react";
import Auth from '../Common/Auth';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';


class Header extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        }
      }
      
     logout = () => {
        Auth.removeToken();
        this.setState({isLoggedIn: false});
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
      
    render() {
		return (
            <div>
               <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Car Booking System</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink style= {{"cursor" : "pointer"}}onClick={this.logout}>Logout</NavLink>
                        </NavItem>
                        </Nav>
                    </Collapse>
               </Navbar> 
            </div>    
        )
    }    
}

export default  Header;