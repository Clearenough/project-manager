import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Boards from './pages/Boards';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFound';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

import './App.scss';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/registration" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
