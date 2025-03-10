import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { TfiArrowCircleLeft } from 'react-icons/tfi';
import './nav-bar.css';
import { ROUTES } from '@constants';
import { useAuth } from '@context';
import { FaUserCircle } from 'react-icons/fa';
import { PiSignOutLight } from 'react-icons/pi';
var NavBar = function () {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useAuth(), user = _b.user, logout = _b.logout;
    var navigate = useNavigate();
    var handleLinkClick = function () {
        setIsOpen(false);
    };
    var handelBackClick = function () {
        navigate(-1);
    };
    return (_jsxs(_Fragment, { children: [!isOpen && (_jsxs("nav", { className: "nav-bar", children: [_jsxs("div", { className: "logo-container", onClick: function () { return navigate(ROUTES.BASE); }, children: [_jsx("span", { className: "first-letter", children: "E" }), "ats", _jsx("span", { className: "first-letter", children: "A" }), "dvisor"] }), _jsxs("div", { className: "nav-links-container", children: [_jsx("div", { className: "menu-icon", onClick: function () { return setIsOpen(true); }, children: _jsx(FiMenu, { style: { color: '#2e7d32' } }) }), _jsxs("ul", { className: "nav-links", children: [_jsx("li", { className: "nav-link", children: _jsx(NavLink, { to: ROUTES.HOME, className: function (_a) {
                                                var isActive = _a.isActive;
                                                return isActive ? 'nav-bar-link active' : 'nav-bar-link';
                                            }, onClick: handleLinkClick, children: "Home" }) }), _jsx("li", { className: "nav-link", children: _jsx(NavLink, { to: ROUTES.ABOUT, className: function (_a) {
                                                var isActive = _a.isActive;
                                                return isActive ? 'nav-bar-link active' : 'nav-bar-link';
                                            }, children: "About" }) }), _jsx("li", { className: "nav-link", children: user ? (_jsxs("div", { className: "user-actions", children: [_jsx(FaUserCircle, { className: "user-icon", size: 28, onClick: function () { return navigate(ROUTES.PROFILE); }, title: "Profile" }), _jsx(PiSignOutLight, { className: "logout-icon", size: 30, onClick: logout, title: "Logout" })] })) : (_jsx(NavLink, { to: ROUTES.LOGIN, className: function (_a) {
                                                var isActive = _a.isActive;
                                                return isActive ? 'nav-bar-link active' : 'nav-bar-link';
                                            }, onClick: handleLinkClick, children: "Login" })) }), _jsx("li", { className: "back-btn", onClick: handelBackClick, children: _jsx(TfiArrowCircleLeft, { size: 30, className: "back-icon" }) })] })] })] })), isOpen && (_jsxs("div", { className: "menu-overlay", children: [_jsxs("div", { className: "overlay-header", children: [_jsxs("div", { className: "logo-container", onClick: function () { return navigate(ROUTES.BASE); }, children: [_jsx("span", { className: "first-letter", children: "E" }), "ats", _jsx("span", { className: "first-letter", children: "A" }), "dvisor"] }), _jsx("div", { className: "menu-close-icon", onClick: function () { return setIsOpen(false); }, children: _jsx(FiX, { style: { color: '#2e7d32' } }) })] }), _jsxs("ul", { className: "overlay-links", children: [_jsx("li", { className: "nav-link", children: _jsx(NavLink, { to: ROUTES.ABOUT, className: function (_a) {
                                        var isActive = _a.isActive;
                                        return isActive ? 'nav-bar-link active' : 'nav-bar-link';
                                    }, onClick: handleLinkClick, children: "About" }) }), _jsx("li", { className: "nav-link", children: _jsx(NavLink, { to: ROUTES.HOME, className: function (_a) {
                                        var isActive = _a.isActive;
                                        return isActive ? 'nav-bar-link active' : 'nav-bar-link';
                                    }, onClick: handleLinkClick, children: "Home" }) }), _jsx("li", { className: "nav-link", children: user ? (_jsxs("div", { className: "mobile-user-actions", children: [_jsxs("div", { className: "mobile-user-action", onClick: function () {
                                                navigate(ROUTES.PROFILE);
                                                setIsOpen(false);
                                            }, children: [_jsx(FaUserCircle, { className: "user-icon", color: "black", size: 25 }), _jsx("span", { children: "Profile" })] }), _jsxs("div", { className: "mobile-user-action", onClick: function () {
                                                logout();
                                                setIsOpen(false);
                                            }, children: [_jsx(PiSignOutLight, { className: "logout-icon", color: "black", size: 25 }), _jsx("span", { children: "Logout" })] })] })) : (_jsx(NavLink, { to: ROUTES.LOGIN, className: function (_a) {
                                        var isActive = _a.isActive;
                                        return isActive ? 'nav-bar-link active' : 'nav-bar-link';
                                    }, onClick: handleLinkClick, children: "Login" })) })] })] }))] }));
};
export default NavBar;
