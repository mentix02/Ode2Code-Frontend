import './styles/login.scss';
import logo from './imgs/logo.png';

import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="login-body">
          <form className="form-signin">
            <img src={logo} alt="logo" className="mb-4" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
            <label htmlFor="username" className="sr-only">Username</label>
            <input id="username" className="form-control" autoComplete="off"
                   placeholder="Username" required autoFocus />
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password" required />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; Ode2Code 2019</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
