import React, { Component } from 'react';

import { toast } from 'react-toastify';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { Link, Redirect } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { toTitleCase } from '../../utils/string';
import { get_series_detail } from '../../api/series';
import TutorialList from '../../components/TutorialList';
import { linkNoStyle } from '../../styles/jsObjectStyles';

class SeriesDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      redirect: false,
      series: {
        name: '',
        slug: '',
        type_of: '',
        timestamp: '',
        description: '',
        creator: {
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
    get_series_detail(slug).then(data => {
      if (data.status) {
        toast.error('Could not load series.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        this.setState({
          redirect: true
        })
      } else {
        this.setState({
          series: data,
          loaded: true,
        });
      }
    });
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/404" />
    }

    const series = this.state.series;
    const username = series.creator.user.username;
    const timestamp = series.timestamp.replace('th', '<sup>th</sup>');

    const authenticatedToolTip = <Tooltip>
      {username} is authenticated
    </Tooltip>;

    const userDetailPopover =
      <Popover id="popover-basic">
        <Popover.Title>
          {series.creator.user.first_name} {series.creator.user.last_name}
        </Popover.Title>
        <Popover.Content>
          {series.creator.bio}
        </Popover.Content>
      </Popover>;

    return (
      <div>
        <Jumbotron>
          <Container>
            {
              this.state.loaded ?
                <div>
                  <h1>{series.name}</h1>
                  <hr/>
                  <h4 className="text-muted">
                    <small>
                      Started by
                      <OverlayTrigger placement="right" overlay={userDetailPopover}>
                        <Link to={`/a/${username}`} style={linkNoStyle}> {username}</Link>
                      </OverlayTrigger>&nbsp;
                      {
                        series.creator.authenticated ? <OverlayTrigger overlay={authenticatedToolTip}>
                          <small className="fas fa-check text-dark" />
                        </OverlayTrigger> : ''
                      } on <span dangerouslySetInnerHTML={{__html: timestamp}} /> under <Link to={`/st/${series.type_of}`}>
                      {toTitleCase(series.type_of)}</Link>
                    </small>
                  </h4>
                  <p>{series.description}</p>
                </div>
                :
                <h1 className="text-danger text-center">Error 500</h1>
            }
          </Container>
          {
            this.state.loaded ?
              <TutorialList source={`/api/series/detail/${series.slug}/tutorials/`}/>
              :
              ''
          }
        </Jumbotron>
      </div>
    );
  }

}

export default SeriesDetail;
