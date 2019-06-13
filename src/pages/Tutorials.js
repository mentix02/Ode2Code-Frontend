import React, { Component } from 'react';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardColumns from 'react-bootstrap/CardColumns';

class Tutorials extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorials: []
    }
  }

  componentDidMount() {
    this.getTutorials();
  }

  getTutorials() {
    axios.get('http://127.0.0.1:8000/api/tutorials/recent/').then(res => {
      this.setState({
        tutorials: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {

    document.title = 'Tutorials';

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-3">
              Tutorials
            </h1>
            <hr/>
            <p>
              Ode2Code was initially meant to be a reference library for common algorithms, data structures, libraries, etc.
              But then I remembered how I've always wanted to teach people and so I incorporated a tutorials section. Over here,
              you'll find posts for both beginners and professionals who want to learn a new technology from scratch.
            </p>
            <p>
              Now, I don't promise to put up tutorials of all the languages out there as there's thousands of them out there.
              And there isn't a method for people to write new tutorials just yet. But it's coming soon. After that, it'll all depend
              on how many people contribute. <b>I</b> will personally try to write as many as I can but only about things <b>I'm </b>
              comfortable with. That only includes the bare essentials. I recommend starting with <a href="https://python.org">Python</a>.
            </p>
            <p>
              If you're still uncertain where to start from or what to learn next, don't worry. I have a timeline drafted out for you
              that lists out the tutorials you should follow if you're a complete novice. Have fun!
              <br/>
              <br/>
              <Link to="/timeline" className="btn btn-primary">
                Timeline
              </Link>
            </p>
          </Container>
        </Jumbotron>
        <Container className="text-center">
          <br/>
          <CardColumns>
            {
              this.state.tutorials.map(
                (tutorial, index) => (
                  <Card key={index}>
                    <Card.Body className="text-center">
                      <Card.Title>
                        {tutorial.title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                )
              )
            }
          </CardColumns>
        </Container>
      </div>
    );
  }

}

export default Tutorials;
