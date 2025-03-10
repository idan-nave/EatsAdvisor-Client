import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context';
import { useEffect, useState } from 'react';
var PrivateRoute = function (_a) {
    var _b;
    var children = _a.children;
    var _c = useAuth(), user = _c.user, loading = _c.loading;
    var location = useLocation();
    var _d = useState(true), isChecking = _d[0], setIsChecking = _d[1];
    useEffect(function () {
        if (!loading) {
            setIsChecking(false);
        }
    }, [loading]);
    if (isChecking) {
        return _jsx("div", { children: "Loading..." });
    }
    if (location.pathname === '/scan' && ((_b = location.state) === null || _b === void 0 ? void 0 : _b.allowed) !== true) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return user ? children : _jsx(Navigate, { to: "/login", replace: true });
};
export default PrivateRoute;
