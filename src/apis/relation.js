import axios from '../config/axios';

const relationApi = {};

relationApi.createRelation = (body) => axios.post('/relations', body);
relationApi.deleteRelation = (postId) => axios.delete(`/relations/${postId}`);

export default relationApi;
