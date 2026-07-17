import axios from 'axios';

// 🔌 Initialize central instance pointing to your server node environment
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // Drop hung requests after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 🔒 OUTBOUND REQUEST INTERCEPTOR
 * Automatically attaches your secure JWT credentials to headers before hit endpoints
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Standard Bearer token authentication pattern
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 🛡️ INBOUND RESPONSE INTERCEPTOR
 * Intercepts common server errors globally (like expired login tokens)
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if server specifically rejected our access profile due to expiration
    if (error.response && error.response.status === 401) {
      console.warn('Portal session token expired. Evicting memory channels...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Forces page reload to clean up memory structures if route bounds catch it
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?session=expired';
      }
    }
    return Promise.reject(error);
  }
);

/* ==========================================
   🎯 MODULAR ENDPOINT DATA CONTRACTS
   ========================================== */

// 🔐 Authentication Endpoint Routes
export const authService = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data; // Expects back { token, user: { id, email, role, username } }
  },
  register: async (registrationData) => {
    const response = await API.post('/auth/register', registrationData);
    return response.data;
  },
};

// 🎓 Student-Specific Workspace Routes
export const studentService = {
  getDashboardData: async () => {
    const response = await API.get('/student/dashboard');
    return response.data; // Returns enrolled courses and upcoming timelines
  },
  getProfile: async () => {
    const response = await API.get('/student/profile');
    return response.data;
  },
};

// ⚙️ Administrative Overview Management Routes
export const adminService = {
  getAllUsers: async () => {
    const response = await API.get('/admin/users');
    return response.data;
  },
  updateUserStatus: async (userId, payload) => {
    const response = await API.get(`/admin/users/${userId}`, payload);
    return response.data;
  },
};

export default API;