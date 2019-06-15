import React, { Component } from 'react';

import './styles/utils.scss';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Home extends Component {
  render() {

    document.title = 'Ode2Code';

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-4">Hello, world!</h1>
            <hr/>
            <p>
              Welcome, coder! Ode2Code is an online trove of commonly used algorithms ranging from simple
              linear searching to Dijkstra's algorithm and data structures starting from singly linked
              lists to complex graphs implemented in a multitude of languages.
            </p>
            <p>
              This is an open source project and anyone is welcome to contribute to the development
              of this website. A mirror of the site is hosted <a rel="noopener noreferrer"
                                                                 target="_blank" href="http://mentix02.github.io">here</a>.
            </p>
            <p>
              All new updates will be posted on the official blog. If you have any suggestions for
              the betterment of the site or you come across an error either in the working of the
              site or in the code, feel free to make a pull request with the fix and earn your spot
              in the <Link to="/contributors">list of contributors</Link> along with our eternal gratefulness.
              <br/>
              <br/>
              <Link to="/blog" className="btn btn-primary">
                Blog
              </Link>
              &nbsp;&nbsp;
              <Link to="/tutorials" className="btn btn-success">
                Tutorials
              </Link>
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
