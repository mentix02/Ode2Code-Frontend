import React, { Component } from 'react';

import { get_posts } from '../api/blog';

import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import { LinkContainer } from 'react-router-bootstrap';

class PostList extends Component {

  slug;
  author;

  constructor(props) {

    super(props);

    let url = new URL(window.location.href);
    let current_page = url.searchParams.get('page') ? url.searchParams.get('page').toString() : '1';

    this.state = {
      count: 0,
      posts: [{}],
      next_href: null,
      previous_href: null,
      current_page: current_page,
    }

  }

  componentDidMount() {
    get_posts(this.state.current_page).then(data => {
      if (data.data) {
        toast.error('Could not get posts.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        this.setState({
          count: 0,
        });
      } else {
        this.setState({
          count: data.count,
          posts: data.results,
          next_href: data.next,
          previous_href: data.previous,
        });
      }
    });
  }

  render() {

    document.title = 'Blog Posts';

    const {posts} = this.state;
    let pages = [];

    for (let page = 1; page <= Math.floor(this.state.count / 12) + 1; page++) {
      pages.push(
        <li className={"page-item " + (this.state.current_page === page.toString() ? " active" : "" )}>
          <a className="page-link" key={page} href={`/blog?page=${page}`}>
            {page}
          </a>
        </li>
      );
    }

    return (
      <div>
        <br/>
        <Container>
          {

            this.state.count === 0

            ?

            <div className="text-center">
              <h2 className="text-danger">No posts available.</h2>
            </div>

            :

              <CardColumns>
              {
                posts.map(
                  (post, index) => (
                    <Card key={index}>
                      <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                        <LinkContainer to={`/p/${post.slug}`}>
                          <Button variant="primary">Read more</Button>
                        </LinkContainer>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">{post.author} &nbsp; - &nbsp; {post.timestamp}</small>
                      </Card.Footer>
                    </Card>
                  )
                )
              }
            </CardColumns>
          }
          <br />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <ul className="pagination">
              {pages}
            </ul>
          </div>
        </Container>
      </div>
    );
  }

}

export default PostList;
