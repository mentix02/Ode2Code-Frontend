import React, { Component } from 'react';

import { isLoggedIn } from '../../utils/auth';
import { create_series } from '../../api/series';

import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';

class NewSeries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      created: false,
      type_of: 'design',
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitForm(e) {
    e.preventDefault();
    let data = new FormData();
    data.set('name', this.state.name);
    data.set('type_of', this.state.type_of);
    data.set('description', this.state.description);
    data.set('token', localStorage.getItem('token'));
    create_series(data).then(data => {
      console.log(data);
      if (data['details']) {
        this.setState({
          created: data.details.slug,
        });
      } else if (data['data']['error']) {
        toast.error(data.data.error, {
          position: toast.POSITION.BOTTOM_CENTER
        })
      } else {
        toast.error('Something went wrong.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    });
  }

    render() {

    if (!isLoggedIn()) {
      toast.error('You need to be logged in to do that.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return <Redirect to="/login" />
    }

    if (this.state.created) {
      toast.success(`Created new series "${this.state.name}"`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return <Redirect to={`/s/${this.state.created}`} />
    }

    document.title = `Making ${this.state.name ? `"${this.state.name}"` : 'new series'}`;

    return (
      <div>
        <Jumbotron>
          <Container>
            <Form onSubmit={this.submitForm}>
              <Form.Row>
                <Form.Group as={Col} style={{marginBottom: '2px'}} md="6" controlid="validationCustom01">
                  <FormControl type="text" onChange={this.handleInputChange} name="name" size="lg"
                               autoComplete="off" placeholder="Name for series" required autoFocus />
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Row>
                <Form.Group as={Col}>
                  <FormControl type="text" as="select" onChange={this.handleInputChange} name="type_of">
                    <option value="design">design</option>
                    <option value="language">language</option>
                    <option value="algorithms">algorithms</option>
                    <option value="technology">technology</option>
                    <option value="miscellaneous">miscellaneous</option>
                    <option value="data_structures">data structures</option>
                    <option value="other">other</option>
                  </FormControl>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <FormControl type="text" as="textarea" name="description"
                               rows="3" onChange={this.handleInputChange} required
                               placeholder={`Description for ${this.state.name ? this.state.name : 'series'}`} />
                </Form.Group>
              </Form.Row>
              <Button type="submit" variant="primary" >Create</Button>
            </Form>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default NewSeries;
