import React from "react";
import Auth from '../Common/Auth';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem ,
    Container,
    Row, 
    Col} from 'reactstrap';


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
               <Row>
                 <Col> 
                    <Navbar color="dark" dark expand="md">
                            <NavbarBrand href="/">Car Booking System</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                            Cars
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                            <DropdownItem>
                                               <Link to='/admin/car/add'>Add Car</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                               <Link to='/admin' activeClassName="active">List Cars</Link>
                                            </DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <NavItem>
                                        <NavLink style= {{"cursor" : "pointer"}} >Users</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style= {{"cursor" : "pointer"}} onClick={this.logout}>Logout</NavLink>
                                    </NavItem>
                                    
                                </Nav>
                            </Collapse>
                    </Navbar> 
                </Col>
                </Row>    
            </div>    
        )
    }    
}

export default  Header;