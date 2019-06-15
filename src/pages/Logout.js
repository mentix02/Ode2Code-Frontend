import { Component } from 'react';

class Logout extends Component {

  render() {

    localStorage.removeItem('token');
    window.location = "/";
    return ""
  }

}

export default Logout;
