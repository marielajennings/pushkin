import Axios from 'axios';

export default Axios.create({
	headers: { 'Content-Type': 'application/json' },
	baseURL: process.env.NODE_ENV === 'production' ? '/api/sktc' : '//localhost/api/sktc'
});
