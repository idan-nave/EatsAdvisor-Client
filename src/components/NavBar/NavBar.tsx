import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { TfiArrowCircleLeft } from 'react-icons/tfi'
import './nav-bar.css'
import { ROUTES } from '@constants'
import { useAuth } from '@context'
import { FaUserCircle } from 'react-icons/fa'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handelBackClick = () => {
    navigate(-1)
  }

  return (
    <>
      {!isOpen && (
        <nav className="nav-bar">
          <div className="logo-container" onClick={() => navigate(ROUTES.BASE)}>
            <span className="first-letter">M</span>ENU
          </div>
          <div className="nav-links-container">
            <div className="menu-icon" onClick={() => setIsOpen(true)}>
              <FiMenu style={{ color: 'lightgreen' }} />
            </div>
            <ul className="nav-links">
              <li className="nav-link">
                <NavLink
                  to={ROUTES.HOME}
                  className={({ isActive }) =>
                    isActive ? 'nav-bar-link active' : 'nav-bar-link'
                  }
                  onClick={handleLinkClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to={ROUTES.ABOUT}
                  className={({ isActive }) =>
                    isActive ? 'nav-bar-link active' : 'nav-bar-link'
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to={ROUTES.API_DOCS}
                  className={({ isActive }) =>
                    isActive ? 'nav-bar-link active' : 'nav-bar-link'
                  }
                >
                  API
                </NavLink>
              </li>
              <li className="nav-link">
                {user ? (
                  <FaUserCircle
                    className="user-icon"
                    color="black"
                    size={28}
                    onClick={() => navigate(ROUTES.PROFILE)}
                  />
                ) : (
                  <NavLink
                    to={ROUTES.LOGIN}
                    className={({ isActive }) =>
                      isActive ? 'nav-bar-link active' : 'nav-bar-link'
                    }
                    onClick={handleLinkClick}
                  >
                    Login
                  </NavLink>
                )}
              </li>

              <li className="back-btn" onClick={handelBackClick}>
                <TfiArrowCircleLeft
                  size={30}
                  color="black"
                  className="back-icon"
                />
              </li>
            </ul>
          </div>
        </nav>
      )}

      {isOpen && (
        <div className="menu-overlay">
          <div className="overlay-header">
            <div
              className="logo-container"
              onClick={() => navigate(ROUTES.BASE)}
            >
              <span className="first-letter">M</span>ENU
            </div>
            <div className="menu-close-icon" onClick={() => setIsOpen(false)}>
              <FiX style={{ color: 'lightgreen' }} />
            </div>
          </div>
          <ul className="overlay-links">
            <li className="nav-link">
              <NavLink
                to={ROUTES.API_DOCS}
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                onClick={handleLinkClick}
              >
                API
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to={ROUTES.ABOUT}
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                onClick={handleLinkClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to={ROUTES.HOME}
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-link">
              {user ? (
                <FaUserCircle
                  className="user-icon"
                  color="black"
                  size={25}
                  onClick={() => {
                    navigate(ROUTES.PROFILE)
                    setIsOpen(false)
                  }}
                />
              ) : (
                <NavLink
                  to={ROUTES.LOGIN}
                  className={({ isActive }) =>
                    isActive ? 'nav-bar-link active' : 'nav-bar-link'
                  }
                  onClick={handleLinkClick}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default NavBar
