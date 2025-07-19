import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import './App.css'
import LoginForm from './LoginForm.jsx';
import WelcomePage from './WelcomePage.jsx';
import RegistrationForm from './RegistrationForm.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/welcome"
          element={isLoggedIn ? <WelcomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={<RegistrationForm />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
