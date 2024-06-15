import axios from '../config/axios';

const locationApi = {};

locationApi.getAllLocation = () => axios.get('/locations');

export default locationApi;
