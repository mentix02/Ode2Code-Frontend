import React, { Component } from 'react';

import axios from 'axios';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import InfiniteScroll from 'react-infinite-scroller';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {isAuthorsPost, isLoggedIn} from '../utils/auth';

function onlyDifferentIdTuts(value, index, self) {
  return self.indexOf(value) === index;
}

class TutorialList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      tutorials: [],
      next_href: null,
      likedTutorialIds: [],
      has_more_items: true,
    }
  }

  getTutorials() {

    let url = this.props.url;

    if (this.state.next_href) {
      url = this.state.next_href;
    }

    axios.get(url).then(
      res => {

        if (res.data.count === 0) {
          toast.warn(`No tutorials yet for "${this.props.series}".`, {
            position: toast.POSITION.BOTTOM_CENTER
          })
        }

        let tutorials = this.state.tutorials;
        let more_tutorials = res.data.results;

        for (let i = 0; i < more_tutorials.length; i++) {
          tutorials.push(more_tutorials[i]);
        }

        if(res.data.next) {
          this.setState({
            tutorials: tutorials,
            count: res.data.count,
            next_href: res.data.next
          });
        } else {
          tutorials = tutorials.filter(onlyDifferentIdTuts);
          this.setState({
            has_more_items: false,
            tutorials: [tutorials],
          });
        }

      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );

  }

  getRecentTutorials() {
    console.log('Getting recent tutorials.');
    const url = '/api/tutorials/recent/';
    axios.get(url).then(
      res => {
        this.setState({
          tutorials: res.data.results
        });
      }
    ).catch(
      err => {
        console.log(err.response);
      }
    );
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
    } else {
      toast.error("Please log in to like tutorials.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  likeButtonClick(id) {
    this.likeTutorial(id);
  }

  getLikedTutorialIds() {
    if (isLoggedIn()) {

      let authData = new FormData();
      authData.set('token', localStorage.getItem('token'));

      axios({
        data: authData,
        method: 'post',
        url: '/api/authors/liked/tutorials/',
        config: {headers: {'Content-Type': 'multipart/form-data'}}
      }).then(
        res => {
          this.setState({
            has_more_items: false,
            likedTutorialIds: res.data.results
          });
        }
      ).catch(
        err => {console.log(err.response)}
      );

    }
  }

  componentDidMount() {
    this.getLikedTutorialIds();
  }

  render() {

    const loader = (
      <div style={{paddingBottom: '20px'}} className="text-center" key={0}>
        <br/>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );

    return (
      <div>
        <div className="album py-5 bg-light">
          <Container>
            <InfiniteScroll pageStart={0}
                            hasMore={this.state.has_more_items}
                            loadMore={ this.props.url === '/api/tutorials/recent/' ?
                              this.getRecentTutorials.bind(this) : this.getTutorials.bind(this)}
                            loader={loader}>
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
                               src={tutorial.thumbnail || 'https://picsum.photos/1900/1080/?image=1'}/>
                          <Card.Body>
                            <Card.Title>
                              {tutorial.title} <small className="text-muted">{tutorial.author}</small>
                            </Card.Title>
                            <Card.Text>
                              <Link to={`series/${slugify(tutorial.series || '')}`}><small>{tutorial.series}</small></Link>
                              <hr />
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
                                  }/>
                                </Button>
                                {
                                  isAuthorsPost(tutorial.author) ? <Button size="sm" variant="outline-success">
                                    <i className="fas fa-pencil-alt"/>
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
            </InfiniteScroll>
          </Container>
        </div>
      </div>
    );
  }
}

export default TutorialList;
