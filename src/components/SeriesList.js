import axios from 'axios';
import _ from 'underscore';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import React, { Component } from 'react';
import { isLoggedIn } from '../utils/auth';
import { toTitleCase } from '../utils/text';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import InfiniteScroll from 'react-infinite-scroller';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class SeriesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      next_href: null,
      has_more_items: true,
      bookmarkedSeriesIds: [],
    }
  }

  getBookmarkedSeriesIds() {
    if (isLoggedIn()) {
      let authData = new FormData();
      authData.set('token', localStorage.getItem('token'));
      axios({
        data: authData,
        method: 'post',
        url: '/api/authors/bookmarked/series/',
        config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(
        res => {
          this.setState({
            bookmarkedSeriesIds: res.data.results
          });
        }
      ).catch(
        err => {
          console.log(err.response);
        }
      )
    }
  }

  bookmarkSeries(series_id) {
    if (isLoggedIn()) {
      let seriesAndAuthData = new FormData();
      seriesAndAuthData.set('series_id', series_id);
      seriesAndAuthData.set('token', localStorage.getItem('token'));
      axios({
        method: 'post',
        data: seriesAndAuthData,
        url: '/api/series/bookmark/',
        config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(
        res => {
          console.log(res.data.action);
          let bookmarkedSeriesIds = this.state.bookmarkedSeriesIds;
          if (res.data.action === -1) {
            for (let i = 0; i < bookmarkedSeriesIds.length; i++) {
              if (bookmarkedSeriesIds[i] === series_id) {
                bookmarkedSeriesIds.splice(i, 1);
              }
            }
          } else if (res.data.action === 1) {
            bookmarkedSeriesIds.push(series_id);
          }
          this.setState({
            bookmarkSeriesIds: bookmarkedSeriesIds
          })
        }
      ).catch(
        err => {
          console.log(err.response);
        }
      )
    }
  }

  bookmarkButtonClick(id) {
    this.bookmarkSeries(id);
  }

  componentDidMount() {
    this.getBookmarkedSeriesIds();
  }

  getSeries() {

    let url = this.props.url;

    if (this.state.next_href) {
      url = this.state.next_href;
    }

    axios.get(url).then(res => {

      let series = this.state.series;

      for (let i = 0; i < res.data.results.length; i++) {
        series.push(res.data.results[i]);
      }

      series = _.uniq(series, true, item => {
        return item.id
      });

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
                            <Link to={`/st/${series.type_of}`}>{toTitleCase(series.type_of.replace('_', ' '))}</Link>
                            <hr/>
                            {series.description}
                          </Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <ButtonGroup className="shadow-sm">
                              <Link className="btn btn-outline-secondary btn-sm" to={`/s/${series.slug}`}>Details</Link>
                              {
                                isLoggedIn() ? <Button size="sm" onClick={() => this.bookmarkButtonClick(series.id)} variant={
                                  this.state.bookmarkedSeriesIds.includes(series.id) ? 'primary' : 'outline-primary'
                                }><i className={
                                  this.state.bookmarkedSeriesIds.includes(series.id) ?
                                    "fas fa-bookmark" : "far fa-bookmark"} /></Button> : ''
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
    );
  }

}

export default SeriesList;
