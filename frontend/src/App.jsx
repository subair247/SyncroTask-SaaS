import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
    // This helper function checks if the user is logged in
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null;
    };

    return (
        <Router>
            <Routes>
                
                <Route 
                    path="/login" 
                    element={<LoginPage />} 
                />

                
                <Route 
                    path="/register" 
                    element={<RegisterPage />} 
                />

        
                <Route 
                    path="/dashboard" 
                    element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
                />

                
                <Route 
                    path="/" 
                    element={<Navigate to="/dashboard" />} 
                />

                
                <Route 
                    path="*" 
                    element={<Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
}

export default App;