import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useState } from 'react';
import { maxHeaderSize } from 'http';

function Nav() {
  const [isActive, setActive] = useState(false);

  function toggleMenu() {
    setActive(!isActive);
  }

  const style = {
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '50px',
      boxShadow: ' 1px 1px 1px #c1c1c1',
      marginBottom: '32px',
    },
    navbarItens: {
      margin: '8px',
    },
  };

  return (
    <nav className="navbar is-white" style={style.navbar}>
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          home
        </Link>
      </div>
      <div
        className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}
        id="nav-links"
      >
        <div className="navbar-item" style={style.navbarItens}>
          <Link to="/signup" className="navbar-item" style={style.navbarItens}>
            Sign Up
          </Link>
          <Link to="/login" className="navbar-item" style={style.navbarItens}>
            Log In
          </Link>
          <Link to="/movies" className="navbar-item" style={style.navbarItens}>
            Movies
          </Link>
          <Link
            to="/newmovie"
            className="navbar-item"
            style={style.navbarItens}
          >
            New Movie
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Nav };
