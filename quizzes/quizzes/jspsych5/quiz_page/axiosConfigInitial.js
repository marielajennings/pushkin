import Axios from 'axios';

export default Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api/jspsych5'
      : '//localhost/api/jspsych5'
});
