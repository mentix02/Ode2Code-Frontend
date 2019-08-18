import React, { Component } from 'react';

import Tooltip from 'react-bootstrap/Tooltip';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import TutorialList from '../../components/TutorialList';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { get_author_details } from '../../utils/auth';

class Author extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: {
        bio: '',
        authenticated: '',
        user: {
          username: '',
          last_name: '',
          first_name: '',
          date_joined: '',
        },
      },
      mounted: false
    }
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    get_author_details(username).then(data => {
      this.setState({
        author: data,
        mounted: true
      });
    });
  }

  render() {

    const {author} = this.state;
    const {user} = author;
    const timestamp = user.date_joined.replace('th', '<sup>th</sup>');


    const authenticatedToolTip = <Tooltip>
      {user.username} is authenticated
    </Tooltip>;

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1>
              {author.user.username} {
              author.authenticated ? <OverlayTrigger overlay={authenticatedToolTip}>
                <small><small className="fas fa-check text-info" /></small>
              </OverlayTrigger> : ''
            }
            </h1>
            <h3>
              <small style={{fontSize: '80%'}} className="text-muted">
                {user.first_name} {user.last_name} joined on <span dangerouslySetInnerHTML={{__html: timestamp}} />.
              </small>
              <br/>
              <small className="text-muted">
                {author.bio}
              </small>
            </h3>
          </Container>
        </Jumbotron>
        <h4 className="container">Tutorials by {user.username}</h4> <br/>
        {
          this.state.mounted ?
            <TutorialList source={`/api/authors/detail/${user.username}/tutorials/`} />
            :
            ''
        }
      </div>
    );
  }

}

export default Author;
