import axios from 'axios';

import { isLoggedIn } from '../utils/auth';

const BASE_URl = '/api/authors';

let authLogin = (username, password) => {
  let formData = new FormData();
  formData.set('username', username);
  formData.set('password', password);
  return axios({
    data: formData,
    method: 'post',
    url: `${BASE_URl}/auth/`,
    config: {headers: {'Content-Type': 'multipart/form-data'}}
  }).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let authorContent = () => {

  if (isLoggedIn()) {
    const token = localStorage.getItem('token');
    return axios.get(`${BASE_URl}/content/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => (
      res.data
    )).catch(err => (
      err.response
    ));
  } else {
    return {NotLoggedIn: true}
  }
};

export {authLogin, authorContent};
