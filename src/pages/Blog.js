import React, { Component } from 'react';

import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import CardColumns from 'react-bootstrap/CardColumns';
import { LinkContainer } from 'react-router-bootstrap';

class Blog extends Component {

  slug;

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  getPosts() {

    const url = 'http://localhost:8000/api/blog/';

    axios.get(url).then(res => {
      this.setState({
        posts: res.data
      });
    }).catch(res => {
      console.log(res)
    })

  }

  componentDidMount() {
    this.getPosts();
  }

  render() {

    document.title = 'Blog';
    const {posts} = this.state;

    return (
      <Container>
        <br/>
        <CardColumns>
          {posts.map(
            (post, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <LinkContainer to={`/detail/${post.slug}`}>
                    <Button variant="primary">Read more</Button>
                  </LinkContainer>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{post.timestamp}</small>
                </Card.Footer>
              </Card>
            )
          )}
        </CardColumns>
      </Container>
    );
  }
}

export default Blog;
