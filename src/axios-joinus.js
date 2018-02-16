import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://mysqlproject-f2f95.firebaseio.com/'
});

export default instance;