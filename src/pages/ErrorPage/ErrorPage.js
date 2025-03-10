import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ROUTES } from '@constants';
import { useRouteError, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './errorpage.css';
var ErrorPage = function () {
    var error = useRouteError();
    var navigate = useNavigate();
    useEffect(function () {
        //Uncomment the following lines if you want to auto-redirect after 5 seconds:
        var timer = setTimeout(function () {
            navigate(ROUTES.BASE);
        }, 3000);
        return function () { return clearTimeout(timer); };
    }, [navigate]);
    return (_jsx("div", { className: "error-page-container", children: _jsxs("div", { className: "error-content", children: [_jsx("h3", { className: "error-title", children: "Oops! Something went wrong." }), _jsx("p", { className: "error-redirect", children: "You will be redirected to the homepage in a few seconds..." }), _jsx("button", { className: "btn-error", onClick: function () { return navigate(ROUTES.BASE); }, children: "Go Home Now" })] }) }));
};
export default ErrorPage;
