var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './step-personal-preference.css';
var StepPersonalPreference = function (_a) {
    var register = _a.register, errors = _a.errors, prevStep = _a.prevStep;
    return (_jsxs("div", { className: "user-profile-form-step-container step-5", children: [_jsx("h2", { className: "user-profile-step-headers", children: "Personal Preference" }), _jsx("label", { htmlFor: "personalPreference", children: "Your Personal Preference:" }), _jsx("textarea", __assign({ id: "personalPreference" }, register('personalPreference'))), errors.personalPreference && (_jsx("div", { className: "error-message", children: errors.personalPreference.message })), _jsxs("div", { className: 'personal-preference-nav-btns-container', children: [_jsx("button", { className: "personal-preference-nav-btn", type: "button", onClick: prevStep, children: "Back" }), _jsx("button", { className: "personal-preference-nav-btn", type: "submit", children: "Save" })] })] }));
};
export default StepPersonalPreference;
