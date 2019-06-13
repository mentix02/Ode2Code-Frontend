import React, { Component } from 'react';

import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import InfiniteScroll from 'react-infinite-scroller';
import CardColumns from 'react-bootstrap/CardColumns';
import { LinkContainer } from 'react-router-bootstrap';

class Blog extends Component {

  slug;

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      next_href: null,
      has_more_items: true
    };
  }

  getPosts() {

    let url = 'http://localhost:8000/api/blog/';

    if (this.state.next_href) {
      url = this.state.next_href;
    }

    axios.get(url).then(res => {

      let posts = this.state.posts;

      for (let i = 0; i < res.data.results.length; i++) {
        posts.push(res.data.results[i]);
      }

      if (res.data.next) {
        this.setState({
          posts: posts,
          next_href: res.data.next
        });
      } else {
        this.setState({
          posts: posts,
          has_more_items: false
        });
      }

    }).catch(res => {
      console.log(res)
    })

  }

  render() {

    document.title = 'Blog';
    const loader = (
      <div style={{paddingBottom: '20px'}} className="text-center" key={0}>
        <br/>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
    const {posts} = this.state;

    return (
      <Container>
        <br/>
        <InfiniteScroll pageStart={0}
                        loadMore={this.getPosts.bind(this)}
                        hasMore={this.state.has_more_items}
                        loader={loader}>
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
        </InfiniteScroll>
      </Container>
    );
  }
}

export default Blog;
