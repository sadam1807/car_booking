import React from "react";
import { AvForm, AvFeedback, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Row, Col, Button, FormGroup, Label,FormText} from 'reactstrap';
import{ connect } from 'react-redux';
import { createCar } from '../../Redux/actions/carActions.js';
import PropTypes from 'prop-types';
import async from 'async';

class AddCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        modal: false,
        thumbnailImage: "",
        sliderImage: ""
        }
      } 

    componentWillReceiveProps(nextProps)
    {
    
     const  response = nextProps.car[0];
      if(response){
         if(response.error)
         {
          alert(response.message);
        }
      }  
    }

    handelThumbnailImage = (e) =>{
        this.setState({thumbnailImage : e.target.files[0]})
    }

    handelSliderImage = (e) =>{
        this.setState({sliderImage : e.target.files[0]})
    }

  
    handleSubmit = (event, errors, values) => {
        values.thumbnailImageFile = this.state.thumbnailImage;
        values.sliderImageFile = this.state.sliderImage
        values.thumbnailImage = values.thumbnailImage.replace(/^.*\\/, "");
        values.sliderImage = values.sliderImage.replace(/^.*\\/, "");
        console.log(values);
        if(errors.length===0) {
            async.waterfall(
                [
                  async.apply(this.createCar, values),
                ]
              )
           
         
        }
      }
      createCar = (values) => {
      this.props.createCar(values)
      }

     render(){
        return (
            <div>
              <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>    
              <h2 style={{marginTop :'2rem'}}>ADD Car</h2>
              <AvForm onSubmit={this.handleSubmit}>
                <AvGroup >
                    <Label for="name">Car Name*</Label>
                    <AvInput type="name" name="name" id="name" placeholder="Car Name" required/>
                    <AvFeedback>Enter Car Name!</AvFeedback>
                </AvGroup>
                <AvGroup>
                    <Label for="features">Car Features*</Label>
                    <AvInput type="textarea" name="features" id="features" rows="5" required/>
                    <AvFeedback>Enter Car Features!</AvFeedback>
                </AvGroup>
                <AvGroup>
                    <Label for="thumbnailImage">Thumbnail Image*</Label>
                    <AvInput type="file" name="thumbnailImage" id="thumbnailImage" onChange={this.handelThumbnailImage} accept='image/*' required/>
                    <AvFeedback>Select Thumbnail Image!</AvFeedback>
                </AvGroup>
                <AvGroup>
                    <Label for="sliderImage">Slider Image*</Label>
                    <AvInput type="file" name="sliderImage" id="sliderImage" onChange={this.handelSliderImage} accept='image/*' required/>
                    <AvFeedback>Select Slider Image!</AvFeedback>
                </AvGroup>
                <AvGroup check>
                    <Label check for="isSlider">
                    <AvInput type="checkbox" name="isSlider" /> Set Slider
                    <FormText color="muted">
                        Allow this Car to display in Slider
                    </FormText>
                    </Label>
                </AvGroup>
                <FormGroup>
                    <Button style={{marginTop :'1rem'}}>Save</Button>
                </FormGroup>
              </AvForm>
              </Col>
              </Row>
            </div>
           
          )
     }
 } 
 

 AddCar.propTypes = {
    createCar :PropTypes.func.isRequired
  }


 const mapStateToProps = (state) => ({
    car: state.car.cars
});

export default connect(mapStateToProps ,{createCar})(AddCar);