import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const userEmail = localStorage.getItem('userEmail') || 'User';
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        } else {
            fetchTasks();
        }
    }, [token]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;
        try {
            await axios.post('http://localhost:5000/api/tasks', 
                { title: taskTitle }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTaskTitle('');
            fetchTasks();
        } catch (err) {
            alert("Failed to add task.");
        }
    };

    const toggleComplete = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            console.error("Update error", err);
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    // Filter logic for searching
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            {/* Fantastic SaaS Background Glows */}
            <div style={styles.mainGlow}></div>
            <div style={styles.accentGlow}></div>
            <div style={styles.bottomGlow}></div>

            <div style={styles.card}>
                <div style={styles.searchWrapper}>
                    <input 
                        type="text" 
                        placeholder="🔍 Search..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                <div style={styles.header}>
                    <h2 style={styles.logo}>🚀 SyncroTask</h2>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
                
                <div style={styles.userInfo}>
                    <span style={styles.userDot}></span>
                    <p style={styles.welcome}>Logged in as: <strong>{userEmail}</strong></p>
                    {/* Added a modern SaaS badge for task count */}
                    <span style={styles.badge}>{tasks.length} Tasks</span>
                </div>

                <form onSubmit={addTask} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Plan your next big thing..." 
                        value={taskTitle} 
                        onChange={(e) => setTaskTitle(e.target.value)} 
                        style={styles.input}
                        required 
                    />
                    <button type="submit" style={styles.addBtn}>Add</button>
                </form>

                <div style={styles.taskList}>
                    {filteredTasks.length === 0 ? (
                        <p style={styles.emptyText}>
                            {searchTerm ? "No matching tasks found." : "Your workspace is clear!"}
                        </p>
                    ) : (
                        filteredTasks.map(task => (
                            <div key={task.id} style={{
                                ...styles.taskItem, 
                                borderLeft: task.completed ? '6px solid #10b981' : '6px solid #6366f1'
                            }}>
                                <span style={{ 
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#94a3b8' : '#1e293b',
                                    fontWeight: '600'
                                }}>
                                    {task.title}
                                </span>
                                <div style={styles.actionGroup}>
                                    <button onClick={() => toggleComplete(task.id)} style={styles.actionBtn}>
                                        {task.completed ? '↩️' : '✅'}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} style={styles.actionBtn}>
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { 
        position: 'relative',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#020617', // Near black base
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden'
    },
    // Background glow effects
    mainGlow: { position: 'absolute', top: '-10%', right: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)', zIndex: 0 },
    accentGlow: { position: 'absolute', bottom: '0%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)', zIndex: 0 },
    bottomGlow: { position: 'absolute', top: '20%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', zIndex: 0 },
    card: { 
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Glass effect
        backdropFilter: 'blur(20px)',
        padding: '40px', 
        borderRadius: '32px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', 
        width: '95%', 
        maxWidth: '520px',
        border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    // CRITICAL: New styling for the search wrapper
    searchWrapper: {
        position: 'absolute',
        top: '105px', // Moves it down into the empty space
        right: '40px', // Fills the space in the red box
        width: '130px', // Smaller width to fit
        zIndex: 10,
    },
    searchInput: {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        fontSize: '12px',
        outline: 'none',
        backgroundColor: '#f8fafc',
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    logo: { fontSize: '24px', fontWeight: '800', color: '#0f172a' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' },
    userDot: { width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%' },
    welcome: { color: '#475569', fontSize: '14px', margin: 0 },
    // SaaS Badge styling
    badge: { backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', color: '#6366f1' },
    logoutBtn: { backgroundColor: '#fff1f2', color: '#e11d48', border: 'none', padding: '10px 20px', borderRadius: '14px', cursor: 'pointer', fontWeight: '700' },
    form: { display: 'flex', gap: '12px', marginBottom: '30px' },
    input: { flex: 1, padding: '14px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none' },
    addBtn: { backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: 'white', border: 'none', padding: '0 25px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700' },
    taskList: { display: 'flex', flexDirection: 'column', gap: '14px' },
    taskItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', backgroundColor: '#ffffff', borderRadius: '18px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
    actionGroup: { display: 'flex', gap: '15px' },
    actionBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' },
    emptyText: { textAlign: 'center', color: '#94a3b8', fontSize: '15px', marginTop: '20px' }
};

export default Dashboard;