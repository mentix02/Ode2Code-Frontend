import React, { Component } from 'react';

import axios from 'axios';
import MarkdownInput from '@opuscapita/react-markdown';
import {
  Col,
  Form,
  Button,
  Container,
  Jumbotron,
  FormControl
} from 'react-bootstrap';

class NewTutorial extends Component {

  pk;
  series_id;

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      draft: false,
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

    console.log(this.state);

    let formData = new FormData();
    formData.set('title', this.state.title);
    formData.set('draft', this.state.draft);
    formData.set('content', this.state.content);
    formData.set('series_id', this.state.series_id);
    formData.set('description', this.state.description);
    formData.set('token', localStorage.getItem('token'));

    const url = '/api/tutorials/new/';

    axios({
      url: url,
      method: 'post',
      data: formData,
      config: {headers:{'Content-Type': 'multipart/form-data'}}
    }).then(
      res => {
        document.location = `/t/${res.data.detail.slug}`;
      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );

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
                <Form.Group as={Col} style={{marginBottom: '2px'}} md="6" controlid="validationCustom01">
                  <FormControl type="text" onChange={this.handleInputChange} onBlur={this.checkTutorialAvailability}
                               name="title" size="lg" autoComplete="off" placeholder="title for tutorial" required autoFocus />
                  <Form.Control.Feedback type="invalid">please enter a name for new tutorial</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <hr/>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom02">
                  <FormControl type="text" as="select" onChange={this.handleInputChange} name="series_id">
                    {
                      series.map(
                        (item, index) => (
                          <option key={index} value={item.pk}>{item.name}</option>
                        )
                      )
                    }
                    <option value="null">Series - none</option>
                  </FormControl>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom03">
                  <FormControl type="text" as="textarea" name="description"
                               rows="4" onChange={this.handleInputChange} required
                               placeholder={`description for ${this.state.title ? this.state.title : 'tutorial'}`} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom04">
                  <div style={{height: '40vh', background: '#ffffffff', fontFamily: 'Arial'}}>
                    <MarkdownInput onChange={this.setContent} name="content" autoFocus={false}
                                   placeholder={`content for ${this.state.title ? this.state.title : 'tutorial'}`} />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row style={{paddingBottom: '1px'}}>
                <Form.Group as={Col}>
                  <Form.Check type="checkbox" size="lg" name="draft" label="draft" />
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
