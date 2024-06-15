import axios from '../config/axios';

const categoryApi = {};

categoryApi.getAllCategory = () => axios.get('/categorys');

export default categoryApi;
