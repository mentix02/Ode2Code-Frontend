import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav,
         Form,
         Button,
         Navbar,
         Container,
         InputGroup,
         FormControl,
         NavDropdown, } from 'react-bootstrap';


class TopNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchWidth: '270px',
      topMobilePadding: isMobile ? '5px' : '0px',
      leftMobilePadding: isMobile ? '0px' : '20px',
      authenticated: !!localStorage.getItem("token"),
    };

    this.expandSearchInput = this.expandSearchInput.bind(this);
    this.shrinkSearchInput = this.shrinkSearchInput.bind(this);

  }

  componentDidMount() {
    if (localStorage.getItem("showSuccessfulAuthNotification")) {
      let username = JSON.parse(localStorage.getItem("author")).user.username;
      this.successNotify(
        `Successfully logged in as ${username}.`
      );
      localStorage.removeItem("showSuccessfulAuthNotification");
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
      <Navbar collapseOnSelect fixed="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
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
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <NavDropdown title="References">
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
            {

              this.state.authenticated

              ?

                <Nav style={{paddingLeft: this.state.leftMobilePadding, paddingTop: this.state.topMobilePadding}}>
                  <LinkContainer to="/logout">
                    <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                </Nav>

                :

                <Nav style={{paddingLeft: this.state.leftMobilePadding, paddingTop: this.state.topMobilePadding}}>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </Nav>

            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default TopNavbar;
