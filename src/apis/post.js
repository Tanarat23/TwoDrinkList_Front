import axios from '../config/axios';

const postApi = {};

postApi.createEvent = (body) => axios.post('/posts/createPost', body);

postApi.getEvent = () => axios.get('/posts');

postApi.deleteEvent = (postId) => axios.delete(`/posts/${postId}`);

postApi.getEventById = (postId) => axios.get(`/posts/${postId}`);

postApi.updateEvent = (postId, body) => axios.patch(`/posts/${postId}`, body);

export default postApi;
