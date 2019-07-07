import React, { Component } from 'react';

import axios from 'axios';
import Remarkable from 'remarkable';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../utils/text';
import { Jumbotron, Container } from 'react-bootstrap';

class TutorialDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorial: {
        content: '',
        series: '',
        author: {
          user: {
            username: ''
          }
        }
      }
    }
  }

  getTutorial() {
    const slug = this.props.match.params.slug;
    const url = `/api/tutorials/detail/${slug}/`;
    axios.get(url).then(
      res => {
        this.setState({tutorial: res.data});
      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );
  }

  getRawMarkup() {
    const md = new Remarkable();
    return {
      __html: md.render(this.state.tutorial.content || '')
    }
  }

  componentDidMount() {
    this.getTutorial();
  }

  render() {

    const {tutorial} = this.state;
    const {username} = tutorial.author.user;
    document.title = toTitleCase(tutorial.title || '');
    const series_slug = tutorial.series.replace(/\s/g, '-').toLowerCase();

    /*let content = tutorial.content || '';
    content = content.split('\n').map((para, index) => {
      return <p key={index}>{para}</p>
    });*/

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1>By {tutorial.title}</h1>
            <hr/>
            <h5 style={{paddingBottom: '1px'}}>
              By <Link to={`/a/${username}`}>{username}</Link> under "<Link to={`/s/${series_slug}`}>
              {tutorial.series}</Link>" on {tutorial.timestamp}
            </h5>
            <h5 className="text-muted" style={{fontSize: '117%'}}>{tutorial.description}</h5>
            <br/>
            <div dangerouslySetInnerHTML={this.getRawMarkup()} />
          </Container>
        </Jumbotron>
      </div>
    );
  }

}

export default TutorialDetail;
