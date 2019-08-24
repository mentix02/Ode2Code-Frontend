import '../../styles/timeline.css';

import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag" style={{ background: data.category.color }}>
          {data.category.tag}
      </span>
      <time>{data.time}</time>
      <p>{data.text}</p>
      {data.link && (
        <Link
          to={data.link.url}
        >
          {data.link.text}
        </Link>
      )}
      <span className="circle" />
    </div>
  </div>
);

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{category: {}}]
    }
  }

  componentDidMount() {
    axios.get('http://192.168.100.8:5555/timeline/').then(res => {
      this.setState({
        data: res.data
      });
    }).catch(err => {
      console.log(err.response);
    });
  }

  render() {

    document.title = "Timeline";

    return (
      <Container>
        <br/>
        <h1 className="text-center">Timeline</h1>
        <div className="timeline-container">
          {
            this.state.data.map(
              (item, index) => (
                <TimelineItem key={index} data={item} />
              )
            )
          }
        </div>
      </Container>
    );
  }
}

export default Timeline;
