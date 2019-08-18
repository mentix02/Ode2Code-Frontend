import React, { Component } from 'react';

import { get_post } from '../../api/blog';
import CodeBlock from '../../components/Code';
import { toTitleCase } from '../../utils/string';

import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class Post extends Component {

  constructor(props) {

    super(props);

    this.state = {
      redirect: false,
      post: {
        timestamp: '',
        author: {
          user: {
            username: '',
            last_name: '',
            first_name: '',
          },
          bio: '',
          authenticated: null
        }
      }
    }

  }

  componentDidMount() {

    let slug = this.props.match.params.slug;

    get_post(slug).then(data => {
      if (data.data) {
        this.setState({
          redirect: true,
        });
      }
      this.setState({
        post: data
      })
    });

  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/404" />
    }

    let post = this.state.post;
    const username = post.author.user.username;
    const timestamp = post.timestamp.replace('th', '<sup>th</sup>');

    if (post.title) {
      document.title = toTitleCase(post.title);
    }

    const authenticatedToolTip = <Tooltip>
      {post.author.user.username} is authenticated
    </Tooltip>;

    const userDetailPopover =
      <Popover id="popover-basic">
        <Popover.Title>
          {post.author.user.first_name} {post.author.user.last_name}
        </Popover.Title>
        <Popover.Content>
          {this.state.post.author.bio}
        </Popover.Content>
      </Popover>;

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1>{post.title}</h1>
            <h4 className="text-muted">
              <small>By <OverlayTrigger placement="right" overlay={userDetailPopover}>
                <b style={{cursor: "pointer", color: "#007bff"}}>{username}</b>
              </OverlayTrigger> &nbsp;
                {
                  post.author.authenticated ? <OverlayTrigger overlay={authenticatedToolTip}>
                    <small className="fas fa-check text-warning" />
                  </OverlayTrigger> : ''
                } on <span dangerouslySetInnerHTML={{__html: timestamp}} /></small>
            </h4>
            <ReactMarkdown source={post.body} renderers={{code: CodeBlock}} />
          </Container>
        </Jumbotron>
      </div>
    );

  }

}

export default Post;
