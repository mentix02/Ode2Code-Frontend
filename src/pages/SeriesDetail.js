import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../utils/text';
import { isAuthorsSeries } from '../utils/auth';
import TutorialList from '../components/TutorialList';
import { Jumbotron, Container, Button } from 'react-bootstrap';

class SeriesDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      series: {
        creator: '',
        tutorial_count: null
      }
    }
  }

  getSeries() {

    const slug = this.props.match.params.slug;
    const url = `/api/series/detail/${slug}/`;

    axios.get(url).then(
      res => {
        this.setState({
          series: res.data
        })
      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );

  }

  componentDidMount() {
    this.getSeries();
  }

  render() {

    const {series} = this.state;
    const creator = series.creator;

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-4">
              {series.name}
            </h1>
            <h4 className="text-muted">
              By <Link to={`/a/${creator}`}>{creator}</Link> under <Link to={`/st/${series.type_of}`}>{series.type_of}</Link>
            </h4>
            <p>
              {series.description}
            </p>
            {
              isAuthorsSeries(creator) ? <Link className="btn btn-success" to="/new/tutorial/">write</Link> : ''
            }
          </Container>
        </Jumbotron>
        { this.state.series.tutorial_count ? <TutorialList series_detail={true} series={series.name} url={`/api/series/detail/${series.slug}/tutorials/`} />
        : <h2 className="text-center">No tutorials yet.</h2> }
      </div>
    );
  }

}

export default SeriesDetail;
