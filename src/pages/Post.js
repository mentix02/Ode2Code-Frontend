import './styles/post.scss';
import React, { Component } from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

class Post extends Component {

  author;

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      post: {
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

  getPost() {

    const slug = this.props.match.params.slug;
    const url = `/api/blog/detail/${slug}/`;

    axios.get(url).then(res => {
      document.title = res.data.title;
      this.setState({
        post: res.data,
        redirect: false,
      });
    }).catch(res => {
      console.log(res);
      this.setState({
        redirect: true
      });
    });

  }

  componentDidMount() {
    this.getPost();
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/404" />
    }

    let post = this.state.post;
    let body = post.body || '';
    body = body.replace(/\n/g, '<br />');

    const authenticatedTooltip = <Tooltip>
      {post.author.user.username} is authenticated
    </Tooltip>;

    const userDetailPopover =
      <Popover id="popover-basic" title={`${post.author.user.first_name} ${post.author.user.last_name}`}>
      {this.state.post.author.bio}
    </Popover>;

    return (
      <Container>
        <br/><br/>
        <main role="main">
          <div className="row">
            <div className="col-md-12 blog-main">
              <div className="blog-post">
                <h2 className="blog-post-title">{post.title}</h2>
                <br/>
                <p className="blog-post-meta">
                  {post.timestamp} by <OverlayTrigger placement="right" overlay={userDetailPopover}>
                    <b style={{cursor: "pointer", color: "#007bff"}}>{post.author.user.username}</b>
                  </OverlayTrigger> &nbsp;
                  {
                    post.author.authenticated ? <OverlayTrigger overlay={authenticatedTooltip}>
                      <i className="far fa-check-circle text-warning" />
                    </OverlayTrigger> : ''
                  }
                </p>
                <div dangerouslySetInnerHTML={{__html: body}} />
              </div>
            </div>
          </div>
        </main>
      </Container>
    );
  }

}

export default Post;
