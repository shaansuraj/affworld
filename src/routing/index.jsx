import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Home from '../pages'
import Login from '../components/auth/login'
import PasswordRecovery from '../components/auth/passwordRecovery'
import Signup from '../components/auth/signup'
import SecretMessageBoard from '../components/message/secretMessageBoard'
import SecretMessageForm from '../components/message/secretMessageForm'
import ProtectedRoute from './protectedRoute';

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recover-password" element={<PasswordRecovery />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/post-secret" element={<SecretMessageForm />} />
            <Route path="/secrets" element={<SecretMessageBoard />} />
      </Route>
        </Routes>
    )
}

export default Routing
