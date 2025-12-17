import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // তোমার server URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Export default
export default axiosInstance;
