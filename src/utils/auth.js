function isLoggedIn() {
	return !!localStorage.getItem("token");
}

function isAuthorsPost(author) {
	if (!isLoggedIn()) {
		return false;
	} else {
		let username = JSON.parse(localStorage.getItem('author')).user.username;
		return username === author;
	}
}

export {isLoggedIn, isAuthorsPost};
