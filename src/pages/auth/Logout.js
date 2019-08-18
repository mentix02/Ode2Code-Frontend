import { Component } from 'react';

class Logout extends Component {

  render() {

    localStorage.clear();
    localStorage.setItem("showSuccessfulLogoutNotification", true);
    window.location = "/";
    return ""
  }

}

export default Logout;
