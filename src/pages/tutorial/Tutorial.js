import React, { Component } from 'react';

import CodeBlock from '../../components/Code';
import { toTitleCase } from '../../utils/string';
import { get_tutorial } from '../../api/tutorials';
import { linkNoStyle } from '../../styles/jsObjectStyles';

import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class Tutorial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorial: {
        series: '',
        content: '',
        timestamp: '',
        author: {
          user: {
            username: '',
            last_name: '',
            first_name: '',
          },
          bio: '',
          authenticated: null
        }
      }
    }
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    get_tutorial(slug).then(data => {
      this.setState({
        tutorial: data
      });
    });
  }

  render() {

    const {tutorial} = this.state;
    const {username} = tutorial.author.user;
    const timestamp = tutorial.timestamp.replace('th', '<sup>th</sup>');
    document.title = toTitleCase(tutorial.title || '');
    const series_slug = tutorial.series ? tutorial.series.replace(/\s/g, '-').toLowerCase() : '';

    const authenticatedToolTip = <Tooltip>
      {tutorial.author.user.username} is authenticated
    </Tooltip>;

    const userDetailPopover =
      <Popover id="popover-basic">
        <Popover.Title>
          {tutorial.author.user.first_name} {tutorial.author.user.last_name}
        </Popover.Title>
        <Popover.Content>
          {tutorial.author.bio}
        </Popover.Content>
      </Popover>;

    return (
      <Jumbotron>
        <Container>
          <h1>{tutorial.title}</h1>
          <hr/>
          <h4 className="text-muted">
            <small>By
              <OverlayTrigger placement="right" overlay={userDetailPopover}>
                <Link to={`/a/${username}`} style={linkNoStyle}> {username}</Link>
              </OverlayTrigger> &nbsp;
              {
                tutorial.author.authenticated ? <OverlayTrigger overlay={authenticatedToolTip}>
                  <small className="fas fa-check text-info" />
                </OverlayTrigger> : ''
              } on <span dangerouslySetInnerHTML={{__html: timestamp}} /> 
              {
                tutorial.series ?
                  <div> under <Link style={linkNoStyle} to={`/s/${series_slug}`}> {tutorial.series}</Link></div>
                  :
                  ''
              }
              <br/>
              {tutorial.description}
            </small>
          </h4>
          <hr/>
          <ReactMarkdown source={tutorial.content} renderers={{code: CodeBlock}} />
        </Container>
      </Jumbotron>
    );
  }

}

export default Tutorial;
