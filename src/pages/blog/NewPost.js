import React, { Component } from 'react';

import { create_post } from '../../api/blog';
import mdParser from '../../utils/highlighting';
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

class NewPost extends Component {

  mdParser = null;

  submitForm(e) {
    e.preventDefault();
    let data = new FormData();
    data.set('body', this.state.body);
    data.set('title', this.state.title);
    data.set('description', this.state.description);
    data.set('token', localStorage.getItem('token'));
    create_post(data).then(data => {
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
        })
      }
    });
  }

  // noinspection DuplicatedCode
  constructor(props) {
    super(props);
    this.state = {
      draft: false,
      created: false,
    };
    this.mdParser = mdParser;
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange({text, _}) {
    this.setState({body: text});
  }

  componentDidMount() {
    makeAllTextareasRequiredAndPerformTabMagic();
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
      toast.success(`Created new post "${this.state.title}"`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return <Redirect to={`/p/${this.state.created}`} />
    }

    document.title = `Writing ${this.state.title ? `"${this.state.title}"` : 'new post'}`;

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

    return (
      <div>
        <Jumbotron>
          <Container>
            <Form onSubmit={this.submitForm}>
              <Form.Row>
                <Form.Group as={Col} style={{marginBottom: '2px'}} md="6" controlid="validationCustom01">
                  <FormControl type="text" onChange={this.handleInputChange} name="title" size="lg"
                               autoComplete="off" placeholder="Title for post" required autoFocus />
                </Form.Group>
              </Form.Row>
              <hr />
              <Form.Row>
                <Form.Group as={Col}>
                  <FormControl type="text" as="textarea" name="description"
                               rows="4" onChange={this.handleInputChange} required
                               placeholder={`Description for ${this.state.title ? this.state.title : 'post'}`} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <div style={{height: '40vh', background: '#ffffffff', fontFamily: 'Arial'}}>
                    <MdEditor name="body" id="editor-body" onChange={this.handleEditorChange} config={config}
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

export default NewPost;
