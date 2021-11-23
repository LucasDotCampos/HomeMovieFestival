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
      boxShadow: ' 1px 1px 1px #c1c1c1',
      marginBottom: '32px',
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
          <div className="navbar-item" style={{}}>
            <Link to="/user">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegUser />
                <p className="ml-2">User</p>
              </div>
            </Link>
          </div>
          <Link to="/movies" className="navbar-item">
            Movies
          </Link>
          <Link to="/newmovie" className="navbar-item">
            New Movie
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Nav };
