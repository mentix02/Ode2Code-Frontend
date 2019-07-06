import React, { Component } from 'react';

import axios from 'axios';
import MarkdownInput from '@opuscapita/react-markdown';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Jumbotron
} from 'react-bootstrap';

class NewTutorial extends Component {

  pk;
  series_id;

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      checking: null,
      validated: false,
      is_available: true,
    };
    this.setContent = this.setContent.bind(this);
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

  setContent(text) {
    this.setState({
      content: text
    })
  }

  getSeries() {
    const url = '/api/series/names/';
    axios.get(url).then(
      res => {
        this.setState({
          series: res.data
        });
      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );
  }

  componentDidMount() {
    this.getSeries();
  }

  submitTutorialForm(e) {

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
    formData.set('title', this.state.title);
    formData.set('series_id', this.state.series_id);
    formData.set('token', localStorage.getItem('token'));

    axios({
      method: 'post',
      url: '/api/'
    });

  }

  render() {

    document.title = 'New Tutorial';
    const {series} = this.state;

    return (
      <div>
        <Jumbotron>
          <Container>
            <Form noValidate validated={this.state.validated} onSubmit={e => this.submitTutorialForm(e)}>
              <Form.Row>
                <Form.Group as={Col} style={{marginBottom: '2px'}} md="4" controlid="validationCustom01">
                  <FormControl type="text" onChange={this.handleInputChange} onBlur={this.checkTutorialAvailability}
                               name="title" size="lg" autoComplete="off" placeholder="title for tutorial" required autoFocus />
                  <Form.Control.Feedback type="invalid">please enter a name for new tutorial</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <hr/>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom02">
                  <FormControl type="text" as="select" onChange={this.handleInputChange} name="series_pk">
                    {
                      series.map(
                        (item, index) => (
                          <option key={index} value={item.pk}>{item.name}</option>
                        )
                      )
                    }
                    <option value="null">None</option>
                  </FormControl>
                </Form.Group>
              </Form.Row>
              <Form.Row style={{paddingTop: '10px'}}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <FormControl type="url" name="thumbnail" placeholder={
                    `thumbnail url for ${this.state.title ? this.state.title : 'tutorial'}`} required onChange={this.handleInputChange} />
                  <Form.Control.Feedback type="invalid">Please enter a url of a thumbnail for new series.</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row style={{paddingBottom: '1px'}}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <div style={{height: '40vh', background: '#ffffffff'}}>
                    <MarkdownInput onChange={this.setContent} name="content" autoFocus={false}
                                   placeholder={`content for ${this.state.title ? this.state.title : 'tutorial'}`} />
                  </div>
                </Form.Group>
              </Form.Row>
              <Button type="submit" variant="primary" >create</Button> &nbsp;
            </Form>
          </Container>
        </Jumbotron>
      </div>
    );
  }

}

export default NewTutorial;
