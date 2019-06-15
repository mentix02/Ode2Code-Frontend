import './styles/login.scss';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import logo from './imgs/logo.png';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import React, { Component } from 'react';

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
      auth_successful: null
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

  successNotify = (message) => toast.success(
    message, {
      position: toast.POSITION.BOTTOM_CENTER
    }
  );

  errorNotify = (message) => toast.error(
    message, {
      position: toast.POSITION.BOTTOM_CENTER
    }
  );

  submitForm(e) {

    e.preventDefault();

    const url = 'http://localhost:8000/api/authors/auth/';

    let formData = new FormData();

    formData.set('username', this.state.username);
    formData.set('password', this.state.password);

    axios({
      url: url,
      method: 'post',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(
      res => {
        this.setState({
          successful_login: true,
          author: res.data.author,
        });
        this.successNotify(`Successfully logged in as ${res.data.author.user.username}.`);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("author", JSON.stringify(res.data.author));
        return (
          <Redirect to="/" />
        );
      }
    ).catch(
      err => {
        this.errorNotify(err.response.data.error);
      }
    );

  }

  render() {

    if (this.state.successful_login) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div className="text-center">
        <div className="login-body">
          <form className="form-signin" onSubmit={this.submitForm}>
            <img src={logo} alt="logo" className="mb-4" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
            <label htmlFor="username" className="sr-only">Username</label>
            <input id="username" onChange={this.handleInputChange}
                   className="form-control" autoComplete="off" name="username"
                   placeholder="Username" required autoFocus />
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" onChange={this.handleInputChange}
                   className="form-control" placeholder="Password" required name="password" />
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
