import axios from 'axios';

const BASE_URL = '/api/tutorials';

let get_tutorials = (url = `${BASE_URL}/recent/`) => {
  return axios.get(url).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let create_tutorial = data => {
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

let get_tutorial = slug => {
  const url = `${BASE_URL}/detail/${slug}/`;
  return axios.get(url).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let delete_tutorial = slug => {
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

export {get_tutorials, get_tutorial, delete_tutorial, create_tutorial};
