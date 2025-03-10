import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ROUTES } from "@constants";
import { Link } from "react-router";
import './not-found.css';
import { NavBar } from "@components";
export default function NotFound() {
    return (_jsxs("div", { className: "not-found-page-container", children: [_jsx(NavBar, {}), _jsxs("div", { className: "not-found-content", children: [_jsxs("p", { className: "not-found-message", children: [_jsx("span", { style: { color: "#2e7d32" }, children: "Oops!" }), " It seems the page you're looking for doesn't exist or has been moved."] }), _jsx(Link, { className: "btn-404", to: ROUTES.HOME, children: "Go Home" })] })] }));
}
