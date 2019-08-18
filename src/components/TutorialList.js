import React, { Component } from 'react';

import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { slugify } from '../utils/string';
import { get_tutorials } from '../api/tutorials';

class TutorialList extends Component {

  constructor(props) {

    super(props);

    let url = new URL(window.location.href);
    let current_page = url.searchParams.get('page') ? url.searchParams.get('page').toString() : '1';

    this.state = {
      count: 0,
      tutorials: [],
      next_href: null,
      previous_href: null,
      current_page: current_page,
    }

  }

  componentDidMount() {
    get_tutorials(this.props.source).then(data => {
      console.log('TUTORIAL LIST DATA : ', data);
      if (!data['results']) {
        toast.error('Could not load tutorials.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else {
        this.setState({
          count: data.count,
          next_href: data.next,
          tutorials: data.results,
          previous_href: data.previous,
        });
      }
    });
  }

  render() {

    const {tutorials} = this.state;

    return (
      <Container>
        {
          this.state.count === 0 ?

            <div className="text-center">
              <h2 className="text-danger">No tutorials available.</h2>
            </div>

            :

            <CardColumns>
              {
                tutorials.map(
                  (tutorial, index) => (
                    <Card key={index}>
                      <Card.Body>
                        <Card.Title>
                          {tutorial.title} <small className="text-muted">
                          <Link to={`/a/${tutorial.author}`}>{tutorial.author}</Link><br/>
                        </small>
                        </Card.Title>
                        <Card.Text>{tutorial.description}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div className="d-flex justify-content-between align-items-center">
                          <ButtonGroup>
                            <Link className="btn btn-outline-primary" to={`/t/${tutorial.slug}`}>
                              Read
                            </Link>
                            {
                              tutorial.series ?
                                <Link className="btn btn-outline-secondary"
                                      to={`/s/${slugify(tutorial.series)}`}>Series</Link>
                                :
                                <Button disabled variant="outline-secondary">No Series</Button>
                            }
                          </ButtonGroup>
                          <small className="text-muted">Started on {tutorial.timestamp}</small>
                        </div>
                      </Card.Footer>
                    </Card>
                  )
                )
              }
            </CardColumns>
        }
      </Container>
    );

  }

}

export default TutorialList;
