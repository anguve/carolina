import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FaUserCircle } from 'react-icons/fa';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      console.log(data);

      localStorage.setItem('token', data.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <FaUserCircle className="user-icon" />
      <form className="custom-form" onSubmit={handleLogin}>
        <label className="custom-label">Email:</label>
        <input
          onChange={event => setEmail(event.target.value)}
          placeholder="email@example.com"
          className="custom-input"
          type="email"
          required
        />
        <label className="custom-label">Password:</label>
        <input
          onChange={event => setPassword(event.target.value)}
          placeholder="password"
          className="custom-input"
          type="password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button className="custom-button" type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
