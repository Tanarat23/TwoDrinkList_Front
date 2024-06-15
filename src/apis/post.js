import axios from '../config/axios';

const postApi = {};

postApi.createEvent = (body) => axios.post('/posts/createPost', body);

export default postApi;
