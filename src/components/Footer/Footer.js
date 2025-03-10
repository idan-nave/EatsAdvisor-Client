import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './footer.css';
import { FaHeart } from 'react-icons/fa';
export default function Footer() {
    var currentYear = new Date().getFullYear();
    return (_jsx("div", { className: "footer-container", children: _jsxs("div", { className: "footer-content", children: [_jsx("div", { className: "footer-logo", children: _jsxs("span", { className: "footer-logo-text", children: [_jsx("span", { className: "first-letter", children: "E" }), "ats", _jsx("span", { className: "first-letter", children: "A" }), "dvisor"] }) }), _jsxs("div", { className: "footer-links", children: [_jsx("a", { href: "#", className: "footer-link", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "footer-link", children: "Terms of Service" }), _jsx("a", { href: "#", className: "footer-link", children: "Contact Us" })] }), _jsxs("div", { className: "footer-copyright", children: [_jsxs("p", { children: ["\u00A9 ", currentYear, " EatsAdvisor. All rights reserved."] }), _jsxs("p", { className: "footer-tagline", children: ["Made with ", _jsx(FaHeart, { className: "heart-icon" }), " for food lovers everywhere"] })] })] }) }));
}
