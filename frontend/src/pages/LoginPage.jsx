import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Send login request to backend
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            // 2. CRITICAL: Save the token and email to browser memory
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userEmail', res.data.user.email); 

            // 3. Show success message
            alert("Login Successful!");

            // 4. MOVE TO DASHBOARD: This changes the page automatically
            window.location.href = '/dashboard';
            
       } catch (err) {
            console.error("Login error:", err);
            alert("Login failed!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '10px' }}>Welcome Back</h2>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                    Please enter your details to sign in
                </p>
                
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input 
                            type="email" 
                            placeholder="subair@test.com" 
                            style={styles.input}
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••" 
                            style={styles.input}
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" style={styles.btn}>Login</button>
                </form>

                <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '20px' }}>
                    Don't have an account? <Link to="/register" style={{color: '#4361ee', fontWeight: 'bold'}}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' },
    btn: { padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#4361ee', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }
};

export default LoginPage;