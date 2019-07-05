import React, { Component } from 'react';

import axios from 'axios';
import {
  Col,
  Form,
  Container,
  Jumbotron,
  FormControl, Button, InputGroup, Spinner,
} from 'react-bootstrap';

class NewSeries extends Component {

  available;

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      checking: null,
      validated: false,
      is_available: true,
      type_of: 'language',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkTutorialAvailability = this.checkTutorialAvailability.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  checkTutorialAvailability() {

    let formData = new FormData();
    formData.set('name', this.state.name);

    this.setState({checking: true});

    axios({
      method: 'post',
      data: formData,
      url: '/api/series/is_available/',
      config: {headers:{'Content-Type': 'multipart/form-data'}}
    }).then(
      res => {
        this.setState({
          checking: false,
          is_available: res.data.available
        });
      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );

  }

  submitSeriesForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({
      validated: true
    });

    let formData = new FormData();
    formData.set('name', this.state.name);
    formData.set('type_of', this.state.type_of);
    formData.set('thumbnail', this.state.thumbnail);
    formData.set('description', this.state.description);
    formData.set('token', localStorage.getItem('token'));

    axios({
      method: 'post',
      data: formData,
      url: '/api/series/new/',
      config: {headers:{'Content-Type': 'multipart/form-data'}}
    }).then(
      res => {
        document.location = `/s/${res.data.details.slug}`;
      }
    ).catch(
      err => {console.log(err.response);}
    );
  }

  render() {

    document.title = 'New Series';

    return(
      <div>
        <Jumbotron>
          <Container>
            <Form noValidate validated={this.state.validated} onSubmit={e => this.submitSeriesForm(e)}>
              <Form.Row>
                <InputGroup as={Col} md="4" controlid="validationCustom01">
                  <FormControl type="text" onChange={this.handleInputChange} onBlur={this.checkTutorialAvailability}
                               name="name" size="lg" autoComplete="off" placeholder="name for series" required autoFocus />
                  <InputGroup.Append>
                    <Button style={{borderRadius: "0px 4px 4px 0px"}} >
                      {this.state.checking ? <Spinner animation="border" variant="light" /> :
                        this.state.is_available ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
                    </Button>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">please enter a name for new series</Form.Control.Feedback>
                </InputGroup>
              </Form.Row>
              <hr/>
              <Form.Row style={{paddingTop: '10px'}}>
                <Form.Group as={Col} controlId="validationCustom03">
                  <FormControl type="url" as="select" onChange={this.handleInputChange} name="type_of">
                    <option value="design">design</option>
                    <option value="language">language</option>
                    <option value="algorithms">algorithms</option>
                    <option value="technology">technology</option>
                    <option value="miscellaneous">miscellaneous</option>
                    <option value="data_structures">data structures</option>
                    <option value="data_structures">other</option>
                  </FormControl>
                  {this.state.type_of === 'other' ? <FormControl name="type_of" onChange={this.handleInputChange} /> : ''}
                </Form.Group>
              </Form.Row>
              <Form.Row style={{paddingTop: '10px'}}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <FormControl type="url" name="thumbnail" placeholder={
                    `thumbnail url for ${this.state.name ? this.state.name : 'series'}`} required onChange={this.handleInputChange} />
                  <Form.Control.Feedback type="invalid">Please enter a url of a thumbnail for new series.</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row style={{paddingBottom: '1px'}}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <FormControl type="text" as="textarea" rows="3" name="description" placeholder={
                    `description for ${this.state.name ? this.state.name : 'series'}`} required onChange={this.handleInputChange} />
                  <Form.Control.Feedback type="invalid">please enter a description for new series.</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit" variant="primary" >create</Button>
            </Form>
          </Container>
        </Jumbotron>
      </div>
    );
  }

}

export default NewSeries;
