export const fetchData = (path, method) => {
	return fetch(path, { method });
};

export const isErrorResponse = (response) => {
	return (response.status >= 400);
};