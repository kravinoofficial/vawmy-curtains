import { useState, useEffect, ReactNode, FormEvent } from 'react';
import './auth.css';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const authToken = sessionStorage.getItem('admin_auth');
    if (authToken) {
      try {
        const [storedUser, storedPass] = atob(authToken).split(':');
        const validUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
        const validPass = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme';
        
        if (storedUser === validUser && storedPass === validPass) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('admin_auth');
          setIsAuthenticated(false);
        }
      } catch {
        sessionStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme';

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (username === validUsername && password === validPassword) {
        const authToken = btoa(`${username}:${password}`);
        sessionStorage.setItem('admin_auth', authToken);
        setIsAuthenticated(true);
      } else {
        setError('Invalid username or password');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Still checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner"></div>
      </div>
    );
  }

  // Not authenticated - show login form
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Vawmy Curtains</h1>
            <h2>Admin Portal</h2>
          </div>
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Credentials are stored in environment variables</p>
          </div>
        </div>
      </div>
    );
  }

  // Force refresh credentials
  const handleRefreshAuth = () => {
    sessionStorage.removeItem('admin_auth');
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme';
    const authToken = btoa(`${validUsername}:${validPassword}`);
    sessionStorage.setItem('admin_auth', authToken);
    alert('Credentials refreshed! Page will reload.');
    window.location.reload();
  };

  // Authenticated - render children with logout option
  return (
    <>
      {children}
      <div style={{ position: 'fixed', top: '1.5rem', right: '2rem', display: 'flex', gap: '0.75rem', zIndex: 1001 }}>
        <button 
          onClick={handleRefreshAuth}
          className="auth-refresh-btn"
          title="Refresh credentials from .env file"
        >
          🔄 Refresh
        </button>
        <button 
          onClick={handleLogout}
          className="auth-logout-btn"
          title="Logout"
        >
          🚪 Logout
        </button>
      </div>
    </>
  );
};

export default AuthGuard;
