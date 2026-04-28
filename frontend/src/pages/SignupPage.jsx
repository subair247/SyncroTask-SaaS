import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://syncrotask-saas.onrender.com/api/auth/register', { email, password });
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Signup failed. Email might already be taken.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default SignupPage;