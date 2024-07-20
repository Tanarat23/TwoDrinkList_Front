import axios from '../config/axios';

const authApi = {};

// send parameter to endpoint
authApi.register = (body) => axios.post('/auth/register', body);
authApi.login = (body) => axios.post('/auth/login', body);
authApi.getAuthUser = () => axios.get('/auth/me');
authApi.updateUser = (userId, body) => axios.patch(`/auth/${userId}`, body);

export default authApi;
