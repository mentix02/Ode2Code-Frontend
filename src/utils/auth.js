import axios from 'axios';

const BASE_URL = '/api/authors';

let isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

let get_author_details = username => {
  return axios.get(`${BASE_URL}/detail/${username}`).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

export {isLoggedIn, get_author_details};
