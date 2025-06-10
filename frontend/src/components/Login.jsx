import React, { useState, useRef } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false); // State to trigger shaking animation

  const navigate = useNavigate();
  const emailRef = useRef(); // Ref for focusing back on the email input

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const { token, role, brand } = response.data;

      // Store the token securely alongside brand as well
      localStorage.setItem('token', token);
      localStorage.setItem('brand', brand);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'vendor') {
        navigate('/vendor-dashboard', { state: { brand } });
      } else {
        setError('Invalid role. Contact support');
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Login failed. Please check your credentials and try again');

      // Trigger shaking animation
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset the shake state after animation ends

      // Clear input fields
      setEmail("");
      setPassword("");

      // Focus back on email input
      emailRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.loginBox} ${shake ? styles.shake : ''}`}> {/* Add shake class conditionally */}
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
              ref={emailRef} // Attach ref to the email input
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>} {/* Show error message */}
          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
