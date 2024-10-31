import React, { useState } from 'react';
import styles from './adminLogin.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);
      localStorage.setItem('access_token', data.access_token);
      console.log('Login successful', data);
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage =
        typeof err === 'object' && err !== null && 'message' in err
          ? (err as { message?: string }).message || 'Login failed'
          : 'Login failed';

      setError(errorMessage);
      console.error('Login failed', err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.logo}>
        <img
          src="/images/retalkLogo.png"
          alt="retalk"
          className={styles.logoImage}
        />
      </header>

      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Sign In</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}{' '}
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
          <div className={styles.orSeparator}>or</div>
          <div className={styles.socialButtons}>
            <button className={styles.socialButton}>Sign in with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
