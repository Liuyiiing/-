import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 基本验证
    if (!username || !password) {
      alert('请填写用户名和密码');
      return;
    }
    
    if (username.length < 3 || password.length < 6) {
      alert('用户名至少3位，密码至少6位');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:7001/user/login', { username, password });
      if (response.data.code === 0) {
        onLoginSuccess();
        navigate('/welcome');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('登录过程中发生错误');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default LoginForm;