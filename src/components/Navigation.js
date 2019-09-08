import React, { Component } from 'react';

import logo from '../imgs/android-chrome-512x512.png';

import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { isMobile } from 'react-device-detect';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Navigation extends Component {

  constructor(props) {
    super(props);

    const search_types = [
      'Post',
      'Series',
      'Tutorials'
    ];

    this.state = {
      search_types: search_types,
      search_type: search_types[2],
      topMobilePadding: isMobile ? '5px' : '0px',
      leftMobilePadding: isMobile ? '0px' : '20px',
      authenticated: !!localStorage.getItem('token'),
      showCookiesToast: localStorage.getItem('showCookiesToast') === 'true'
    }
  }


  componentDidMount() {

    if (this.state.showCookiesToast || localStorage.getItem('showCookiesToast') === null) {
      toast.info(<div>
          This site uses cookies. <a style={{color: "#fff", textDecoration: 'underline'}}
                                     rel="noopener noreferrer" target="_blank"
                                     href="https://cookiesandyou.com/">Learn More</a>. <br/>
                                     <Button variant="outline-light" style={{width: '50%', marginLeft: '25%'}} block size="sm">Ok</Button>
      </div>, {
        draggable: true,
        autoClose: false,
        position: toast.POSITION.BOTTOM_CENTER,
        onClose: ({arg}) => {localStorage.setItem('showCookiesToast', 'false')},
      });
    }

    if (localStorage.getItem("showSuccessfulLoginNotification")) {
      let username = JSON.parse(localStorage.getItem("author")).user.username;
      this.successNotify(
        `Successfully logged in as ${username}.`
      );
      localStorage.removeItem("showSuccessfulLoginNotification");
    } else if (localStorage.getItem("showSuccessfulLogoutNotification")) {
      this.successNotify(
        `Successfully logged out.`
      );
      localStorage.removeItem("showSuccessfulLogoutNotification");
    }
    this.setState({
      authenticated: !!localStorage.getItem('token')
    })
  }

  successNotify = (message) => toast.success(
    message, {
      position: toast.POSITION.BOTTOM_CENTER
    }
  );

  render() {
    return (
      <Navbar collapseOnSelect fixed="top" variant="dark" bg="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <img src={logo}
                   width="40"
                   height="40"
                   className="d-inline-block align-top"
                   alt="O2C logo"/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Types">
                <LinkContainer to="/algorithms">
                  <NavDropdown.Item>
                    Algorithms
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/data_structures">
                  <NavDropdown.Item>
                    Data Structures
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Guides">
                <LinkContainer to="/series">
                  <NavDropdown.Item>
                    Series
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/tutorials">
                  <NavDropdown.Item>
                    Tutorials
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item>
                  Documentation
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <InputGroup>
                <DropdownButton variant="outline-warning" as={InputGroup.Prepend} title={this.state.search_type} >
                  {
                    this.state.search_types.map(
                      (search_type, index) => (
                        <Dropdown.Item active={this.state.search_type === search_type}
                                       key={index} type="button" as="button" onClick={() => {
                                         this.setState({search_type: search_type})
                        }}>{search_type}</Dropdown.Item>
                      )
                    )
                  }
                </DropdownButton>
                <FormControl
                  style={{width: '270px'}}
                  name="query"
                  type="search"
                  autoComplete="off"
                  placeholder="Search"
                  autoFocus={true}
                />
                <InputGroup.Append>
                  <Button variant="outline-info">
                    <i className="fas fa-search" />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            {
              this.state.authenticated

              ?

                <Nav style={{paddingLeft: this.state.leftMobilePadding, paddingTop: this.state.topMobilePadding}}>
                  <NavDropdown title="Create">
                    <LinkContainer to="/new/post">
                      <NavDropdown.Item>
                        Post
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new/series">
                      <NavDropdown.Item>
                        Series
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new/tutorial">
                      <NavDropdown.Item>
                        Tutorial
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title={JSON.parse(localStorage.getItem('author')).user.username}>
                    <LinkContainer to="/account">
                      <NavDropdown.Item>
                        Account
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/manage">
                      <NavDropdown.Item>
                        Manage
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                    <LinkContainer to="/logout">
                      <NavDropdown.Item>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </Nav>

                :

                <Nav style={{paddingLeft: this.state.leftMobilePadding, paddingTop: this.state.topMobilePadding}}>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Navigation;
