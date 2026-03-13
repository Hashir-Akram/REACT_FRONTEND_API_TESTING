import axios from 'axios';

// Use environment variable for API URL in production, fallback to Vite proxy in development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Methods
const apiService = {
  // Authentication
  login: (email, password) => api.post('/login', { email, password }),
  register: (userData) => api.post('/register', userData),
  getMe: () => api.get('/me'),
  updateMe: (userData) => api.put('/me', userData),
  
  // Health check
  healthCheck: () => api.get('/health'),
  getAnalyticsSummary: () => api.get('/analytics/summary'),
  
  // Users
  getUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),

  // Projects
  getProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (projectData) => api.post('/projects', projectData),
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  archiveProject: (id) => api.patch(`/projects/${id}/archive`),
  deleteProject: (id) => api.delete(`/projects/${id}`),

  // Tasks
  getTasks: (params) => api.get('/tasks', { params }),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  updateTaskStatus: (id, taskData) => api.patch(`/tasks/${id}/status`, taskData),
  bulkUpdateTasks: (payload) => api.patch('/tasks/bulk-update', payload),
  deleteTask: (id) => api.delete(`/tasks/${id}`),

  // Comments
  getTaskComments: (taskId) => api.get(`/tasks/${taskId}/comments`),
  createTaskComment: (taskId, payload) => api.post(`/tasks/${taskId}/comments`, payload),
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),

  // Audit logs
  getAuditLogs: (params) => api.get('/audit-logs', { params }),
  
  // Reset
  resetDatabase: () => api.post('/reset'),
};

export default apiService;
