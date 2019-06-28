import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import {toTitleCase} from '../utils/text';
import { Jumbotron, Container } from 'react-bootstrap';
import TutorialList from '../components/TutorialList';

class SeriesDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      series: {
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

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-4">
              {series.name}
            </h1>
            <Link to={`/st/${series.type_of}`}>
              <h4 className="text-muted">{toTitleCase(series.type_of || "")}</h4>
            </Link>
            <p>
              {series.description}
            </p>
          </Container>
        </Jumbotron>
        { this.state.series.tutorial_count ? <TutorialList series_detail={true} series={series.name} url={`/api/series/detail/${series.slug}/tutorials/`} />
        : <h2 className="text-center">No tutorials yet.</h2> }
      </div>
    );
  }

}

export default SeriesDetail;
