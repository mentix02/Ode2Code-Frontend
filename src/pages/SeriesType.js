import React, { Component } from 'react';
import { toTitleCase } from '../utils/text';
import SeriesList from '../components/SeriesList';

class SeriesType extends Component {

  render() {
    return (
      <div style={{background: "#F8F9FA"}}>
        <br/>
        <div className="container">
          <h1>Series for "{toTitleCase(this.props.match.params.slug.replace('-', ' '))}"</h1>
        </div>
        <SeriesList url={`/api/series/type/${this.props.match.params.slug}`} />
      </div>
    );
  }

}

export default SeriesType;
