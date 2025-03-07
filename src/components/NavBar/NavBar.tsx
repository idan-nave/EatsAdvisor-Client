import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoChevronBackCircle } from "react-icons/io5";
import './nav-bar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <nav className="nav-bar">
          <div className="logo-container">
            <span className="first-letter">M</span>ENU
          </div>
          <div className="nav-links-container">
            <div className="menu-icon" onClick={() => setIsOpen(true)}>
              <FiMenu style={{ color: 'lightgreen' }} />
            </div>
            <ul className="nav-links">
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
                  <IoChevronBackCircle color='lightgreen' className="back-icon" />
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}

      {isOpen && (
        <div className="menu-overlay">
          <div className="overlay-header">
            <div className="logo-container">
              <span className="first-letter">M</span>ENU
            </div>
            <div className="menu-close-icon" onClick={() => setIsOpen(false)}>
              <FiX style={{ color: 'lightgreen' }} />
            </div>
          </div>
          <ul className="overlay-links">
            <li>
              <Link to="/api" className="nav-bar-link" onClick={handleLinkClick}>API</Link>
            </li>
            <li>
              <Link to="/about" className="nav-bar-link" onClick={handleLinkClick}>About</Link>
            </li>
            <li>
              <Link to="/login" className="nav-bar-link" onClick={handleLinkClick}>Login</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
