import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { toTitleCase } from '../../utils/string';
import { get_series_detail } from '../../api/series';
import TutorialList from '../../components/TutorialList';
import { linkNoStyle } from '../../styles/jsObjectStyles';

class SeriesDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
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
      this.setState({
        series: data,
        mounted: true
      });
    });
  }

  render() {

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
          </Container>
          {
            this.state.mounted ?
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
