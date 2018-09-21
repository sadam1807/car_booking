import React from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import { AvForm, AvFeedback, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Button,  Col, FormGroup  } from 'reactstrap';
import Auth from './Auth';
import async from 'async';
import './Login.css'

class Login extends React.Component{
    constructor(props){
      super(props);
      this.state = {
      isLoggedIn: false
      }
    }
    componentWillMount() {
      console.log('here', Auth.isAuthenticated());
      if(Auth.isAuthenticated()) {
        this.setState({isLoggedIn: true})
      }
    }

    
    login = (values) => {
      var self = this;
      axios.post('/api/v1/users/login', {
				email: values.email,
				password: values.password
			})
			.then(function(response) {
				if(response.data.auth) {
					alert(response.data.message)
					Auth.setToken(response.data.token);
					self.setState({
						isLoggedIn: true
          });
				}
			})
			.catch(function(error) {
				if(error.response) {
          alert(error.response.data.message)
				}
			});
    }

    handleSubmit = (event, errors, values) => {
      if(errors.length===0) {
        console.log(values);
        async.waterfall(
          [
            async.apply(this.login, values),
          ]
        )
      }
    }

    render() {

      if(this.state.isLoggedIn) {
        console.log(Auth.getUserType());
        const userType = Auth.getUserType();
          if(userType === "admin") {
            return(
              <Redirect to={{
                pathname: '/admin'
              }}/>
            );
          }
          else if(userType === "customer") {
            return(
              <Redirect to={{
                pathname: '/customer'
              }}/>
            );
          }
      }


        return (
          <div> 
          <AvForm className="login-form" onSubmit={this.handleSubmit} >
          <AvGroup row>
            <Col sm={10}>
              <AvInput type="email" name="email" id="email" placeholder="Email"  required />
              <AvFeedback>Invalid Email!</AvFeedback>
            </Col>
          </AvGroup>
          <AvGroup row>
            <Col sm={10}>
              <AvInput type="password" name="password" id="password" placeholder="Password" required />
              <AvFeedback>Invalid Password!</AvFeedback>
            </Col>
          </AvGroup>
          <FormGroup  row>
            <Col sm={{ size: 10}}>
              <Button color="success" className="login-form-button" >Login</Button>
            </Col>
          </FormGroup>
          </AvForm>
          </div> 
        );
      }
}


export default Login;