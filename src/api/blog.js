import axios from 'axios';

let BASE_URL = '/api/blog';

let get_posts = (page = 1) => {
  return axios.get(`${BASE_URL}?page=${page}`).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let get_post = slug => {
  return axios.get(`${BASE_URL}/detail/${slug}`).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let create_post = data => {
  return axios({
    data: data,
    method: 'post',
    url: `${BASE_URL}/new/`,
    config: {headers:{'Content-Type': 'multipart/form-data'}}
  }).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let delete_post = slug => {
  return axios.delete(`${BASE_URL}/delete/${slug}/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  }).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

export {get_posts, get_post, create_post, delete_post};
