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
import Newmovie from '../pages/NewMovie';
import { PrivateRoute } from './PrivateRoute';

// Bootstrap
import { Container } from 'react-bootstrap';
import NotFound from './NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Container
          className=" d-flex align-items-center justify-content-center"
          style={{
            marginTop: '80px',
          }}
        >
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route
                path="/newmovie"
                element={<PrivateRoute element={Newmovie} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={Dashboard} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
