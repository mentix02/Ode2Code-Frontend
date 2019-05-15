import axios from 'axios';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Card, Container, CardColumns } from "react-bootstrap";

class Contributors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contributors: []
    }
  }

  getContributors() {

    const url = 'https://api.github.com/repos/mentix02/django/contributors';

    const page = queryString.parse(this.props.location.search).page || 1;

    axios.get(`${url}?page=${page}`).then(res => {
      this.setState({
        contributors: res.data
      });
    }).catch(res => {console.log(res)});
  }

  componentDidMount() {
    this.getContributors();
  }


  render() {

    const {contributors} = this.state;

    return (
      <Container>
        <br/>
        <h1 className="text-center">Contributors</h1>
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
