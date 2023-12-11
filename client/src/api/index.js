import axios from 'axios';

const baseURL =
	import.meta.env.VITE_ENV === 'development'
		? import.meta.env.VITE_BASE_URL_DEVELOPMENT
		: import.meta.env.VITE_BASE_URL_PRODUCTION;

const API = axios.create({ baseURL });

API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response) {
			console.error('Network error: Please check your internet connection.');
			return Promise.reject(error);
		}

		const statusCode = error.response.status;

		switch (statusCode) {
			case 400:
				console.error('Bad Request: The request was unacceptable.');
				break;
			case 401:
				console.error('Unauthorized: Access is denied due to invalid credentials.');
				break;
			case 403:
				console.error('Forbidden: You do not have the necessary permissions.');
				break;
			case 404:
				console.error('Not Found: The requested resource does not exist.');
				break;
			case 500:
				console.error('Internal Server Error: Something went wrong on the server.');
				break;
			default:
				console.error(`An error occurred: ${statusCode} - ${error.response.statusText}`);
		}

		return Promise.reject(error);
	}
);

export const shoeAPI = {
	getAllShoes: () => API.get('/shoes'),
	updateShoe: (shoe, shoeId) => API.put(`/shoes/${shoeId}`, shoe),
	addShoe: (shoe) => API.post('/shoes', shoe),
	deleteShoe: (shoeId) => API.delete(`/shoes/${shoeId}`),
};
