import axios from 'axios';

// 🔌 Central Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * 🔒 OUTBOUND REQUEST INTERCEPTOR
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🛡️ INBOUND RESPONSE INTERCEPTOR
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Portal session token expired. Evicting memory channels...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
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
    return response.data;
  },
  register: async (registrationData) => {
    const response = await API.post('/auth/register', registrationData);
    return response.data;
  },
};

// 🎓 Student-Specific Workspace Routes
export const studentService = {
  getDashboardData: async () => {
    const response = await API.get('/api/student/dashboard');
    return response.data;
  },

  getMyLectures: async () => {
    const response = await API.get('/api/lectures/feed');
    return response.data;
  },

  getStudentQuizzes: async () => {
    const response = await API.get('/api/quizzes/getQuiz');
    return response.data;
  },

  submitQuiz: async (quizId, data) => {
    const response = await API.post(`/api/quizzes/${quizId}/submit`, data);
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/api/student/profile');
    return response.data;
  },
};

// ⚙️ Administrative Overview Management Routes
export const adminService = {
  getAllUsers: async () => {
    const response = await API.get('/admin/users');
    return response.data;
  },
  // FIXED: Changed GET to PUT for updates
  updateUserStatus: async (userId, payload) => {
    const response = await API.put(`/admin/users/${userId}`, payload);
    return response.data;
  },
};

export default API;