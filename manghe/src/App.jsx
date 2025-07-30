import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import './App.css'
import LoginForm from './LoginForm.jsx';
import WelcomePage from './WelcomePage.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import Shop from './shop.jsx';
import Choose from './choose.jsx';
import List from './list.jsx';

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
          path="/shop"
          element={<Shop />}
        />
        <Route
          path="/choose/:productId"
          element={<Choose />}
        />
        <Route
          path="/list"
          element={<List />}
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
