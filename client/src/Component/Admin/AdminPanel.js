import React from "react";
import Auth from '../Common/Auth';
import {Redirect,Route} from 'react-router-dom';
import LoadingScreen from 'react-loading-screen'
import Header from '../Common/Header';
import '../Common/Login.css'
import { 
    Container, 
    Row, 
    Col,
    Button }  from 'reactstrap';


const ListCar = () => {
    return (
      <div>
        <h2>All Cars</h2>
        <Button type="primary">Primary</Button>
      </div>
    )
  }
 
const AddCar = () => {
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
          isOpen: false,
          loader :true
        }
      }
    
    componentWillMount() {
        if(Auth.isAuthenticated()) {
            this.setState({isLoggedIn: true});
        } 

        setTimeout(() => {
            this.setState({ loader: false });
          }, 1500);
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
                   <Col  md="8"  >
                    <LoadingScreen
                        loading={this.state.loader}
                        spinnerColor='#9ee5f8'
                        textColor='#676767'
                        text='Loading'
                    > 
                       <Route path="/admin" exact component={ListCar} />    
                       <Route  path='/admin/car/add' component={AddCar} />
                    </LoadingScreen> 
                   </Col> 
                   <Col  md="4" >left sidebar</Col>
               </Row>
             </Container>  
            </div>    
        )
    }    
}
