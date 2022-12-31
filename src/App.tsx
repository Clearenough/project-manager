import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Boards from './pages/Boards';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFound';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

import './App.scss';
import Footer from './components/Footer/Footer';
import Board from './pages/Board';

function App() {
  const token = localStorage.getItem('TOKEN_AUTH_LOCALSTORAGE');

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:id" element={<Board />} />
            <Route path="/registration" element={token ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
            <Route path="pageNotFound" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="pageNotFound" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
