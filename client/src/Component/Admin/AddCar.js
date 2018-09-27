import React from "react";
import { AvForm, AvFeedback, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Row, Col, Button, FormGroup, Label,FormText} from 'reactstrap';

class AddCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        modal: false
        }
      } 

    handleSubmit = (event, errors, values) => {
        values.thumbnailImage = values.thumbnailImage.replace(/^.*\\/, "");
        values.sliderImage = values.sliderImage.replace(/^.*\\/, "");
        // if(errors.length===0) {
          console.log(values);
        //   async.waterfall(
        //     [
        //       async.apply(this.login, values),
        //     ]
        //   )
        // }
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
                    <AvInput type="file" name="thumbnailImage" id="thumbnailImage" accept='image/*' required/>
                    <AvFeedback>Select Thumbnail Image!</AvFeedback>
                </AvGroup>
                <AvGroup>
                    <Label for="sliderImage">Slider Image*</Label>
                    <AvInput type="file" name="sliderImage" id="sliderImage" accept='image/*' required/>
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

 export default AddCar;