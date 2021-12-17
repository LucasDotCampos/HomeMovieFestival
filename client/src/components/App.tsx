// React
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

// Components
import Signup from './Signup';
import Login from './Login';
import Nav from './Navbar';
import Dashboard from './Dashboard';
import Movies from '../pages/Movies';
import Home from '../pages/Home';
import Newmovie from '../pages/Insert';

// Bootstrap
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <div>
              <Nav />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/newmovie" element={<Newmovie />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user" element={<Dashboard />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
