import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/auth/login';
import Signup from '../src/components/auth/signup';
import PasswordRecovery from '../src/components/auth/passwordRecovery';
import SecretMessageForm from '../src/components/message/secretMessageForm';
import SecretMessageBoard from '../src/components/message/secretMessageBoard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recover-password" element={<PasswordRecovery />} />
          <Route path="/post-secret" element={<SecretMessageForm />} />
          <Route path="/secrets" element={<SecretMessageBoard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
