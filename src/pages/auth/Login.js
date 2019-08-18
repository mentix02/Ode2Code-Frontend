import React, { Component } from 'react';

import '../../styles/write.scss';
import { toast } from 'react-toastify';
import { authLogin } from '../../api/auth';
import { Redirect } from 'react-router-dom';
import logo from '../../imgs/android-chrome-512x512.png';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: {
        user: {
          username: ''
        }
      },
      username: '',
      password: '',
      remember: true,
      auth_successful: localStorage.getItem('author')
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  errorNotify = (message) => toast.error(
    message, {
      position: toast.POSITION.BOTTOM_CENTER
    }
  );

  submitForm(e) {
    e.preventDefault();
    authLogin(this.state.username, this.state.password).then(data => {
      console.log(data);
      if (data.token) {
        this.setState({
          author: data.author,
          auth_successful: true,
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('author', JSON.stringify(data.author));
        localStorage.setItem('showSuccessfulLoginNotification', 'true');
        window.location = '/';
      } else if (data.data && data.data.error === 'Invalid credentials.') {
        this.errorNotify(data.data.error);
      } else if (data.status !== 200) {
        this.errorNotify('Something went wrong. Try again later. Apologies for inconvenience.');
      }
    });
  }

  render() {

    if (this.state.auth_successful) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="text-center">
        <div className="login-body">
          <form className="form-signin" method="post"
                onSubmit={this.submitForm}>
            <img src={logo} alt="logo" className="mb-4" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
            <label htmlFor="username" className="sr-only">Username</label>
            <input id="username" onChange={this.handleInputChange}
                   className="form-control" autoComplete="off" name="username"
                   placeholder="Username" required autoFocus />
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" onChange={this.handleInputChange}
                   autoComplete="off" className="form-control" placeholder="Password"
                   required name="password" />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" name="remember" onChange={this.handleInputChange}
                       value="remember-me" checked={this.state.remember } /> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            <p className="mt-5 mb-3 text-muted">&copy; Ode2Code 2019</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
