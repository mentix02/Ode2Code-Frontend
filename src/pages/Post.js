import './styles/post.scss';
import React, { Component } from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

class Post extends Component {

  author;

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      redirect: false
    }
  }

  getPost() {

    const slug = this.props.match.params.slug;
    const url = `http://localhost:8000/api/blog/${slug}/`;

    axios.get(url).then(res => {
      document.title = res.data.post.title;
      this.setState({
        post: res.data.post,
        redirect: false
      });
    }).catch(res => {
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

    const post = this.state.post;
    let body = post.body || '';
    body = body.replace(/\n/g, '<br />');

    return (
      <Container>
        <br/><br/>
        <main role="main">
          <div className="row">
            <div className="col-md-12 blog-main">
              <div className="blog-post">
                <h2 className="blog-post-title">{post.title}</h2>
                <br/>
                <p className="blog-post-meta">{post.timestamp} by {post.author}</p>
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
