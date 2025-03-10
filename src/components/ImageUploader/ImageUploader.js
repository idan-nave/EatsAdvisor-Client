import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from '@context';
import { useNavigate } from 'react-router';
import { ROUTES } from '@constants';
import './image-uploader.css';
export default function ImageUploader() {
    var user = useAuth().user;
    var navigate = useNavigate();
    var handleFileChange = function (event) {
        if (!user) {
            return;
        }
        if (event.target.files && event.target.files.length > 0) {
            var file = event.target.files[0];
            navigate(ROUTES.MENU_SCAN, { state: { file: file, allowed: true } });
        }
    };
    var handleButtonClick = function (event) {
        if (!user) {
            event.preventDefault();
            navigate(ROUTES.LOGIN);
        }
    };
    return (_jsxs("div", { className: "image-uploader-container", children: [user && (_jsxs("div", { className: "welcome-message", children: [_jsxs("div", { className: 'welcome-message-inner', children: ["Welcome, ", user.firstName || 'User', "!"] }), _jsx("p", { children: "Ready to discover personalized menu recommendations?" })] })), _jsxs("div", { className: 'upload-message-container', children: [_jsx("div", { children: "Upload a menu image to receive personalized" }), _jsx("span", { className: "green-ai-text", children: "AI-powered" }), " recommendations"] }), _jsxs("label", { className: "upload-button", onClick: handleButtonClick, children: [_jsx("span", { children: "Upload a Menu" }), _jsx("input", { className: "upload-input", type: "file", accept: "image/*", onChange: handleFileChange, hidden: true, disabled: !user })] })] }));
}
