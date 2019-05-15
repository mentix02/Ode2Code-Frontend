import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardColumns from 'react-bootstrap/CardColumns';

class Blog extends Component {
  render() {
    return (
      <Container>
        <br/>
        <CardColumns>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text>
              <Link to="/" className="btn btn-primary">Read more</Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">15th of May, 2019</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text>
              <Link to="/" className="btn btn-primary">Read more</Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">15th of May, 2019</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text>
              <Link to="/" className="btn btn-primary">Read more</Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">15th of May, 2019</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">20th March, 2019</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">6th of Feb, 2019</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">1st of Jan, 2019</small>
            </Card.Footer>
          </Card>
        </CardColumns>
      </Container>
    );
  }
}

export default Blog;
