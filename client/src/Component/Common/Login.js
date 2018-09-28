import React from 'react';
import {Redirect} from 'react-router-dom';
import { AvForm, AvFeedback, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Button,  Col, FormGroup  } from 'reactstrap';
import{ connect } from 'react-redux';
import { authUser } from '../../Redux/actions/authActions.js';
import PropTypes from 'prop-types';
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
    
    componentWillReceiveProps(nextProps)
    {
      const response = nextProps.auth.authResponse[0];
        if(response.auth)
        {
          alert(response.message)
          Auth.setToken(response.token);
            this.setState({
              isLoggedIn: true
            });
          }
        else {
            alert(response);
          }
      }

    
    login = (values) => {
      this.props.authUser(values);
    }

    handleSubmit = (event, errors, values) => {
      if(errors.length===0) {
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
              <Button color="success" className="button" >Login</Button>
            </Col>
          </FormGroup>
          </AvForm>
          </div> 
        );
      }
}
Login.propTypes = {
  authUser :PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect( mapStateToProps ,{authUser})(Login);