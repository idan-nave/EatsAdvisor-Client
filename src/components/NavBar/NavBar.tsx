import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import { IoChevronBackCircle } from "react-icons/io5";
import './nav-bar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <span className="first-letter">M</span>ENU
      </div>

      <div className="nav-links-container">
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX style={{ color: 'lightgreen' }} /> : <FiMenu style={{ color: 'lightgreen' }} />}
        </div>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/api" className="nav-bar-link">API</Link>
          </li>
          <li>
            <Link to="/about" className="nav-bar-link">About</Link>
          </li>
          <li>
            <Link to="/login" className="nav-bar-link">Login</Link>
          </li>
          {!isHomePage && (
            <li className="back-btn" onClick={() => navigate(-1)}>
              <IoChevronBackCircle className="back-icon" />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
