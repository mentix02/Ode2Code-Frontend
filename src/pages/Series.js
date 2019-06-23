import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import SeriesList from "../components/SeriesList";

class Series extends Component {

  render() {

    document.title = 'Series';

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
        <SeriesList url="/api/series/" />
      </div>
    );
  }

}

export default Series;
