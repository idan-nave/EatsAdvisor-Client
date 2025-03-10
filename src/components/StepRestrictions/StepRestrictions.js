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
import './step-restrictions.css';
var restrictionOptions = ['Kosher', 'Vegetarian', 'Vegan', 'Gluten-Free'];
var StepRestrictions = function (_a) {
    var register = _a.register, errors = _a.errors, nextStep = _a.nextStep, prevStep = _a.prevStep;
    return (_jsxs("div", { className: "user-profile-form-step-container step-2", children: [_jsx("h2", { className: "user-profile-step-headers u-p-h-1", children: "Restrictions" }), _jsx("p", { className: "user-profile-step-headers u-p-h-2", children: "Select applicable restrictions:" }), restrictionOptions.map(function (option, index) { return (_jsxs("div", { className: 'restrictions-container', children: [_jsx("input", __assign({ type: "checkbox", id: "restriction-".concat(option), value: option }, register('restrictions'))), _jsx("label", { htmlFor: "restriction-".concat(option), children: option })] }, index)); }), errors.restrictions && (_jsx("div", { className: "error-message", children: errors.restrictions.message })), _jsxs("div", { className: 'restrictions-nav-btns', children: [_jsx("button", { className: "restriction-btn", type: "button", onClick: prevStep, children: "Back" }), _jsx("button", { className: "restriction-btn", type: "button", onClick: nextStep, children: "Next" })] })] }));
};
export default StepRestrictions;
