import React, { Component } from 'react';

import { delete_post } from '../api/blog';
import { isLoggedIn } from '../utils/auth';
import { authorContent } from '../api/auth';
import { delete_series } from '../api/series';
import { delete_tutorial } from '../api/tutorials';

import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Redirect, Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Manage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    authorContent().then(data => {
      if (data['results']) {
        this.setState({
          content: data.results
        });
      } else {
        toast.error('Something went wrong.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    });
  }

  updateContent(index) {
    let data = this.state.content;
    data.splice(index, 1);
    this.setState({
      content: data
    });
  }

  delete(slug, type, index) {
    const options = {
      position: toast.POSITION.BOTTOM_CENTER
    };
    switch (type) {
      case 'post':
        delete_post(slug).then(data => this.updateContent(index));
        toast.warn(`Deleted post.`, options);
        break;
      case 'tutorial':
        delete_tutorial(slug).then(data => this.updateContent(index));
        toast.warn(`Deleted tutorial.`, options);
        break;
      case 'series':
        delete_series(slug).then(data => {document.location.reload()});
        toast.warn(`Deleted series.`, options);
        break;
      default:
        toast.error('Not implemented yet.');
    }
  }

  render() {

    if (!isLoggedIn()) {
      toast.error('You need to be logged in to do that.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return <Redirect to="/login" />
    }

    document.title = "Manage";

    return (
      <div>
        <Container>
          <br/><br/>
          <h1 style={{fontSize: '225%'}}>Manage Your Content</h1>
          <br/>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Type
                </th>
                <th>
                  Name
                </th>
                <th>
                  Timestamp
                </th>
                <th>
                  Draft
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.content.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.type}</td>
                    <td>
                      {
                        item.draft ?
                          item.title ?
                            item.title : item.name
                          :
                          <Link to={`${item.type[0].toLowerCase()}/${item.slug}`}>
                            {item.title ? item.title : item.name}
                          </Link>
                      }
                    </td>
                    <td>{item.timestamp}</td>
                    <td>{item.draft ? <i className="fas fa-check text-success"/> : <i className="fas fa-times text-danger" />}</td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button variant="success">
                          <i className="fas fa-pencil-alt" />
                        </Button>
                        <Button onClick={() => this.delete(item.slug, item.type.toLowerCase(), index)} variant="danger">
                          <i className="fas fa-trash" />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              )
            }
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Manage;
