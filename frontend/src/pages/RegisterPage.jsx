import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://syncrotask-saas.onrender.com/api/auth/register', { email, password });
            alert("Registration Successful! Now please login.");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Registration failed! This email might already be registered.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Join SyncroTask</h2>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>Create an account to manage your tasks</p>
                
                <form onSubmit={handleRegister} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            type="email" placeholder="name@example.com" style={styles.input}
                            value={email} onChange={(e) => setEmail(e.target.value)} required 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" placeholder="Create a password" style={styles.input}
                            value={password} onChange={(e) => setPassword(e.target.value)} required 
                        />
                    </div>
                    <button type="submit" style={styles.btn}>Sign Up</button>
                </form>
                
                <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '20px' }}>
                    Already have an account? <Link to="/login" style={{color: '#4361ee', fontWeight: 'bold'}}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' },
    btn: { padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#4361ee', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }
};

export default RegisterPage;