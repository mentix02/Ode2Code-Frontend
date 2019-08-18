import axios from 'axios';

const BASE_URL = '/api/series';

let get_series = (url = BASE_URL) => {
  return axios.get(url).then(res => (
    res.data
  )).catch(
    err => (err.response)
  );
};

let get_series_detail = slug => {
  const url = `${BASE_URL}/detail/${slug}`;
  return axios.get(url).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

let create_series = data => {
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

let delete_series = (slug) => {
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

let get_series_for_new_tutorial = () => {
  return axios.get(`${BASE_URL}/names/`).then(res => (
    res.data
  )).catch(err => (
    err.response
  ));
};

export {get_series, get_series_detail, delete_series, create_series, get_series_for_new_tutorial};
