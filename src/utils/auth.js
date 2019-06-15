import axios from 'axios';

let isLoggedIn = () => {
	return !!localStorage.getItem('token');
}

let isAuthorsPost = (author) => {
	if (!isLoggedIn()) {
		return false;
	} else {
		let username = JSON.parse(localStorage.getItem('author')).user.username;
		return username === author;
	}
}

let makeAuthenticatedPostRequest = (url, data) => {
	return axios.post(
		url,
		data
	).then(
		res => (res.data)
	).catch(
		err => (err.response)
	)
}

export {isLoggedIn, isAuthorsPost, makeAuthenticatedPostRequest};
