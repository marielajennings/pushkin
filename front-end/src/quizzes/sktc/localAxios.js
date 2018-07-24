import Axios from 'axios';

export default Axios.create({
	baseURL:
	process.env.NODE_ENV === 'production'
		? '/api/sktc'
		: '//localhost/api/sktc'
});
