import { ROUTES } from "@constants";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <Link to={ROUTES.HOME}>Go Home</Link>
    </div>
  );
}
