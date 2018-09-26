import React from "react";
import Auth from '../Common/Auth';
import {Redirect, BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import Header from '../Common/Header';
import { 
    Container, 
    Row, 
    Col,
    Button }  from 'reactstrap';


const ListCar = (props) => {
    return (
      <div>
        <h2>All Cars</h2>
        <Button type="primary">Primary</Button>
      </div>
    )
  }
 
const AddCar = (props) => {
    return (
      <div>
        <h2>ADD Cars</h2>
        <Button type="primary">Primary</Button>
      </div>
    )
}  

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
        // let pathname = this.props.location.pathname;
        // switch (pathname) {
        //     case '/admin/hospitals/add':
        //       this.setState({
        //         selectedSubMenuKey: "sub1",
        //         selectedMenuItemKey: '2'
        //       });
        //       break;
        //     default:
        //     this.setState({
        //     selectedSubMenuKey: "sub1",
        //     selectedMenuItemKey: '1'
        //     });
        // }      
    }
      
    


    render() {
        if(!this.state.isLoggedIn) {
            return(<Redirect to={'/login'}/>)
        }
        
       
		return (
            <div>
             <Container>   
               <Header />
               <Row>
                   <Col xs="8">
                    <Switch>
                     <Route path="/admin" exact component={ListCar} />    
                     <Route  path='/admin/car/add' component={AddCar} />
                    </Switch> 
                   </Col> 
                   <Col xs="4">left Side bar</Col>
               </Row>
             </Container>  
            </div>    
        )
    }    
}
