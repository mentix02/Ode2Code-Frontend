import React, { Component } from 'react';

import mdParser from '../../utils/highlighting';
import { create_tutorial } from '../../api/tutorials';
import { get_series_for_new_tutorial } from '../../api/series';
import { makeAllTextareasRequiredAndPerformTabMagic } from '../../utils/magic';

import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {isLoggedIn} from '../../utils/auth';
import { Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MdEditor from 'react-markdown-editor-lite'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';

class NewTutorial extends Component {

  pk;
  series_id;
  mdParser = null;

  submitForm(e) {

    e.preventDefault();

    const data = new FormData();
    data.set('title', this.state.title);
    data.set('content', this.state.content);
    data.set('series_id', this.state.series_id);
    data.set('description', this.state.description);
    data.set('token', localStorage.getItem('token'));

    create_tutorial(data).then(data => {
      if (data['details']) {
        this.setState({
          created: data.details.slug
        });
      } else if (data['data']['error']) {
        toast.error(data.data.error, {
          position: toast.POSITION.BOTTOM_CENTER
        })
      } else {
        toast.error('Something went wrong.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      draft: false,
      created: false,
      redirectBecauseNoSeriesExist: false,
    };
    this.mdParser = mdParser;
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  // noinspection JSUnusedLocalSymbols
  handleEditorChange({text, _}) {
    this.setState({content: text});
  }

  componentDidMount() {
    makeAllTextareasRequiredAndPerformTabMagic();
    get_series_for_new_tutorial().then(data => {
      if (data.length >= 0) {
        this.setState({
          series: data,
          series_id: null
        });
      }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
      toast.success(`Created new tutorial "${this.state.title}"`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return <Redirect to={`/t/${this.state.created}`} />
    }

    document.title = `Writing ${this.state.title ? `"${this.state.title}"` : 'new tutorial'}`;

    const config = isMobile ? {
      view: {
        md: true
      },
      synchScroll: false
    } : {
      view: {
        md: true,
        menu: true,
      },
      table: {
        maxRow: 6,
      },
      synchScroll: false
    };

    // noinspection JSUnresolvedFunction
    return (
      <div>
        <Jumbotron>
          <Container>
            <Form onSubmit={this.submitForm}>
              <Form.Row>
                <Form.Group as={Col} style={{marginBottom: '2px'}} md="6" controlid="validationCustom01">
                  <FormControl type="text" onChange={this.handleInputChange} name="title" size="lg"
                               autoComplete="off" placeholder="Title for tutorial" required autoFocus />
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Row>
                <Form.Group as={Col}>
                  <FormControl type="text" as="select" onChange={this.handleInputChange} name="series_id">
                    {
                      this.state.series.map(
                        (series, index) => (
                          <option value={series.pk} key={index}>{series.name}</option>
                        )
                      )
                    }
                    <option value="null">None</option>
                  </FormControl>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <FormControl type="text" as="textarea" name="description"
                               rows="4" onChange={this.handleInputChange} required
                               placeholder={`Description for ${this.state.title ? this.state.title : 'tutorial'}`} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <div style={{height: '40vh', background: '#ffffffff', fontFamily: 'Arial'}}>
                    <MdEditor name="content" id="editor-body" onChange={this.handleEditorChange} config={config}
                              renderHTML={(text) => this.mdParser.render(text)} value="" required />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row style={{paddingBottom: '1px'}}>
                <Form.Group as={Col}>
                  <Form.Check type="checkbox" name="draft" label={<h6>draft</h6>} />
                </Form.Group>
              </Form.Row>
              <Button type="submit" variant="primary" >Post</Button> &nbsp;
            </Form>
          </Container>
        </Jumbotron>
      </div>
    );
  }

}

export default NewTutorial;
