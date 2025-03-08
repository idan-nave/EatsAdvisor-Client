
import './footer.css'
import { FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-logo-text">
            <span className="first-letter">E</span>ats<span className="first-letter">A</span>dvisor
          </span>
        </div>
        
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Contact Us</a>
        </div>
        
        <div className="footer-copyright">
          <p>© {currentYear} EatsAdvisor. All rights reserved.</p>
          <p className="footer-tagline">
            Made with <FaHeart className="heart-icon" /> for food lovers everywhere
          </p>
        </div>
      </div>
    </div>
  )
}
