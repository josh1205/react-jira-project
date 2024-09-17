import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';

const API_URL = 'http://localhost:3000';

const securedAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const plainAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

securedAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const method = config.method?.toUpperCase();
  if (method !== 'OPTIONS' && method !== 'GET') {
    const headers = new AxiosHeaders(config.headers);
    headers.set('X-CSRF-TOKEN', localStorage.getItem('csrf') || '');
    config.headers = headers;
  }
  return config;
});

securedAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.config && error.response.status === 401) {
      return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.getItem('csrf') || '' } })
        .then(response => {
          localStorage.setItem('csrf', response.data.csrf);
          localStorage.setItem('signedIn', 'true');

          const retryConfig = error.response!.config;
          const headers = new AxiosHeaders(retryConfig.headers);
          headers.set('X-CSRF-TOKEN', localStorage.getItem('csrf') || '');
          retryConfig.headers = headers;
          return plainAxiosInstance.request(retryConfig);
        }).catch(error => {
          localStorage.removeItem('csrf');
          localStorage.removeItem('signedIn');

          location.replace('/');
          return Promise.reject(error);
        });
    } else {
      return Promise.reject(error);
    }
  }
);

export { securedAxiosInstance, plainAxiosInstance };