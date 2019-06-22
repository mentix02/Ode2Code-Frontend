import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { isLoggedIn } from '../utils/auth';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InfiniteScroll from 'react-infinite-scroller';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Series extends Component {

  creator;

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      next_href: null,
      has_more_items: true
    }
  }

  getSeries() {
    let url = '/api/series/';

    if (this.state.next_href) {
      url = this.state.next_href;
    }

    axios.get(url).then(res => {

      let series = this.state.series;

      for (let i = 0; i < res.data.results.length; i++) {
        series.push(res.data.results[i]);
      }

      if (res.data.next) {
        this.setState({
          series: series,
          next_href: res.data.next
        });
      } else {
        this.setState({
          series: series,
          has_more_items: false
        });
      }

    }).catch(err => {
      console.log(err.response);
    });

  }

  render() {

    document.title = 'Series';
    const loader = (
      <div style={{paddingBottom: '20px'}} className="text-center" key={0}>
        <br/>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
    const {series} = this.state;

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-3">
              Series
            </h1>
            <hr/>
            <p>
              Ode2Code is a trove of knowledge in the form of tutorials, blog posts and reference documentation. But for a beginner, these things can be overwhelming.
              They sure were for me. Thus it was decided to group together similar tutorials in the sense they are about a particular language, data type, design, or
              something similar under a particular series.
            </p>
            <p>
              Now this doesn't mean that if you're an aspiring writer and come across a tutorial that doesn't do justice to a topic you possess mastery over, then you
              can't write another series for it. You sure can. And if it's better than the earlier one, then surely it'll get more votes and thus will come up higher
              in search results and listings.
            </p>
          </Container>
        </Jumbotron>
        <div className="album py-5 bg-light">
          <Container>
            <InfiniteScroll pageStart={0}
                            loadMore={this.getSeries.bind(this)}
                            hasMore={this.state.has_more_items}
                            loader={loader}>
              <div className="row">
              {
                series.map(
                  (series, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card mb-4 shadow-sm">
                        <img alt={series.title}
                             className="bg-placeholder-img card-img-top"
                             width="100%"
                             height="225"
                             src={series.thumbnail || 'https://picsum.photos/1900/1080/?image=1'} />
                        <Card.Body>
                          <Card.Title>
                              {series.name} <small className="text-muted">
                            <Link to="/">{series.creator}</Link></small>
                          </Card.Title>
                          <Card.Text>
                            {series.description}
                          </Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <ButtonGroup className="shadow-sm">
                              <Link className="btn btn-outline-secondary btn-sm" to={`/s/${series.slug}`}>Details</Link>
                              {
                                isLoggedIn() ? <Button size="sm" variant="outline-primary"><i className="far fa-bookmark" /></Button> : ''
                              }
                            </ButtonGroup>
                            <small className="text-muted">Started on {series.timestamp}</small>
                          </div>
                        </Card.Body>
                      </div>
                    </div>
                  )
                )
              }
              </div>
            </InfiniteScroll>
          </Container>
        </div>
      </div>
    );
  }

}

export default Series;
