import React, { Component } from 'react';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { 
  isLoggedIn,
  isAuthorsPost } from '../utils/auth';

class Tutorials extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
      likedTutorialIds: [],
    }
  }

  componentDidMount() {
    this.getTutorials();
  }

  getTutorials() {
    axios.get('/api/tutorials/recent/').then(res => {
      this.setState({
        tutorials: res.data
      })
    }).catch(err => {
      console.log(err)
    });
    this.getLikedTutorialIds();
  }

  likeTutorial(tutorial_id) {
    if (isLoggedIn()) {
      let tutorialAndAuthData = new FormData();
      tutorialAndAuthData.set('tutorial_id', tutorial_id);
      tutorialAndAuthData.set('token', localStorage.getItem('token'));
      axios({
        method: 'post',
        data: tutorialAndAuthData,
        url: '/api/tutorials/like/',
        config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(
        res => {
          let likedTutorialIds = this.state.likedTutorialIds;
          if (res.data.action === -1) {
            for (let i = 0; i < likedTutorialIds.length; i++) {
              if (likedTutorialIds[i] === tutorial_id) {
                likedTutorialIds.splice(i, 1);
              }
            }
          } else if (res.data.action === 1) {
            likedTutorialIds.push(tutorial_id);
          }
          this.setState({
            likedTutorialIds: likedTutorialIds
          })
        }
      ).catch(
        err => {console.log(err.response)}
      );
    }
  }

  likeButtonClick(id) {
    this.likeTutorial(id);
  }

  getLikedTutorialIds() {
    let authData = new FormData();
    authData.set('token', localStorage.getItem('token'));
    if (isLoggedIn()) {
      axios({
        data: authData,
        method: 'post',
        url: '/api/authors/liked/tutorials/',
        config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(
        res => {
          this.setState({
            likedTutorialIds: res.data
          });
        }
      ).catch(
        err => {console.log(err.response)}
      );
    }
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
        <div className="album py-5 bg-light">
          <Container>
            <div className="row">
              {
                this.state.tutorials.map(
                  (tutorial, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card mb-4 shadow-sm">
                        <img alt={tutorial.title}
                             className="bg-placeholder-img card-img-top"
                             width="100%"
                             height="225"
                             src={tutorial.thumbnail || 'https://picsum.photos/1900/1080/?image=1'} />
                        <Card.Body>
                          <Card.Title>
                            {tutorial.title} <small className="text-muted">{tutorial.author}</small>
                          </Card.Title>
                          <Card.Text>
                            {tutorial.description}
                          </Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <ButtonGroup className="shadow-sm">
                              <Button size="sm" variant="outline-secondary">Read</Button>
                              <Button size="sm" variant={
                                this.state.likedTutorialIds.includes(tutorial.id) ? 'danger' : 'outline-danger'
                              } onClick={() => this.likeButtonClick(tutorial.id)}>
                                  <i className={ 
                                    this.state.likedTutorialIds.includes(tutorial.id) ? 
                                    'fas fa-heart' : 'far fa-heart'
                                    } />
                              </Button>
                              {
                                isAuthorsPost(tutorial.author) ? <Button size="sm" variant="outline-success">
                                  <i className="fas fa-pencil-alt" />
                                </Button> : ''
                              }
                            </ButtonGroup>
                            <small className="text-muted">{tutorial.timestamp}</small>
                          </div>
                        </Card.Body>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </Container>
        </div>
      </div>
    );
  }

}

export default Tutorials;
