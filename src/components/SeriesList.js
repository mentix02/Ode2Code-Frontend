import React, { Component } from 'react';

import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';

import { get_series } from '../api/series';

class SeriesList extends Component {

  creator;

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      series: [{}],
      next_href: null,
      previous_href: null,
    }
  }

  componentDidMount() {
    get_series(this.props.source).then(data => {
      if (!data['results']) {
        toast.error('Could not get series.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      } else {
        this.setState({
          count: data.count,
          series: data.results,
          next_href: data.next,
          previous_href: data.previous
        });
      }
    })
  }

  render() {

    const { series } = this.state;

    return (
      <Container>
        {
          this.state.count === 0 ?
            <div className="text-center">
              <h2 className="text-danger">No series available.</h2>
            </div>

            :

            <CardColumns>
              {
                series.map(
                  (item, index) => (
                    <Card key={index} className="shadow-sm">
                      <Card.Body>
                        <Card.Title>
                          {item.name} <small className="text-muted">
                          <Link to={`/a/${item.creator}`}>{item.creator}</Link></small>
                        </Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div className="d-flex justify-content-between align-items-center">
                          <Link className="btn btn-primary" to={`/s/${item.slug}`}>
                            Tutorials <span className="badge badge-light">{item.tutorial_count}</span>
                          </Link>
                          <small className="text-muted">Started on {item.timestamp}</small>
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

export default SeriesList;
