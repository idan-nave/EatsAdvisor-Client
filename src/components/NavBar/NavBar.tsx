import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { TfiArrowCircleLeft } from 'react-icons/tfi'
import './nav-bar.css'
import { ROUTES } from '@constants'
import { useAuth } from '@context'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { PiSignOutLight } from 'react-icons/pi'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
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
            <span className="first-letter">E</span>ats
            <span className="first-letter">A</span>dvisor
          </div>
          <div className="nav-links-container">
            <div className="menu-icon" onClick={() => setIsOpen(true)}>
              <FiMenu style={{ color: '#2e7d32' }} />
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
                  <div className="user-actions">
                    <FaUserCircle
                      className="user-icon"
                      size={28}
                      onClick={() => navigate(ROUTES.PROFILE)}
                      title="Profile"
                    />
                    {/* <NavLink
                      to={ROUTES.PREFERENCES}
                      className={({ isActive }) =>
                        isActive ? 'nav-bar-link active' : 'nav-bar-link'
                      }
                      onClick={handleLinkClick}
                    >
                      Preferences
                    </NavLink> */}
                    <PiSignOutLight
                      className="logout-icon"
                      // color="black"
                      size={30}
                      onClick={logout}
                      title="Logout"
                    />
                  </div>
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
                  // color="black"
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
              <span className="first-letter">E</span>ats
              <span className="first-letter">A</span>dvisor
            </div>
            <div className="menu-close-icon" onClick={() => setIsOpen(false)}>
              <FiX style={{ color: '#2e7d32' }} />
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
                <div className="mobile-user-actions">
                  <div
                    className="mobile-user-action"
                    onClick={() => {
                      navigate(ROUTES.PROFILE)
                      setIsOpen(false)
                    }}
                  >
                    <FaUserCircle
                      className="user-icon"
                      color="black"
                      size={25}
                    />
                    <span>Profile</span>
                  </div>
                  {/* <div
                    className="mobile-user-action"
                    onClick={() => {
                      navigate(ROUTES.PREFERENCES)
                      setIsOpen(false)
                    }}
                  >
                    <span>Preferences</span>
                  </div> */}
                  <div
                    className="mobile-user-action"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                  >
                    <PiSignOutLight
                      className="logout-icon"
                      color="black"
                      size={25}
                    />
                    <span>Logout</span>
                  </div>
                </div>
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
