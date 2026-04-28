const API_URL = import.meta.env.VITE_API_URL;

// Helper for sending authorized requests
const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
};

export const authService = {
    signup: (data) => fetchWithAuth('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

export const taskService = {
    getTasks: () => fetchWithAuth('/tasks'),
    createTask: (title) => fetchWithAuth('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
    updateTask: (id, status) => fetchWithAuth(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
    deleteTask: (id) => fetchWithAuth(`/tasks/${id}`, { method: 'DELETE' }),
};