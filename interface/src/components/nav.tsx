import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../images/hmf.png';
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
      height: '50px',
      boxShadow: '0px 2px 6px 2px #c1c1c1',
    },
  };

  return (
    <nav className="navbar is-white" style={style.navbar}>
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={logoImg} alt="site logo" />
        </Link>

        <a onClick={toggleMenu} className="navbar-burger" id="burger">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div
        className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}
        id="nav-links"
      >
        <div className="navbar">
          <Link to="/movies" className="navbar-item">
            Movies
          </Link>
          <Link to="/newmovie" className="navbar-item">
            New Movie
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/user">
            <FaRegUser />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Nav };
