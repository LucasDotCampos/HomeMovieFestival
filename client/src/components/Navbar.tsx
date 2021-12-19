import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { nav } from '../style/global';

export default function Nav() {
  const { isLogged } = useAuth();

  const Lsu = () => {
    if (localStorage.getItem('auth') == 'false') {
      return (
        <>
          <Link to="/user" style={nav.navbarItems}>
            User
          </Link>
          <Link to="/login" style={nav.navbarItems}>
            Log In
          </Link>
          <Link to="/signup" style={nav.navbarItems}>
            Sign Up
          </Link>
        </>
      );
    }
  };

  return (
    <nav style={nav.navbar}>
      <div>
        <Link to="/" style={nav.navbarItems}>
          Home
        </Link>
      </div>
      <div>
        {isLogged ? (
          <>
            <Link to="/user" style={nav.navbarItems}>
              User
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={nav.navbarItems}>
              Log In
            </Link>
            <Link to="/signup" style={nav.navbarItems}>
              Sign Up
            </Link>
          </>
        )}
        <Link to="/movies" style={nav.navbarItems}>
          Movies
        </Link>
        <Link to="/newmovie" style={nav.navbarItems}>
          New Movie
        </Link>
      </div>
    </nav>
  );
}
