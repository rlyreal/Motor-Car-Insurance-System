import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../common/toast';
import '../../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    setToast({ message: 'Logging in...', type: 'success', isLoading: true });
    
    // Simulate login delay
    setTimeout(() => {
      localStorage.setItem('user', username);
      setToast(null);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="login-container">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isLoading={toast.isLoading}
          showProgress={!toast.isLoading}
          onClose={() => setToast(null)} 
          duration={3000}
        />
      )}
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
