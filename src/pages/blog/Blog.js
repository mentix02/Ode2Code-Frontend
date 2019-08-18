import React, { Component } from 'react';

import PostList from '../../components/PostList';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Blog extends Component {

  render() {

    document.title = 'Blog';

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-4">Blog Posts</h1>
            <p>Wanna write something technical but it's not educational? Pour your heart out for the world to see.</p>
            <p>If you have a new project that you open sourced and wanna announce it, be our guest and write about it. If you
            have solved the halting problem, be our guest and write about it. If you wanna rant about GitHub being acquire by
            Microsoft and that will cause the end of the world, be our guest and write about it.</p>
            <p>
              Basically... <Link className="btn btn-primary" to="/new/post/">write</Link> as much as you can.
            </p>
          </Container>
        </Jumbotron>
        <Container>
          <PostList />
        </Container>
      </div>
    );
  }

}

export default Blog;
