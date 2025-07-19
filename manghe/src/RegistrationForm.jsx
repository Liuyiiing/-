// src/RegistrationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = () => {
    // 这里可以添加实际的注册逻辑，比如调用 API
    console.log(`Username: ${username}, Password: ${password}`);
    // 模拟注册成功后跳转到登录页
    navigate('/login');
  };

  return (
    <div className="registration-form">
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
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default RegistrationForm;