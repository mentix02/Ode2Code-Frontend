import '../styles/fourohfour.scss';

import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

class FourOhFour extends Component {

  render() {

    document.title = '404 Not Found Error';

    return (
      <Container>
        <br/>
        <Row>
          <Col md={12}>
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">The page you requested was not found.</div>
              <div className="error-actions">
                <Link to="/home" className="btn btn-info">
                  <i className="fas fa-home" />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

}

export default FourOhFour;
