import React, { Component } from 'react';

import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div style={{maxWidth: '960px'}} className="container text-center">
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <img className="mb-2" src={"/android-chrome-512x512.png"} alt="" width="50" height="50" />
              <small className="d-block mb-3 text-muted">&copy; 2019</small>
            </div>
            <div className="col-6 col-md">
              <h5>Contribute</h5>
              <ul className="list-unstyled text-small">
                <li><a target="_blank"
                       className="text-muted"
                       rel="noopener noreferrer"
                       href="https://github.com/mentix02/Ode2Code-Frontend">Source Code</a></li>
                <li><a target="_blank"
                       className="text-muted"
                       rel="noopener noreferrer"
                       href="https://github.com/mentix02/Ode2Code-Frontend/issues/new">Request Feature</a></li>
                <li><Link className="text-muted" to="/contributors">Contributors & Authors</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md">
              <h5>About</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="/">Team</a></li>
                <li><a className="text-muted" href="/">Locations</a></li>
                <li><a className="text-muted" href="/">Terms & Condition</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
