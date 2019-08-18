import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { Card, Container, CardColumns } from 'react-bootstrap';

class Contributors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      contributors: [],
    }
  }

  getContributors() {

    const url = 'https://api.github.com/repos/mentix02/Ode2Code-Backend/contributors';

    const page = queryString.parse(this.props.location.search).page || 1;

    axios.get(`${url}?page=${page}`).then(res => {
      this.setState({
        contributors: res.data
      });
    }).catch(res => {
      toast.error("Not connected to the Internet.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    });

  }

  componentDidMount() {
    this.getContributors();
  }

  render() {

    document.title = 'Contributors';
    const {contributors} = this.state;

    return (
      <Container className="text-center">
        <br/>
        <h1>Contributors</h1>
        <hr/>
        <CardColumns>
          {contributors.map(
            (contributor, index) => (
              <Card key={index}>
                <Card.Img src={contributor['avatar_url']} />
                <Card.Body className="text-center">
                  <Card.Title>
                    <a rel="noopener noreferrer" target="_blank"
                       href={contributor['html_url']}
                       style={{textDecoration: 'none'}}>{contributor['login']}</a></Card.Title>
                  <Card.Subtitle>Contributions : {contributor['contributions']}</Card.Subtitle>
                </Card.Body>
              </Card>
            )
          )}
        </CardColumns>
      </Container>
    );
  }

}

export default Contributors;
