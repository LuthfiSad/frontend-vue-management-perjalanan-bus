import axios from 'axios';
import { store } from './store';

const $axios = axios.create({
  headers: {
    'Accept': 'application/json'
  }
});

$axios.interceptors.request.use(
  function(config) {
    config.url = `${import.meta.env.VITE_APP_BASE_URL}/api/${config.url}`;
    config.headers.Authorization = `Bearer ${store.state.access_token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default $axios;
