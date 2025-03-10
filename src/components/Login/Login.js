import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '@context';
import { UserProfile } from '@pages';
import { FcGoogle } from 'react-icons/fc';
import './login.css';
export default function Login() {
    var _a = useAuth(), login = _a.login, user = _a.user;
    return user ? (_jsx(UserProfile, {})) : (_jsxs("div", { className: "login-container", children: [_jsx("h1", { className: "welcome-title", children: "Welcome to EatsAdvisor" }), _jsx("p", { className: "welcome-text", children: "Your personal menu advisor for dietary preferences and restrictions. Upload a menu photo and get personalized recommendations!" }), _jsxs("div", { className: "sign-in-container", children: [_jsx(FcGoogle, { className: "sign-in-icon" }), _jsx("button", { className: "sign-in-btn", onClick: login, children: "Sign in with Google" })] }), _jsxs("div", { className: "disclaimer", children: [_jsx("h3", { children: "Authentication Information" }), _jsx("p", { children: "By signing in, you agree to our terms of service and privacy policy." }), _jsxs("ul", { children: [_jsx("li", { children: "Access tokens expire according to Google's standard terms (typically 1 hour)" }), _jsx("li", { children: "Refresh tokens expire after 1 week" }), _jsx("li", { children: "Your data is securely stored and only used to provide personalized recommendations" })] })] })] }));
}
