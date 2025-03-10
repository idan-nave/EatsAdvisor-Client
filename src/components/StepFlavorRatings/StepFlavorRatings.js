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
import { useState } from 'react';
import './step-flavor-ratings.css';
var flavorList = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Spicy'];
var ratingOptions = Array.from({ length: 10 }, function (_, i) { return (i + 1).toString(); });
var StepFlavorRatings = function (_a) {
    var register = _a.register, errors = _a.errors, watch = _a.watch, nextStep = _a.nextStep, prevStep = _a.prevStep;
    var _b = useState(false), showError = _b[0], setShowError = _b[1];
    var flavorRatings = watch('flavorRatings') || [];
    var isComplete = flavorRatings.length === flavorList.length &&
        flavorRatings.every(function (field) { return field && field.rating; });
    var handleNext = function () {
        if (isComplete) {
            setShowError(false);
            nextStep();
        }
        else {
            setShowError(true);
        }
    };
    return (_jsxs("div", { className: "user-profile-form-step-container step-3", children: [_jsx("h2", { className: "user-profile-step-headers", children: "Flavor Ratings" }), _jsx("div", { className: "flavor-ratings-selects-container", children: flavorList.map(function (flavor, index) { return (_jsxs("div", { className: "flavor-ratings-select-container", children: [_jsxs("label", { htmlFor: "flavorRatings-".concat(index), children: [flavor, ":"] }), _jsxs("select", __assign({ className: "flavor-rating-select", id: "flavorRatings-".concat(index) }, register("flavorRatings.".concat(index, ".rating"), {
                            required: 'This field is required',
                        }), { children: [_jsx("option", { value: "", children: "Select rating" }), ratingOptions.map(function (rating, i) { return (_jsx("option", { value: rating, children: rating }, i)); })] }))] }, flavor)); }) }), showError && !isComplete && (_jsx("span", { className: "error-message", children: "All fields must be selected." })), _jsxs("div", { className: "flavor-ratings-nav-btn-container", children: [_jsx("button", { className: "flavor-rating-btn", type: "button", onClick: prevStep, children: "Back" }), _jsx("button", { className: "flavor-rating-btn", type: "button", onClick: handleNext, children: "Next" })] })] }));
};
export default StepFlavorRatings;
