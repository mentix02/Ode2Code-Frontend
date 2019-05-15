import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import {Navbar, Nav, Form, Button, FormControl, InputGroup, Container,} from 'react-bootstrap';

const no_decoration = {
  textDecoration: 'none'
};

class TopNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchWidth: '270px'
    };

    this.expandSearchInput = this.expandSearchInput.bind(this);
    this.shrinkSearchInput = this.shrinkSearchInput.bind(this);

  }

  expandSearchInput() {
    if (!isMobile) {
      this.setState({
        searchWidth: '400px'
      });
    }
  }

  shrinkSearchInput() {

    if (!isMobile) {
      this.setState({
        searchWidth: '270px'
      });
    }

  }

  render() {
    return (
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={"/android-chrome-512x512.png"}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="O2C logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-item" style={no_decoration} to="/">
                <div className="nav-link">
                  Home
                </div>
              </Link>
              <Link className="nav-item" style={no_decoration} to="/blog">
                <div className="nav-link">
                  Blog
                </div>
              </Link>
              <Link className="nav-item" style={no_decoration} to="/algorithms">
                <div className="nav-link">
                  Algorithms
                </div>
              </Link>
              <Link className="nav-item" style={no_decoration} to="/data_structures">
                <div className="nav-link">
                  Data Structures
                </div>
              </Link>
            </Nav>
            <Form inline>
              <InputGroup>
                <FormControl
                  style={{width: this.state.searchWidth}}
                  name="query"
                  type="search"
                  autoComplete="off"
                  placeholder="Search"
                  aria-label="search query"
                  onBlur={this.shrinkSearchInput}
                  onClick={this.expandSearchInput}
                />
                <InputGroup.Append>
                  <Button variant="outline-info">
                    <i className="fas fa-search"> </i>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default TopNavbar;
