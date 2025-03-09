import { ROUTES } from "@constants";
import { Link } from "react-router";
import './not-found.css';
import { NavBar } from "@components";

export default function NotFound() {
  return (
    <div className="not-found-page-container">
      <NavBar />
      <div className="not-found-content">
        <p className="not-found-message">
         <span style={{color: "#2e7d32"}}>Oops!</span> It seems the page you're looking for doesn't exist or has been moved.
        </p>
        <Link className="btn-404" to={ROUTES.HOME}>Go Home</Link>
      </div>
    </div>
  );
}
